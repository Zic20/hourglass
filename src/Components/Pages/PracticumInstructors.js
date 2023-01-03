import React, { useState, useReducer, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import Modal from "../Utilities/Modal";
import MyDatatable from "../Utilities/DataTableBase";
import PracticumInstructorForm from "../Forms/PracticumInstructorForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const PracticumInstructors = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      wrap: true,
    },
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
          <Button value={row.id} onClick={onShowUpdateForm}>
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

  const instructors = [
    {
      Name: "Isaac Zally, Jr",
      PhoneNo: "0777204203",
      Email: "izallyjr@gmail.com",
      id: 1,
    },
  ];

  const onFormClose = () => {};
  const onShowUpdateForm = () => {};
  const onShowFormHandler = () => {};
  const onSaveHandler = () => {};
  const onUpdateHandler = (event) => {};
  const onDeleteHandler = (event) => {};

  return (
    <React.Fragment>
      {showForm && !update && (
        <Modal headerText="Add Staff" onClose={onFormClose}>
          <PracticumInstructorForm onSave={onSaveHandler} />
        </Modal>
      )}

      {showForm && update && (
        <Modal headerText="Edit Staff Record" onClose={onFormClose}>
          <PracticumInstructorForm onSave={onUpdateHandler} data={[]} />
        </Modal>
      )}
      <Card className={className}>
        <h3>Practicum Instructors</h3>
        <Button className="btn__new" onClick={onShowFormHandler}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp; New Practicum
          Instructor
        </Button>
        <MyDatatable columns={columns} data={instructors} />
      </Card>
    </React.Fragment>
  );
};

export default PracticumInstructors;
