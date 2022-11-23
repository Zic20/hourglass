import React from "react";

const activityContext = React.createContext({
  activities: [],
  addActivity: (activity) => {},
  removeActivity: (id) => {},
});

export default activityContext;
