import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../Components/Pages/Dashboard";
import Layout from "../Components/Pages/Layout";
import authContext from "../store/auth-context";
import { useContext } from "react";
import NewAuthProvider from "../store/NewAuthProvider";

const Login = React.lazy(() => import("../Components/Forms/Login"));

const Activities = React.lazy(() => import("../Components/Pages/Activities"));

const LearningContracts = React.lazy(() =>
  import("../Components/Pages/LearningContracts")
);
const SummaryTimeSheet = React.lazy(() =>
  import("../Components/Pages/SummaryTimeSheet")
);

const Signup = React.lazy(() => import("../Components/Forms/Signup"));

const ChangePassword = React.lazy(() =>
  import("../Components/Forms/ChangePassword")
);

const RouteAuth = (props) => {
  const authCtx = useContext(authContext);
  const { isLoggedIn } = authCtx;
  return (
    <>
      {isLoggedIn && <NewAuthProvider>{props.children}</NewAuthProvider>}
      {!isLoggedIn && <Navigate to="/login" />}
    </>
  );
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: "/dashboard",
        element: (
          <RouteAuth>
            <Dashboard />
          </RouteAuth>
        ),
      },
      {
        path: "/learningcontracts",
        element: (
          <RouteAuth>
            <LearningContracts />
          </RouteAuth>
        ),
      },
      {
        path: "/timesheet",
        element: (
          <RouteAuth>
            <Activities />
          </RouteAuth>
        ),
      },
      {
        path: "/summarytimesheet",
        element: (
          <RouteAuth>
            <SummaryTimeSheet />
          </RouteAuth>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <NewAuthProvider>
        <Login />
      </NewAuthProvider>
    ),
  },
  { path: "/signup", element: <Signup /> },
  { path: "/changepassword", element: <ChangePassword /> },
]);

export default routes;
