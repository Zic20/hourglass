import React, { useState, useEffect, useRef } from "react";
import Button from "../Utilities/Button";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import {
  validateTimeInputs,
  getTimeSpent,
} from "../../modules/timecalculation";

const ActivitiesForm = () => {
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityType, setActivityType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const weekRef = useRef();
  const dateRef = useRef();
  const activityRef = useRef();
  const activityTypeRef = useRef();
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const timeSpentRef = useRef();

  useEffect(() => {
    setFormIsValid(
      week !== "" &&
        date !== "" &&
        activity !== "" &&
        activityType !== "" &&
        startTime !== "" &&
        endTime !== ""
    );
  }, [week, date, activity, activityType, startTime, endTime]);

  const startTimeBlurHandler = (event) => {
    setStartTime(event.target.value);

    if (endTime.length > 0) {
      let timeInput = getTimeSpent(event.target.value, endTime);
      setTimeSpent(timeInput);
    }
  };

  const endTimeBlurHandler = (event) => {
    if (validateTimeInputs(startTime, event.target.value)) {
      setEndTime(event.target.value);
      let timeInput = getTimeSpent(startTime, event.target.value);
      setTimeSpent(timeInput);
    }
  };

  const dateBlurHandler = (event) => {
    setDate(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const weekBlurHandler = (event) => {
    setWeek(event.target.value);
  };
  const weekChangeHandler = (event) => {
    setWeek(event.target.value);
  };

  const activityChangeHandler = (event) => {
    setActivity(event.target.value);
  };
  const activityBlurHandler = (event) => {
    setActivity(event.target.value);
  };

  const activityTypeChangeHandler = (event) => {
    setActivityType(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      week === "" ||
      date === "" ||
      activity === "" ||
      activityType === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      return;
    }
    const data = {
      Week: week,
      Date: date,
      Activity: activity,
      ActivityType: activityType,
      StartTime: startTime,
      EndTime: endTime,
    };
    console.log(data);
  };

  const onCancelHandler = () => {
    weekRef.current.value = "";
    dateRef.current.value = "";
    activityRef.current.value = "";
    startTimeRef.current.value = "";
    endTimeRef.current.value = "";
    activityTypeRef.current.selectedIndex = 0;
    setTimeSpent("");
    setFormIsValid(false);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="week"
          label="Week"
          type="number"
          placeholder="Week"
          onChange={weekChangeHandler}
          onBlur={weekBlurHandler}
          ref={weekRef}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="date"
          label="Date"
          type="date"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          ref={dateRef}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="Activity"
          label="Activity"
          type="text"
          placeholder="Enter Activity"
          onChange={activityChangeHandler}
          onBlur={activityBlurHandler}
          ref={activityRef}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <label>Activity Type</label>
        <select onChange={activityTypeChangeHandler} ref={activityTypeRef}>
          <option></option>
          <option>Client Contact</option>
        </select>
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="startTime"
          label="Start Time"
          type="time"
          onBlur={startTimeBlurHandler}
          ref={startTimeRef}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="endTime"
          label="End Time"
          type="time"
          readOnly={startTime.trim() !== "" ? false : true}
          onBlur={endTimeBlurHandler}
          ref={endTimeRef}
        />
      </div>

      <div className={formStyles["form__group-inline"]}>
        <Input
          id="timeSpent"
          label="Time Spent"
          type="text"
          readOnly={true}
          value={timeSpent}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Button
          type="submit"
          className="btn__primary"
          onClick={onSubmitHandler}
          disabled={!formIsValid ? true : false}
        >
          Save
        </Button>
        <Button className="btn__cancel" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ActivitiesForm;