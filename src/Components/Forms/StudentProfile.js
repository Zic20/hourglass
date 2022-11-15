import React, { useState, useEffect, useRef } from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import styles from "./StudentProfile.module.css";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import AddIcon from '@mui/icons-material/Add';
import Avatar from "../Utilities/Avatar";

const StudentProfile = () => {
  const [studentID, setStudentID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const studentIDRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log({
      StudentID: studentID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      Email: email,
      PhoneNo: phoneNo,
    });
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
    studentIDRef.current.clear();
    firstNameRef.current.clear();
    middleNameRef.current.clear();
    lastNameRef.current.clear();
    emailRef.current.clear();
    phoneRef.current.clear();
  };

  return (
    <Card>
      <form onSubmit={onSubmitHandler} className={styles.studentForm}>
        <div className={styles.avatar}>
          <Avatar/>
        </div>
        <div className={styles.form}>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="studentID"
              label="Student ID"
              type="text"
              placeholder="Student ID"
              onChange={studentIDChangeHandler}
              ref={studentIDRef}
            />
          </div>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="firstName"
              label="First Name"
              type="text"
              placeholder="First Name"
              onChange={firstNameChangeHandler}
              ref={firstNameRef}
            />
          </div>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="middleName"
              label="Middle Name"
              type="text"
              placeholder="Middle Name"
              onChange={middleNameChangeHandler}
              ref={middleNameRef}
            />
          </div>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={lastNameChangeHandler}
              ref={lastNameRef}
            />
          </div>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="Email"
              onChange={emailChangeHandler}
              ref={emailRef}
            />
          </div>
          <div className={formStyles["form__group-inline"]}>
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Phone Number"
              onChange={phoneNoChangeHandler}
              ref={phoneRef}
            />
          </div>

          <div className={styles["footer"]}>
            <Button type="submit" className="btn__primary">
              Save
            </Button>
            <Button onClick={formCancelHandler} className="btn__cancel">
               Cancel
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default StudentProfile;
