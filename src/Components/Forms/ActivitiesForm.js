import React, { useState } from "react";
import Button from "../Utilities/Button";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import {
  validateTimeInputs,
  getTimeSpent,
} from "../../modules/timecalculation";

const ActivitiesForm = () => {
  const [week, setWeek] = useState(null);
  const [date, setDate] = useState(null);
  const [activity, setActivity] = useState("");
  const [activityType, setActivityType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");

  const startTimeBlurHandler = (event) => {
    setStartTime(event.target.value);
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
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="date"
          label="Date"
          type="date"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
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
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <select>
            <option>Client Contact</option>
        </select>
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="startTime"
          label="Start Time"
          type="time"
          onBlur={startTimeBlurHandler}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="endTime"
          label="End Time"
          type="time"
          readOnly={startTime.trim() !== "" ? false : true}
          onBlur={endTimeBlurHandler}
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
        <Button type="submit" className="btn__primary">
          Save
        </Button>
        <Button className="btn__cancel">Cancel</Button>
      </div>
    </form>
  );
};

export default ActivitiesForm;
