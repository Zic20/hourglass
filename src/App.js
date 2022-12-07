import React, { useContext } from "react";
import "./App.css";
import Login from "./Components/Forms/Login";
import authContext from "./store/auth-context";
// import Activities from "./Components/Pages/Activities";
import LearningContractForm from "./Components/Forms/LearningContractForm";
import Modal from "./Components/Utilities/Modal";
function App() {
  const authCtx = useContext(authContext);
  return (
    <div className="App">
      {authCtx.isLoggedIn && <Modal className="modal-dialog-scrollable" headerText="Add Activity"><LearningContractForm /></Modal>}
      {!authCtx.isLoggedIn && <Login />}
    </div>
  );
}

export default App;
