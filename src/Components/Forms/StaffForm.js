import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import Alert from "../Utilities/Alert";
import Button from "../Utilities/Button";
// import Card from "../Utilities/Card";
import styles from "./StudentProfile.module.css";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
// import Avatar from "../Utilities/Avatar";

const StaffForm = (props) => {
  const [staffID, setStaffID] = useState("");
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [id, setID] = useState(Number);
  const [message, setMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(staffID !== "" && firstName !== "" && lastName !== "");
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [staffID, firstName, lastName, phoneNo]);

  useEffect(() => {
    if (props.data) {
      const { data } = props;
      setID(+data.id);
      setfirstName(data.FirstName);
      if (data.MiddleName !== null) {
        setmiddleName(data.MiddleName);
      }
      setlastName(data.LastName);

      if (data.PhoneNo !== null) {
        setPhoneNo(data.PhoneNo);
      }

      if (data.Email !== null) {
        setEmail(data.Email);
      }
      setStaffID(data.StaffID);
    }
  }, []);

  const { error, loading, sendRequest } = useFetch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const userData = {
      StaffID: staffID,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      Email: email,
      PhoneNo: phoneNo,
    };

    if (id > 0) {
      // update
      sendRequest(
        { url: `staff/${id}`, method: "PATCH", body: userData },
        (data) => {
          if (!error) {
            if (data.rows > 0) {
              setMessage("Staff Record updated");
              props.onSave(userData, id);
            } else {
              setMessage("No change was made");
            }
          } else {
            setMessage("Could not update staff information. Please try later");
          }
        }
      );
    } else {
      // add new
      sendRequest({ url: `staff`, method: "POST", body: userData }, (data) => {
        if (!error) {
          if (data.id > 0) {
            setMessage("Staff created");
            props.onSave(userData);
          } else {
            setMessage("Could not save Staff information. Please try later");
          }
        } else {
          setMessage("Could not save staff information. Please try later");
        }
      });
    }
  };

  const staffIDChangeHandler = (event) => {
    setStaffID(event.target.value.trim());
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

  const formCancelHandler = () => {};

  return (
    <form onSubmit={onSubmitHandler} className={styles.studentForm}>
      {/* <div className={styles.avatar}>
          <Avatar />
        </div> */}
      <div className={styles.form}>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="staffID"
            label="Staff ID"
            type="text"
            placeholder="Staff ID"
            onChange={staffIDChangeHandler}
            disabled={id > 0}
            value={staffID}
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

        {message.length > 0 && !error && (
          <Alert className="alert__success">{message}</Alert>
        )}

        <div className={styles["footer"]}>
          
          <Button type="submit" className="btn__primary">
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon> &nbsp;
            Save
          </Button>
          <Button onClick={formCancelHandler} className="btn__cancel">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StaffForm;
