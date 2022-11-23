import React, { useReducer } from "react";
import activityContext from "./activity-context";

const defaultActivityState = { activities: [] };

const activitiesReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.activities.concat(action.activity);
    return { activities: updatedState };
  }
  return defaultActivityState;
};

const ActivityProvider = (props) => {
  const [activitiesState, dispatchActivities] = useReducer(
    activitiesReducer,
    defaultActivityState
  );

  const addActivity = (activity) => {
    dispatchActivities({ type: "ADD", activity: activity });
  };
  const removeActivity = (id) => {
    dispatchActivities({ type: "REMOVE", id: id });
  };

  const activitiesContext = {
    activities: activitiesState.activities,
    addActivity: addActivity,
    removeActivity: removeActivity,
  };

  return (
    <activityContext.Provider value={activitiesContext}>
      {props.children}
    </activityContext.Provider>
  );
};

export default ActivityProvider;
