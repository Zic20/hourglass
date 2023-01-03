import React, { useState, useReducer, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import Modal from "../Utilities/Modal";
import MyDatatable from "../Utilities/DataTableBase";
import StaffForm from "../Forms/StaffForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// reducer function for staffState
const staffReducer = (state, action) => {
  if (action.Type === "ADD") {
    let { FirstName, LastName } = action.staff;
    let MiddleName =
      action.staff.MiddleName !== null ? action.staff.MiddleName : "";
    action.staff.Name = `${FirstName} ${MiddleName} ${LastName}`;
    const updatedState = state.staff.concat(action.staff);
    return { staff: updatedState };
  }
  if (action.Type === "UPDATE") {
    const result = state.staff.filter(
      (personnel) => personnel.StaffID !== action.staff.StaffID
    );

    let { FirstName, LastName } = action.staff;
    let MiddleName =
      action.staff.MiddleName !== null ? action.staff.MiddleName : "";
    action.staff.Name = `${FirstName} ${MiddleName} ${LastName}`;
    result.push({ id: action.id, ...action.staff });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return { staff: sortedList };
  }

  if (action.Type === "DELETE") {
    const result = state.staff.filter(
      (personnel) => parseInt(personnel.id) !== parseInt(action.id)
    );
    return { staff: result };
  }
  return { staff: [] };
};

// main component function
const Staff = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setID] = useState(Number);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    sendRequest({ url: `staff` }, (data) => {
      data.forEach((row) => {
        dispatchStaff({ Type: "ADD", staff: row });
      });
    });
  }, []);

  const [staffState, dispatchStaff] = useReducer(staffReducer, { staff: [] });
  const { error, loading, sendRequest } = useFetch();
  const { staff } = staffState;

  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const columns = [
    {
      name: "Staff ID",
      width: "200px",
      selector: (row) => row.StaffID,
      wrap: true,
      sortable: true,
    },
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

  const onShowFormHandler = () => {
    setShowForm(true);
  };

  const onFormClose = () => {
    if (update) {
      setUpdate(false);
    }

    setShowForm(false);
  };

  const onShowUpdateForm = (event) => {
    const id = parseInt(event.target.closest("button").value);
    setUpdate(true);
    setShowForm(true);
    const selectedRow = staff.filter(
      (row) => parseInt(row.id) === parseInt(id)
    );
    setSelectedRow(selectedRow[0]);
  };

  const onDeleteHandler = (event) => {
    const id = parseInt(event.target.closest("button").value);
    if (
      window.confirm(
        "Are you sure you want to delete this staff's record? Deleted records cannot be retrieved!"
      )
    ) {
      sendRequest({ url: `staff/${id}`, method: "DELETE" }, (data) => {
        if (!error) {
          if (data.rows > 0) {
            alert("Record deleted");
            dispatchStaff({ Type: "DELETE", id });
          }
        }
      });
    }
  };

  const onSaveHandler = (data) => {
    dispatchStaff({ Type: "ADD", staff: data });
  };
  const onUpdateHandler = (data, id) => {
    dispatchStaff({ Type: "UPDATE", staff: data, id });
  };

  return (
    <React.Fragment>
      {showForm && !update && (
        <Modal headerText="Add Staff" onClose={onFormClose}>
          <StaffForm onSave={onSaveHandler} />
        </Modal>
      )}

      {showForm && update && (
        <Modal headerText="Edit Staff Record" onClose={onFormClose}>
          <StaffForm onSave={onUpdateHandler} data={selectedRow} />
        </Modal>
      )}
      <Card className={className}>
        <h3>Staff</h3>
        <Button className="btn__new" onClick={onShowFormHandler}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> &nbsp;
          New Staff
        </Button>
        <MyDatatable columns={columns} data={staff} />
      </Card>
    </React.Fragment>
  );
};

export default Staff;
