import React, { useReducer, useState, Fragment } from "react";
import ActivitiesForm from "../Forms/ActivitiesForm";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import MyDatatable from "../Utilities/DataTableBase";
import Modal from "../Utilities/Modal";

const columns = [
  {
    name: "Activity",
    selector: (row) => row.activity,
    wrap:true
  },
  {
    name: "Date",
    sortable: true,
    selector: (row) => row.date,
  },
  {
    name: "Start Time",
    sortable: true,
    selector: (row) => row.startTime,
  },
  {
    name: "End Time",
    selector: (row) => row.endTime,
  },
  {
    name: "Time Input",
    selector: (row) => row.timeInput,
  },
  {
    name: "Activity Type",
    selector: (row) => row.activityType,
  },
];

const activitiesReducer = (state, action) => {
  if (action.type === "ADD") {
    action.activity.id = state.activities.length + 1;
    const updatedState = state.activities.concat(action.activity);
    return { activities: updatedState };
  }
  return { activities: [] };
};
const Activities = () => {
  const [showForm, setShowForm] = useState(false);
  const [activitiesState, dispatchActivities] = useReducer(activitiesReducer, {
    activities: [],
  });

  const openActivityForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const onAddActivity = (activity) => {
    dispatchActivities({ type: "ADD", activity: activity });
  };

  return (
    <Fragment>
      {showForm && (
        <Modal headerText="Add Activity" onClose={closeForm}>
          <ActivitiesForm onAddActivity={onAddActivity} />
        </Modal>
      )}
      <Card className="card__mid">
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Activities</h2>
        <div>
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
