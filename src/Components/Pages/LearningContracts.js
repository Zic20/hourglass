import React, {
  useState,
  useEffect,
  useReducer,
  Fragment,
  useCallback,
} from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
import LearningContractForm from "../Forms/LearningContractForm";
import Modal from "../Utilities/Modal";
import LearningContractTable from "../Tables/LearningContractTable";
import LearningContractPrint from "../Reports/LearningContractPrint";
import SelectVariants from "../ImportedComponents/SelectVariants";


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
  const [week, setWeek] = useState([]);
  const [id, setID] = useState("");
  const [activeRow, setActiveRow] = useState({});

  const [contracts, dispatchContracts] = useReducer(contractsReducer, {
    learningContracts: [],
  });
  const { sendRequest } = useFetch();

  const option = { year: "numeric", month: "long", day: "numeric" };

  const listLearningContract = useCallback((data) => {
    dispatchContracts({ type: "REMOVE_ALL" });
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
  }, []);

  const listWeeks = (data) => {
    const result = data.map((week) => {
      return { value: week.Week, text: `Week ${week.Week}` };
    });

    setWeeks(result);
  };

  useEffect(() => {
    sendRequest({ url: `learningcontracts?weeks` }, listWeeks);
    sendRequest({ url: "learningcontracts" }, listLearningContract);
  }, []);

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

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

  const showUpdateForm = (id) => {
    const row = contracts.learningContracts.filter((learningcontract) => {
      return parseInt(learningcontract.id) === parseInt(id);
    });
    setActiveRow(row[0]);
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

  const onPrintHandler = () => {
    let learningcontract = contracts.learningContracts.filter(
      (row) => row.Week === +week
    );
    
    LearningContractPrint({
      data: learningcontract,
      title: "Learning Contract",
    });
  };

  const onWeekChangeHandler = (week) => {
    setWeek(week);
  }

  return (
    <Fragment>
      {showForm && !update && (
        <Modal
          onClose={onFormCloseHandler}
          className="modal-dialog-scrollable"
          headerText="New Goal"
        >
          <LearningContractForm onSave={onAddLearningContract} />
        </Modal>
      )}

      {showForm && update && (
        <Modal
          onClose={onFormCloseHandler}
          className="modal-dialog-scrollable"
          headerText="Edit Goal"
        >
          <LearningContractForm
            id={id}
            data={activeRow}
            onSave={onAddLearningContract}
          />
        </Modal>
      )}

      <Card className={className}>
        <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>Goals</h2>
        <div>
          <SelectVariants data={weeks} title="Weeks" onChange={onWeekChangeHandler} />

          <Button className="btn__new" onClick={onShowFormHandler}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            &nbsp;New Goal
          </Button>
          {/* <Button className="btn__action" onClick={onPrintHandler}>
            Print &nbsp;<FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
          </Button> */}
        </div>
        <LearningContractTable
          data={contracts.learningContracts}
          onShowForm={showUpdateForm}
          onDelete={onDeleteHandler}
        />
      </Card>
    </Fragment>
  );
};

export default LearningContracts;
