import React, { useState, useRef, useEffect } from "react";
import Button from "../Utilities/Button";
import Card from "../Utilities/Card";
import formStyles from "./Form.module.css";
import styles from "./StudentProfile.module.css";
import Input from "../Utilities/Inputs/Input";
import { validateDateInputs } from "../../modules/timecalculation";

const PracticumDetails = () => {
  const [term, setTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState(400);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        term.length > 0 &&
        startDate.toString().length > 0 &&
        endDate.toString().length > 0 &&
        parseInt(hours) > 0
      )
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [term, startDate, endDate, hours]);

  const termRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const hoursRef = useRef();

  const onTermChangeHandler = (event) => {
    const term = event.target.value.trim();
    setTerm(term);
  };
  const onTermBlurHandler = (event) => {
    const term = event.target.value.trim();
    setTerm(term);
  };

  const onStartDateChangeHandler = (event) => {
    const startDate = new Date(event.target.value);
    setStartDate(startDate);
  };
  const onEndDateChangeHandler = (event) => {
    const endDate = new Date(event.target.value);
    setEndDate(endDate);
  };

  const onHoursChangeHandler = (event) => {
    const hours = event.target.value;
    setHours(hours);
  };

  const onCancelHandler = () => {
    termRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    hoursRef.current.value = "";

    setTerm("");
    setStartDate("");
    setEndDate("");
    setHours(400);
  };
  const onSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (validateDateInputs(startDate, endDate)) {
        const data = {
          practicumTerm: term,
          startDate: startDate,
          endDate: endDate,
          hours: hours,
        };
        console.log(data);
        setTimeout(onCancelHandler, 1000);
      }
    } else {
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmissionHandler}>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="practicumTerm"
            label="Practicum Term"
            type="text"
            placeholder="Practicum Term"
            onChange={onTermChangeHandler}
            onBlur={onTermBlurHandler}
            ref={termRef}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="startDate"
            label="Start Date"
            type="date"
            onChange={onStartDateChangeHandler}
            ref={startDateRef}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="endDate"
            label="End Date"
            type="date"
            onChange={onEndDateChangeHandler}
            ref={endDateRef}
          />
        </div>
        <div className={formStyles["form__group-inline"]}>
          <Input
            id="hours"
            label="Target Hours"
            type="number"
            max="400"
            min="1"
            defaultValue="400"
            onChange={onHoursChangeHandler}
            ref={hoursRef}
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

export default PracticumDetails;
