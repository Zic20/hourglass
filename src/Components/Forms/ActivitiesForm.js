import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Alert from "../Utilities/Alert";
import Button from "../Utilities/Button";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import {
  validateTimeInputs,
  getTimeSpent,
  convertTime,
  convertDate,
} from "../../modules/timecalculation";
import SelectInput from "../Utilities/Inputs/Select";

const activityTypes = [
  { value: 1, text: "Client Contact" },
  { value: 2, text: "Instructor Conferences" },
  { value: 3, text: "Meetings/Conferences Outside Agency" },
  { value: 4, text: "Orientation Training" },
  { value: 5, text: "Observation" },
  { value: 6, text: "Paperwork" },
  { value: 7, text: "Other" },
];

const ActivitiesForm = (props) => {
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityType, setActivityType] = useState(Number);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setID] = useState(Number);

  useEffect(() => {
    const { data } = props;

    if (data) {
      let {
        Activity,
        Date: activityDate,
        StartTime,
        EndTime,
        ActivityTypeID,
        Week,
        TimeInput,
        id,
        WeekStartDate,
        WeekEndDate,
      } = data;

      let date = convertDate(activityDate);

      StartTime = getTimeString(StartTime);
      EndTime = getTimeString(EndTime);

      setActivity(Activity);
      setDate(date);
      setStartTime(StartTime);
      setEndTime(EndTime);
      setActivityType(ActivityTypeID);
      setWeek(Week);
      setTimeSpent(TimeInput);
      setID(id);
      setStartDate(WeekStartDate);
      setEndDate(WeekEndDate);
    }

    if (props.week) {
      setWeek(props.week);
    }
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        week !== "" &&
          date !== "" &&
          activity !== "" &&
          activityType !== "" &&
          startTime !== "" &&
          endTime !== ""
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [week, date, activity, activityType, startTime, endTime]);

  const { error, sendRequest } = useFetch();

  function getTimeString(time) {
    // converts time to conform to format of time input field
    let date = new Date(`January 1, 1980 ${time}`);
    let hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    let minutes =
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${hour}:${minutes}`;
  }

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

  const activityChangeHandler = (event) => {
    setActivity(event.target.value);
  };
  const activityBlurHandler = (event) => {
    setActivity(event.target.value);
  };

  const activityTypeChangeHandler = (event) => {
    setActivityType(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let userData = {
      Week: week,
      Date: date,
      Activity: activity,
      ActivityType: +activityType,
      StartTime: startTime,
      EndTime: endTime,
    };
    if (id > 0) {
      sendRequest(
        { url: `activities/${id}`, method: "PATCH", body: userData },
        useData
      );
    } else {
      sendRequest(
        { url: `activities`, method: "POST", body: userData },
        useData
      );
    }

    function useData(data) {
      if (data.id > 0) {
        userData = {
          ...userData,
          ActivityType: activityTypes[userData.ActivityType - 1].text,
          StartTime: convertTime(startTime),
          EndTime: convertTime(endTime),
          TimeInput: getTimeSpent(startTime, endTime),
          Date: new Date(date).toLocaleDateString("en-Monrovia", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          id: data.id,
        };
        props.onSave(userData, data.id);
      }

      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const onCancelHandler = () => {
    setTimeSpent("");
    setFormIsValid(false);
    setActivity("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setActivityType("");
    setID("");
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="week"
          label="Week"
          type="number"
          placeholder="Week"
          defaultValue={week}
          readOnly={true}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="date"
          label="Date"
          type="date"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
          defaultValue={date}
          min={startDate}
          max={endDate}
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
          defaultValue={activity}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <SelectInput
          inputtype="select"
          selectedIndex={activityType}
          options={activityTypes}
          onChange={activityTypeChangeHandler}
          label="Activity Type"
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="startTime"
          label="Start Time"
          type="time"
          onBlur={startTimeBlurHandler}
          defaultValue={startTime}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="endTime"
          label="End Time"
          type="time"
          readOnly={startTime !== "" ? false : true}
          onBlur={endTimeBlurHandler}
          defaultValue={endTime}
        />
      </div>

      <div className={formStyles["form__group-inline"]}>
        <Input
          id="timeSpent"
          label="Time Spent"
          type="text"
          readOnly={true}
          defaultValue={timeSpent}
        />
      </div>
      {message.length > 0 && !error && (
        <Alert className="alert__success">{message}</Alert>
      )}
      {message.length > 0 && error && (
        <Alert className="alert__error">{message}</Alert>
      )}

      <div className={formStyles["form__message"]}>
        <Button
          type="submit"
          className="btn__primary"
          onClick={onSubmitHandler}
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

export default React.memo(ActivitiesForm);
