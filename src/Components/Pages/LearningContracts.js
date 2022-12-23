import React, { useState, useEffect, useReducer, Fragment } from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint,faFile } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import LearningContractForm from "../Forms/LearningContractForm";
import Modal from "../Utilities/Modal";
import SelectInput from "../Utilities/Inputs/Select";
import LearningContractTable from "../Tables/LearningContractTable";

const contractsReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedState = state.learningContracts.concat(
      action.learningContracts
    );
    return { learningContracts: updatedState };
  }

  if (action.type === "UPDATE") {
    const result = state.learningContracts.filter(
      (learningContract) => learningContract.id !== action.id
    );
    result.push({ id: action.id, ...action.learningContract });
    const sortedList = result.sort((a, b) => a.Week - b.Week);
    return { learningContracts: sortedList };
  }

  if (action.type === "REMOVE") {
    const result = state.learningContracts.filter(
      (learningContract) =>
        parseInt(learningContract.id) !== parseInt(action.id)
    );
    return { learningContracts: result };
  }

  return { learningContracts: [] };
};

const LearningContracts = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [id, setID] = useState("");
  const [contracts, dispatchContracts] = useReducer(contractsReducer, {
    learningContracts: [],
  });
  const { sendRequest } = useFetch();
  const option = { year: "numeric", month: "long", day: "numeric" };

  const listLearningContract = (data) => {
    const result = data.map((learningContract) => {
      let startDate = new Date(learningContract.StartDate).toLocaleDateString(
        "en-Monrovia",
        option
      );
      let endDate = new Date(learningContract.EndDate).toLocaleDateString(
        "en-Monrovia",
        option
      );
      return {
        ...learningContract,
        StartDate: startDate,
        EndDate: endDate,
      };
    });
    dispatchContracts({ type: "ADD", learningContracts: result });
  };

  const listWeeks = (data) => {
    const result = data.map((week) => {
      return { value: week.Week, text: week.Week };
    });

    setWeeks(result);
  };

  useEffect(() => {
    sendRequest({ url: `learningcontracts?weeks` }, listWeeks);
    sendRequest({ url: "learningcontracts" }, listLearningContract);
  }, []);

  let className = "";
  if(props.fullWidth){
    className = "card_large";
  }else{
    className = "card_mid";
  }



  // responsible for updating the learning contracts state
  const onAddLearningContract = (data, id = null) => {
    let startDate = new Date(data.StartDate).toLocaleDateString(
      "en-Monrovia",
      option
    );
    let endDate = new Date(data.EndDate).toLocaleDateString(
      "en-Monrovia",
      option
    );

    if (id === null) {
      dispatchContracts({
        type: "ADD",
        learningContracts: {
          ...data,
          StartDate: startDate,
          EndDate: endDate,
          Goal: data.GoalText,
        },
      });
    } else {
      dispatchContracts({
        type: "UPDATE",
        learningContract: {
          ...data,
          StartDate: startDate,
          EndDate: endDate,
          Goal: data.GoalText,
        },
        id: parseInt(id),
      });
    }
  };

  // responsible for showing the form for updating a learning contract
  const showUpdateForm = (id) => {
    setShowForm(true);
    setUpdate(true);
    setID(id);
  };

  const onShowFormHandler = () => {
    setUpdate(false);
    setID("");
    setShowForm(true);
  };

  const onFormCloseHandler = () => {
    setShowForm(false);
  };

  const onDeleteHandler = (id) => {
    dispatchContracts({ type: "REMOVE", id: +id });
  };

  return (
    <Fragment>
      {/* Opens form for saving new learning contract */}
      {showForm && !update && (
        <Modal
          onClose={onFormCloseHandler}
          className="modal-dialog-scrollable"
          headerText="Add Learning Contract"
        >
          <LearningContractForm onSave={onAddLearningContract} />
        </Modal>
      )}
      {/* Opens form for updating existing learning contract */}
      {showForm && update && (
        <Modal
          onClose={onFormCloseHandler}
          className="modal-dialog-scrollable"
          headerText="Update Learning Contract"
        >
          <LearningContractForm id={id} onSave={onAddLearningContract} />
        </Modal>
      )}
      <Card className={className}>
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>
          Learning Contracts
        </h2>
        <div>
          <SelectInput options={weeks} className="select-sm" label="Weeks" />
          <Button className="btn__new" onClick={onShowFormHandler}>
            <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
            &nbsp;New
          </Button>
          <Button className="btn__action">
            Print &nbsp;<FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
          </Button>
        </div>
        <LearningContractTable
          data={contracts.learningContracts}
          onShowForm={showUpdateForm}
          onDelete={onDeleteHandler}
        />
        {contracts.learningContracts.Activities}
      </Card>
    </Fragment>
  );
};

export default LearningContracts;
