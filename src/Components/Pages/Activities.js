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
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    return { activities: result };
  }

  if (action.type === "REMOVE") {
    const result = state.activities.filter(
      (activity) => parseInt(activity.id) !== parseInt(action.id)
    );
    console.log(result);
    return { activities: result };
  }
  return { activities: [] };
};

const Activities = () => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [activityID, setActivityID] = useState("");
  const [activitiesState, dispatchActivities] = useReducer(activitiesReducer, {
    activities: [],
  });

  useEffect(() => {
    
    getActivities();
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
      wrap:true
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
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
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

  const getActivities = async (week = 1) => {
    const option = { year: "numeric", month: "long", day: "numeric" };
    const { data, error } = await RequestHelper.get(`activities?week=${week}`);

    if (data && !error) {
      if (typeof data === "object") {
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
      }
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

  return (
    <Fragment>
      {/* Opens form for saving new activity */}
      {showForm && !update && (
        <Modal headerText="Add Activity" onClose={closeForm}>
          <ActivitiesForm onSave={onAddActivityHandler} />
        </Modal>
      )}
      {/* Opens form for updating existing activity */}
      {showForm && activityID.length > 0 && update && (
        <Modal headerText="Add Activity" onClose={closeForm}>
          <ActivitiesForm id={activityID} onSave={onAddActivityHandler} />
        </Modal>
      )}

      <Card className="card__mid">
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Activities</h2>
        <div>
          <SelectInput
            options={[{ value: 1, text: "Week One" }]}
            label="Week"
          />
          <Button className="btn__primary">Load List</Button>
          <Button className="btn__action" onClick={openActivityForm}>
            New Activity
          </Button>
        </div>
        <MyDatatable columns={columns} data={activitiesState.activities} />
      </Card>
    </Fragment>
  );
};

export default Activities;
