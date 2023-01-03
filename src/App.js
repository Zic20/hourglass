import React, { useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Forms/Login";
import authContext from "./store/auth-context";
import Sidebar from "./Components/Utilities/Navigation/Sidebar";
import Activities from "./Components/Pages/Activities";
import LearningContracts from "./Components/Pages/LearningContracts";
import SummaryTimeSheet from "./Components/Pages/SummaryTimeSheet";
function App() {
  const authCtx = useContext(authContext);
  const [sideBarClosed, setSidebarClosed] = useState(true);
  const onSidebarCloseHandler = (closed) => {
    setSidebarClosed(!closed);
  };
  return (
    <div className="App">
      {authCtx.isLoggedIn && (
        <>
          <Sidebar onClose={onSidebarCloseHandler} />

          {/* Routes */}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/timesheet">
              <Activities fullWidth={!sideBarClosed} />
            </Route>
            <Route path="/learningcontracts">
              <LearningContracts fullWidth={!sideBarClosed} />
            </Route>
            <Route path="/summarytimesheet">
              <SummaryTimeSheet fullWidth={!sideBarClosed} />
            </Route>
          </Switch>
        </>
      )}
      {!authCtx.isLoggedIn && <Login />}
    </div>
  );
}

export default App;
