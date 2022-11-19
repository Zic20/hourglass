import React from "react";
import "./App.css";
import LearningContractForm from "./Components/Forms/LearningContractForm";
import ActivitiesForm from "./Components/Forms/ActivitiesForm";
import Modal from "./Components/Utilities/Modal";
import Activities from "./Components/Pages/Activities";

function App() {
  return (
    <div className="App">
      <Modal headerText="Activities Form">
        <ActivitiesForm />
      </Modal>
      {/* <Activities/> */}
      {/* <Modal className="modal-dialog-scrollable" headerText="Learning Contract">
        <LearningContractForm />
      </Modal> */}
    </div>
  );
}

export default App;
