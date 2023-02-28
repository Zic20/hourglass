import React, {
  useReducer,
  useState,
  Fragment,
  useEffect,
  useCallback,
} from "react";
import useFetch from "../../hooks/useFetch";
import ActivitiesForm from "../Forms/ActivitiesForm";
import Button from "../Utilities/Button";
import AlertDialog from "../ImportedComponents/AlertDialog";
import Card from "../Utilities/Card";
import MyDatatable from "../Utilities/DataTableBase";
import Modal from "../Utilities/Modal";
import SelectVariants from "../ImportedComponents/SelectVariants";
import { RequestHelper } from "../../modules/Requester";
import { getTimeDifference, convertTime } from "../../modules/timecalculation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faTrash,
  faPrint,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import TimesheetPrint from "../Reports/TimesheetPrint";

const activitiesReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.activities.concat(action.activity);
    return { activities: updatedState };
  }

  if (action.type === "UPDATE") {
    const result = state.activities.filter(
      (activity) => activity.id !== action.id
    );
    result.push({ id: action.id, ...action.activity });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return { activities: sortedList };
  }

  if (action.type === "REMOVE") {
    const result = state.activities.filter(
      (activity) => parseInt(activity.id) !== parseInt(action.id)
    );
    return { activities: result };
  }

  return { activities: [] };
};

const Activities = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [activityID, setActivityID] = useState("");
  const [currentWeek, setCurrentWeek] = useState(Number);
  const [weeks, setWeeks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(Number);
  const [selectedRow, setSelectedRow] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRowID, setSelectedRowID] = useState(Number);

  const [activitiesState, dispatchActivities] = useReducer(activitiesReducer, {
    activities: [],
  });

  const { sendRequest } = useFetch();

  const getWeeks = useCallback(async () => {
    sendRequest({ url: `learningcontracts?weeks` }, (data) => {
      if (!data || data.length === 0) {
        return;
      }
      let result = data.map((week) => {
        return { value: week.Week, text: `  Week ${week.Week}` };
      });
      setWeeks(result);
    });
  }, [sendRequest]);

  const getActivities = useCallback(
    async (week) => {
      sendRequest({ url: `activities?week=${week}` }, (data) => {
        dispatchActivities({ type: "REMOVE_ALL" });
        if (data && data.length > 0) {
          data.forEach((activity) => {
            let modifiedActivity = formatActivity(activity);
            dispatchActivities({ type: "ADD", activity: modifiedActivity });
          });
        }
      });
    },
    [sendRequest]
  );

  const getCurrentWeek = useCallback(async () => {
    const { data, error } = await RequestHelper.get(
      `learningcontracts?current`
    );
    if (!error) {
      let { StartDate: startDate, EndDate: endDate, Week } = data;
      setCurrentWeek(Week);
      setSelectedWeek(Week);
      setStartDate(startDate);
      setEndDate(endDate);
      getActivities(Week);
    }
  }, [getActivities]);

  useEffect(() => {
    getWeeks();
    getCurrentWeek();
  }, [getWeeks, getCurrentWeek]);

  const { activities } = activitiesState;

  const columns = [
    {
      name: "Activity",
      width: "200px",
      selector: (row) => row.Activity,
      wrap: true,
    },
    {
      name: "Date",
      sortable: true,
      selector: (row) => row.Date,
      wrap: true,
    },
    {
      name: "Start Time",
      sortable: true,
      selector: (row) => row.StartTime,
    },
    {
      name: "End Time",
      selector: (row) => row.EndTime,
    },
    {
      name: "Time Input",
      selector: (row) => row.TimeInput,
    },
    {
      name: "Activity Type",
      wrap: true,
      selector: (row) => row.ActivityType,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <>
          <Button onClick={onUpdateHandler} value={row.id}>
            <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>
          </Button>
          <Button onClick={onDeleteHandler} value={row.id}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </>
      ),
      style: {
        textAlign: "left",
        fontSize: "1rem",
      },
    },
  ];

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const formatActivity = (activity) => {
    const option = { year: "numeric", month: "long", day: "numeric" };
    let date = new Date(activity.Date);
    date = date.toLocaleDateString("en-Monrovia", option);
    let startTime = convertTime(activity.StartTime);
    let endTime = convertTime(activity.EndTime);
    return {
      ...activity,
      TimeInput: getTimeDifference(activity.StartTime, activity.EndTime),
      Date: date,
      StartTime: startTime,
      EndTime: endTime,
    };
  };

  const onAddActivityHandler = (data, id = null) => {
    const activityID = id;
    if (activityID !== null) {
      dispatchActivities({ type: "UPDATE", activity: data, id: activityID });
    } else {
      dispatchActivities({ type: "ADD", activity: data });
    }
  };

  const onDeleteHandler = async (event) => {
    const id = event.target.closest("button").value;
    setSelectedRowID(+id);
    setShowDeleteDialog(true);
  };

  const onAcceptDelete = async () => {
    const { data, error } = await RequestHelper.delete(
      `activities/${selectedRowID}`
    );
    if (data && !error) {
      dispatchActivities({ type: "REMOVE", id: selectedRowID });
    }
  };

  const onDeleteDialogClose = () => setShowDeleteDialog(false);

  const onUpdateHandler = (event) => {
    const id = +event.target.closest("button").value;
    let row = activities.filter(
      (activity) => parseInt(activity.id) === parseInt(id)
    );
    row = {
      ...row[0],
      Week: selectedWeek,
      WeekStartDate: startDate,
      WeekEndDate: endDate,
    };
    setSelectedRow(row);
    setActivityID(id);
    setUpdate(true);
    setShowForm(true);
  };

  const openActivityForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setUpdate(false);
    setActivityID("");
  };

  const onWeekChangeHandler = (event) => {
    let week = +event;
    setSelectedWeek(week);
    getActivities(week);
  };

  const onPrintHandler = () => {
    TimesheetPrint({
      columnHeaders: [
        "Week",
        "Date",
        "Activity",
        "Start Time",
        "End Time",
        "Time Input",
      ],
      data: activitiesState.activities,
      title: `Week ${currentWeek} Timesheet`,
      week: currentWeek,
    });
  };

  return (
    <Fragment>
      {showForm && !update && (
        <Modal headerText="Add Activity" onClose={closeForm}>
          <ActivitiesForm
            week={currentWeek}
            maxDate={endDate}
            minDate={startDate}
            onSave={onAddActivityHandler}
          />
        </Modal>
      )}
      {showForm && update && (
        <Modal headerText="Edit Activity" onClose={closeForm}>
          <ActivitiesForm
            id={activityID}
            onSave={onAddActivityHandler}
            data={selectedRow}
          />
        </Modal>
      )}

      <AlertDialog
        open={showDeleteDialog}
        Header="Delete Activity"
        onClose={onDeleteDialogClose}
        onAgree={onAcceptDelete}
      >
        Are your sure you want to delete this activity? Deleted activities
        cannot be retrieved!
      </AlertDialog>

      <Card className={className}>
        <h2>Activities</h2>
        <div>
          <SelectVariants
            onChange={onWeekChangeHandler}
            data={weeks}
            title="Select Week"
          />
          <Button className="btn__new" onClick={openActivityForm}>
            <FontAwesomeIcon icon={faFile}></FontAwesomeIcon> &nbsp; New
            Activity
          </Button>

          <Button className="btn__action" onClick={onPrintHandler}>
            Print &nbsp;<FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
          </Button>
        </div>
        <MyDatatable columns={columns} data={activitiesState.activities} />
      </Card>
    </Fragment>
  );
};

export default Activities;
