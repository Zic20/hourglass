import React, { Fragment, Suspense, useContext, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Utilities/Navigation/Sidebar";
import authContext from "./store/auth-context";


const Login = React.lazy(() => import("./Components/Forms/Login"));

const Dashboard = React.lazy(() => import("./Components/Pages/Dashboard"));

const Activities = React.lazy(() => import("./Components/Pages/Activities"));

const LearningContracts = React.lazy(() =>
  import("./Components/Pages/LearningContracts")
);
const SummaryTimeSheet = React.lazy(() =>
  import("./Components/Pages/SummaryTimeSheet")
);

const Signup = React.lazy(() => import("./Components/Forms/Signup"));

const ChangePassword = React.lazy(() =>
  import("./Components/Forms/ChangePassword")
);

function App() {
  const [sideBarClosed, setSidebarClosed] = useState(true);
  const onSidebarCloseHandler = (closed) => {
    setSidebarClosed(!closed);
  };

  const authCtx = useContext(authContext);

  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="App">
      <Fragment>
        {path !== "/login" && path !== "/signup" && authCtx.isLoggedIn && (
          <Sidebar onClose={onSidebarCloseHandler} />
        )}
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            {authCtx.isLoggedIn && (
              <>
                <Route path="/*" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/dashboard"
                  element={<Dashboard fullWidth={!sideBarClosed} />}
                />
                <Route
                  path="/timesheet"
                  element={<Activities fullWidth={!sideBarClosed} />}
                />
                <Route
                  path="/learningcontracts"
                  element={<LearningContracts fullWidth={!sideBarClosed} />}
                />
                <Route
                  path="/summarytimesheet"
                  element={<SummaryTimeSheet fullWidth={!sideBarClosed} />}
                />
              </>
            )}
            {!authCtx.isLoggedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Login />} />
              </>
            )}
          </Routes>
        </Suspense>
      </Fragment>
    </div>
  );
}

export default App;
