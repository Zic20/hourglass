import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import styles from "./StudentProfile.module.css";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import Alert from "../Utilities/Alert";

const StudentProfile = (props) => {
  const [studentID, setStudentID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [id, setID] = useState(Number);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        studentID !== "" &&
          firstName !== "" &&
          lastName !== "" &&
          phoneNo !== ""
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [studentID, firstName, lastName, phoneNo]);

  useEffect(() => {
    formCancelHandler();
    if (props.id) {
      setID(props.id);
      fetchStudentRecord(props.id);
    }
  }, []);

  const { loading, error, sendRequest } = useFetch();

  const fetchStudentRecord = (id) => {
    const useData = (data) => {
      if (!error) {
        const {
          StudentID,
          FirstName,
          MiddleName,
          LastName,
          Email,
          PhoneNo,
        } = data;
        setStudentID(StudentID);
        setEmail(Email);
        setfirstName(FirstName);

        MiddleName !== null ? setmiddleName(MiddleName) : setmiddleName("");
        setlastName(LastName);
        setEmail(Email);
        setPhoneNo(PhoneNo);
      }
    };

    sendRequest({ url: `students/${id}` }, useData);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!formIsValid) {
      return;
    }
    const userData = {
      StudentID: studentID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      Email: email,
      PhoneNo: phoneNo,
    };

    if (id > 0) {
      sendRequest(
        { url: `students/${id}`, method: "PATCH", body: userData },
        (data) => {
          if (!error) {
            userData.id = id;
            let { FirstName, MiddleName, LastName } = userData;
            userData.Name = `${FirstName} ${MiddleName} ${LastName}`;
            if (data.rows > 0) {
              setMessage("Student record update successful");
            } else {
              setMessage("No change has been made.");
            }
            props.onSave(userData, id);
          }
        }
      );
    } else {
      sendRequest(
        { url: `students`, method: "POST", body: userData },
        (data) => {
          if (!error) {
            userData.id = data.id;
            let { FirstName, MiddleName, LastName } = userData;
            userData.Name = `${FirstName} ${MiddleName} ${LastName}`;
            setMessage(data.message);
            props.onSave(userData);
          } else {
            alert(data.message);
          }
        }
      );
    }
  };

  const studentIDChangeHandler = (event) => {
    setStudentID(event.target.value.trim());
  };

  const firstNameChangeHandler = (event) => {
    setfirstName(event.target.value.trim());
  };

  const middleNameChangeHandler = (event) => {
    setmiddleName(event.target.value.trim());
  };

  const lastNameChangeHandler = (event) => {
    setlastName(event.target.value.trim());
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value.trim());
  };

  const phoneNoChangeHandler = (event) => {
    setPhoneNo(event.target.value.trim());
  };

  const formCancelHandler = () => {
    setStudentID("");
    setEmail("");
    setfirstName("");
    setmiddleName("");
    setlastName("");
    setPhoneNo("");
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.studentForm}>
      <div className={styles.form}>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="studentID"
            label="Student ID"
            type="text"
            placeholder="Student ID"
            onChange={studentIDChangeHandler}
            disabled={props.id}
            value={studentID}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            onChange={firstNameChangeHandler}
            value={firstName}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="middleName"
            label="Middle Name"
            type="text"
            placeholder="Middle Name"
            onChange={middleNameChangeHandler}
            value={middleName}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            onChange={lastNameChangeHandler}
            value={lastName}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            placeholder="Email"
            onChange={emailChangeHandler}
            value={email}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Phone Number"
            onChange={phoneNoChangeHandler}
            value={phoneNo}
          />
        </div>
        {error && <Alert className="alert__error">Something went wrong</Alert>}
        {message.length > 0 && (
          <Alert className="alert__success">{message}</Alert>
        )}

        <div className={styles["footer"]}>
          <Button
            type="submit"
            className="btn__new"
            disabled={!formIsValid}
            onClick={onSubmitHandler}
          >
            Save
            {/* {!loading && "Save"}
            {loading && submitted && (
              <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>
            )} */}
          </Button>
          <Button onClick={formCancelHandler} className="btn__cancel">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StudentProfile;
