import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Alert from "../Utilities/Alert";
import Button from "../Utilities/Button";
import formStyles from "./Form.module.css";
import styles from "./StudentProfile.module.css";
import Input from "../Utilities/Inputs/Input";

const AgenciesForm = (props) => {
  const [id, setID] = useState(Number);
  const [acronym, setAcronym] = useState("");
  const [agencyType, setAgencyType] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        agencyType.length > 0 &&
          name.length > 0 &&
          phoneNo.length > 0 &&
          address.length > 0
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [acronym, agencyType, name, phoneNo, email, address]);

  useEffect(() => {
    if (props.id) {
      setID(props.id);

      sendRequest({ url: `agencies/${props.id}` }, (data) => {
        const { Acronym, Type, Name, PhoneNo, Email, Location } = data;

        setAcronym(Acronym);
        setAgencyType(Type);

        if (Name !== null) {
          setName(Name);
        }

        if (PhoneNo !== null) {
          setPhoneNo(PhoneNo);
        }

        if (Email !== null) {
          setEmail(Email);
        }

        if (Location !== null) {
          setAddress(Location);
        }
      });
    }
  }, []);

  const { error, sendRequest } = useFetch();

  const onAcronymChangeHandler = (event) => {
    setAcronym(event.target.value.trim());
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
      const userData = {
        Acronym: acronym,
        Type: agencyType,
        Name: name,
        PhoneNo: phoneNo,
        Email: email,
        Location: address,
      };

      if (id > 0) {
        sendRequest(
          { url: `agencies/${id}`, method: "PATCH", body: userData },
          (data) => {
            if (error) {
              setMessage("Something went wrong please try later");
              return;
            }

            if (data.rows > 0) {
              userData.id = id;
              setMessage("Agency record update successful");
              props.onSave(userData, id);
            }else {
              setMessage("No change was made.");
            }
          }
        );
      } else {
        sendRequest(
          { url: `agencies`, method: "POST", body: userData },
          (data) => {
            if (error) {
              setMessage("Something went wrong please try later");
              return;
            }

            userData.id = data.id;
            setMessage(data.message);
            props.onSave(userData);
          }
        );
      }
    }
  };

  const onCancelHandler = () => {};
  return (
    <form onSubmit={onSubmissionHandler}>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="acronym"
          label="Agency Acronym"
          type="text"
          placeholder="Agency Acronym"
          onChange={onAcronymChangeHandler}
          value={acronym}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="agencyType"
          label="Agency Type"
          type="text"
          placeholder="Enter agency type here"
          onChange={onAgencyTypeChangeHandler}
          value={agencyType}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="name"
          label="Name"
          type="text"
          placeholder="Enter agency name here"
          onChange={onNameChangeHandler}
          value={name}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="phoneNo"
          label="Phone Number"
          type="tel"
          placeholder="Enter Phone Number Here"
          onChange={onPhoneNoChangeHandler}
          value={phoneNo}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="Enter email address here"
          onChange={onEmailChangeHandler}
          value={email}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="address"
          label="Address"
          placeholder="Enter address here"
          onChange={onAddressChangeHandler}
          value={address}
        />
      </div>

      {error && message.length > 0 && <Alert className="alert__error">{message}</Alert>}
      {message.length > 0 && !error && (
        <Alert className="alert__success">{message}</Alert>
      )}
      <div className={styles["footer"]}>
        <Button
          type="submit"
          className="btn__primary"
          disabled={!formIsValid ? true : false}
        >
          Save
        </Button>
        <Button type="button" className="btn__cancel" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AgenciesForm;
