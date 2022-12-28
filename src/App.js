import React, { useContext, useState } from "react";
import "./App.css";
import Login from "./Components/Forms/Login";
import authContext from "./store/auth-context";
import Sidebar from "./Components/Utilities/Navigation/Sidebar";
import Agencies from "./Components/Pages/Agencies";
import Staff from "./Components/Pages/Staff";
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
          <Staff fullWidth={!sideBarClosed} />
        </>
      )}
      {!authCtx.isLoggedIn && <Login />}
    </div>
  );
}

export default App;
