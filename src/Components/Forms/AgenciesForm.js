import React, { useState, useRef, useEffect } from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import formStyles from "./Form.module.css";
import styles from "./StudentProfile.module.css";
import Input from "../Utilities/Inputs/Input";

const AgenciesForm = () => {
  const [agencyCode, setAgencyCode] = useState("");
  const [agencyType, setAgencyType] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        agencyCode.length > 0 &&
          agencyType.length > 0 &&
          name.length > 0 &&
          phoneNo.length > 0 &&
          email.length > 0 &&
          address.length > 0
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [agencyCode, agencyType, name, phoneNo, email, address]);

  const onAgencyCodeChangeHandler = (event) => {
    setAgencyCode(event.target.value.trim());
  };
  const onAgencyTypeChangeHandler = (event) => {
    setAgencyType(event.target.value.trim());
  };
  const onNameChangeHandler = (event) => {
    setName(event.target.value.trim());
  };
  const onPhoneNoChangeHandler = (event) => {
    setPhoneNo(event.target.value.trim());
  };
  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value.trim());
  };
  const onAddressChangeHandler = (event) => {
    setAddress(event.target.value.trim());
  };

  const onSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const data = {
        agencyCode: agencyCode,
        agencyType: agencyType,
        name: name,
        phoneNo: phoneNo,
        email: email,
        address: address,
      };

      console.log(data);
    }
  };

  const onCancelHandler = () => {
    
  }
  return (
    <Card>
      <form onSubmit={onSubmissionHandler}>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="agencyCode"
            label="Agency Code"
            type="text"
            placeholder="Agency Code"
            onChange={onAgencyCodeChangeHandler}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="agencyType"
            label="Agency Type"
            type="text"
            placeholder="Enter agency type here"
            onChange={onAgencyTypeChangeHandler}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter agency name here"
            onChange={onNameChangeHandler}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="phoneNo"
            label="Phone Number"
            type="tel"
            placeholder="+231777204203"
            onChange={onPhoneNoChangeHandler}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            placeholder="Enter email address here"
            onChange={onEmailChangeHandler}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="address"
            label="Address"
            type="text"
            placeholder="Enter address here"
            onChange={onAddressChangeHandler}
          />
        </div>
        <div className={styles["footer"]}>
          <Button
            type="submit"
            className="btn__primary"
            disabled={!formIsValid ? true : false}
          >
            Save
          </Button>
          <Button
            type="button"
            className="btn__cancel"
            onClick={onCancelHandler}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AgenciesForm;
