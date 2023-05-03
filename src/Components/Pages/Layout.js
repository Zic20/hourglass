import React from "react";
import Sidebar from "../Utilities/Navigation/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
