import React, { useReducer, useState, Fragment, useEffect } from "react";
import ActivitiesForm from "../Forms/ActivitiesForm";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import MyDatatable from "../Utilities/DataTableBase";
import Modal from "../Utilities/Modal";
import SelectInput from "../Utilities/Inputs/Select";
import { RequestHelper } from "../../modules/Requester";
import { getTimeSpent, convertTime } from "../../modules/timecalculation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";

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

  const [activitiesState, dispatchActivities] = useReducer(activitiesReducer, {
    activities: [],
  });

  useEffect(() => {
    getWeeks();
    getCurrentWeek();
  }, []);

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
  const getActivities = async (week) => {
    const option = { year: "numeric", month: "long", day: "numeric" };
    const { data, error } = await RequestHelper.get(`activities?week=${week}`);
    if (!error) {
      data.forEach((activity) => {
        let date = new Date(activity.Date);
        date = date.toLocaleDateString("en-Monrovia", option);
        let startTime = convertTime(activity.StartTime);
        let endTime = convertTime(activity.EndTime);
        const modifiedActivity = {
          ...activity,
          TimeInput: getTimeSpent(activity.StartTime, activity.EndTime),
          Date: date,
          StartTime: startTime,
          EndTime: endTime,
        };
        dispatchActivities({ type: "ADD", activity: modifiedActivity });
      });
    } else {
      dispatchActivities({ type: "REMOVE_ALL" });
    }
  };

  const getWeeks = async () => {
    const { data, error } = await RequestHelper.get(`learningcontracts?weeks`);
    if (!error) {
      let result = data.map((week) => {
        return { value: week.Week, text: week.Week };
      });
      setWeeks(result);
    }
  };

  const getCurrentWeek = async () => {
    const { data, error } = await RequestHelper.get(
      `learningcontracts?current`
    );
    if (!error) {
      setCurrentWeek(data.Week);
      let startDate = data.StartDate;
      let endDate = data.EndDate;
      setStartDate(startDate);
      setEndDate(endDate);

      getActivities(data.Week);
    }
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

    if (
      window.confirm(
        `Do you want to delete activity ${id}? Deleted activities cannot be retrieved!`
      )
    ) {
      const { data, error } = await RequestHelper.delete(`activities/${id}`);

      if (data && !error) {
        dispatchActivities({ type: "REMOVE", id: id });
      }
    }
  };

  const onUpdateHandler = (event) => {
    const id = event.target.closest("button").value;
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
    let week = +event.target.value;
    getActivities(week);
  };

  return (
    <Fragment>
      {/* Opens form for saving new activity */}
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
      {/* Opens form for updating existing activity */}
      {showForm && update && (
        <Modal headerText="Edit Activity" onClose={closeForm}>
          <ActivitiesForm id={activityID} onSave={onAddActivityHandler} />
        </Modal>
      )}

      <Card className={className}>
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Activities</h2>
        <div>
          <SelectInput
            options={weeks}
            label="Week"
            onChange={onWeekChangeHandler}
            className="select-sm"
          />
          <Button className="btn__new" onClick={openActivityForm}>
            <FontAwesomeIcon icon={faFile}></FontAwesomeIcon> &nbsp; New
            Activity
          </Button>
        </div>
        <MyDatatable columns={columns} data={activitiesState.activities} />
      </Card>
    </Fragment>
  );
};

export default Activities;
