import React, { useContext } from "react";
import "./App.css";
import Login from "./Components/Forms/Login";
import authContext from "./store/auth-context";
// import Sidebar from "./Components/Utilities/Navigation/Sidebar";
import Activities from "./Components/Pages/Activities";
function App() {
  const authCtx = useContext(authContext);
  return (
    <div className="App">
      {authCtx.isLoggedIn && <Activities />}
      {!authCtx.isLoggedIn && <Login />}
    </div>
  );
}

export default App;
