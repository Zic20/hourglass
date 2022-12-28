import React, { useState, useReducer, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import Modal from "../Utilities/Modal";
import StudentProfile from "../Forms/StudentProfile";
import MyDatatable from "../Utilities/DataTableBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faTrash, faFile } from "@fortawesome/free-solid-svg-icons";

const studentsReducer = (state, action) => {
  if (action.Type === "ADD") {
    const updatedState = state.students.concat(action.student);
    return { students: updatedState };
  }
  if (action.Type === "UPDATE") {
    const result = state.students.filter(
      (student) => student.StudentID !== action.student.StudentID
    );

    result.push({ id: action.id, ...action.student });
    const sortedList = result.sort((a, b) => a.id - b.id);
    return { students: sortedList };
  }

  if (action.Type === "DELETE") {
    const result = state.students.filter(
      (student) => parseInt(student.id) !== parseInt(action.id)
    );
    return { students: result };
  }
  return { students: [] };
};

const Students = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [studentID, setStudentID] = useState(Number);
  const [studentsState, dispatchStudents] = useReducer(studentsReducer, {
    students: [],
  });

  useEffect(() => {
    const listStudents = (data) => {
      data.forEach((student) => {
        let { FirstName, MiddleName, LastName } = student;
        student = {
          ...student,
          Name: `${FirstName} ${MiddleName} ${LastName}`,
        };
        dispatchStudents({ Type: "ADD", student });
      });
    };

    sendRequest({ url: "students" }, listStudents);
  }, []);

  const { error, loading, sendRequest } = useFetch();


  const columns = [
    {
      name: "Student ID",
      width: "200px",
      selector: (row) => row.StudentID,
      wrap: true,
    },
    {
      name: "Name",
      sortable: true,
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
  let className = "";
  if (props.fullWidth) {
    className = "card_large";
  } else {
    className = "card_mid";
  }

  const onShowFormHandler = () => {
    setUpdate(false);
    setStudentID(Number)
    setShowForm(true);
  };

  const addStudent = (data) => {
    dispatchStudents({ Type: "ADD", student: data });
  };

  const updateStudentsList = (data, id) => {
    dispatchStudents({ Type: "UPDATE", student: data, id });
  };

  const onUpdateHandler = (event) => {
    const id = event.target.closest("button").value;
    setStudentID(+id);
    setUpdate(true);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);
  const onDeleteHandler = (event) => {
    const id = event.target.closest("button").value;
    if (
      window.confirm(
        "Do you want to delete this Student's record? Deleted records cannot be recovered."
      )
    ) {
      sendRequest({ url: `students/${id}`, method: "DELETE" }, () => {
        dispatchStudents({ Type: "DELETE", id });
      });
    }
  };
  const { students } = studentsState;
  return (
    <React.Fragment>
      {showForm && !update && (
        <Modal headerText="New Student" onClose={closeForm}>
          <StudentProfile onSave={addStudent} />
        </Modal>
      )}

      {showForm && update && (
        <Modal headerText="Edit Student Record" onClose={closeForm}>
          <StudentProfile id={studentID} onSave={updateStudentsList} />
        </Modal>
      )}

      <Card className={className}>
        <h3>Students</h3>
        <Button className="btn__new" onClick={onShowFormHandler}>
          <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
          &nbsp; New
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>Couldn't load data</p>}
        {!loading && !error && (
          <MyDatatable columns={columns} data={students} />
        )}
      </Card>
    </React.Fragment>
  );
};

export default Students;
