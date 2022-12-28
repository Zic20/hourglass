import React, { useState, useReducer, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import AgenciesForm from "../Forms/AgenciesForm";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import Modal from "../Utilities/Modal";
import MyDatatable from "../Utilities/DataTableBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";

const agenciesReducer = (state, action) => {
  if (action.Type === "ADD") {
    const result = state.agencies.concat(action.agency);
    return { agencies: result };
  }

  if (action.Type === "UPDATE") {
    const result = state.agencies.filter(
      (agency) => parseInt(agency.id) !== parseInt(action.id)
    );

    result.push({ id: action.id, ...action.agency });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return { agencies: sortedList };
  }

  if (action.Type === "DELETE") {
    const result = state.agencies.filter(
      (agency) => parseInt(agency.id) !== parseInt(action.id)
    );
    return { agencies: result };
  }

  return { agencies: [] };
};
const Agencies = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [agencyID, setAgencyID] = useState(Number);
  const [agenciesState, dispatchAgencies] = useReducer(agenciesReducer, {
    agencies: [],
  });

  useEffect(() => {
    const useData = (data) => {
      data.forEach((agency) => {
        dispatchAgencies({ Type: "ADD", agency });
      });
    };
    sendRequest({ url: "agencies" }, useData);
  }, []);

  const { error, loading, sendRequest } = useFetch();
  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const columns = [
    {
      name: "Acronym",
      width: "6rem",
      selector: (row) => row.Acronym,
      wrap: true,
    },
    {
      name: "Name",
      width: "13rem",
      sortable: true,
      selector: (row) => row.Name,
      wrap: true,
    },
    {
      name: "Address",
      width: "10rem",
      selector: (row) => row.Location,
      wrap: true,
    },
    { name: "Type", width: "5rem", selector: (row) => row.Type, wrap: true },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row.PhoneNo,
      cell: (row) => <a href={`tel:${row.PhoneNo}`}>{row.PhoneNo}</a>,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      cell: (row) => <a href={`mailto:${row.Email}`}>{row.Email}</a>,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <>
          <Button value={row.id} onClick={onUpdateHandler}>
            <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>
          </Button>
          <Button value={row.id} onClick={onDeleteHandler}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </>
      ),
      style: {
        textAlign: "left",
        fontSize: "1rem",
      },
    },
  ];

  const onDeleteHandler = (event) => {
    const id = event.target.closest("button").value;
    if (
      window.confirm(
        "Do you want to delete this Agency's record? Deleted records cannot be recovered."
      )
    ) {
      sendRequest({ url: `agencies/${id}`, method: "DELETE" }, () => {
        dispatchAgencies({ Type: "DELETE", id });
      });
    }
  };

  const onUpdateList = (data, id) => {
    dispatchAgencies({ Type: "UPDATE", agency: data, id });
  };

  const onAddToList = (data) => {
    dispatchAgencies({ Type: "ADD", agency: data });
  };
  const onUpdateHandler = (event) => {
    const id = event.target.closest("button").value;
    setAgencyID(+id);
    setUpdate(true);
    setShowForm(true);
  };

  const onShowFormHandler = () => {
    setShowForm(true);
  };

  const onFormCloseHandler = () => {
    setShowForm(false);
    setUpdate(false);
  };

  const { agencies } = agenciesState;

  return (
    <React.Fragment>
      {update && showForm && (
        <Modal headerText="Edit Agency Details" onClose={onFormCloseHandler}>
          <AgenciesForm id={agencyID} onSave={onUpdateList} />
        </Modal>
      )}
      {!update && showForm && (
        <Modal headerText="Add Agency" onClose={onFormCloseHandler}>
          <AgenciesForm onSave={onAddToList} />
        </Modal>
      )}

      <Card className={className}>
        <h3>Agencies</h3>
        <Button className="btn__new" onClick={onShowFormHandler}>
          <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
          &nbsp; New
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>Couldn't load data</p>}
        {!loading && !error && (
          <MyDatatable data={agencies} columns={columns} />
        )}
      </Card>
    </React.Fragment>
  );
};

export default Agencies;
