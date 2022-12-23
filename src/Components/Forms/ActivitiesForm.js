import React, { useState, useEffect } from "react";
import Button from "../Utilities/Button";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";
import {
  validateTimeInputs,
  getTimeSpent,
  convertTime,
} from "../../modules/timecalculation";
import { RequestHelper } from "../../modules/Requester";
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
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [activity, setActivity] = useState("");
  const [activityType, setActivityType] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setID] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      if (props.id) {
        const result = RequestHelper.get(`activities/${props.id}`);
        const { data, error } = await result;
        if (data && !error) {
          setActivity(data.Activity);
          setDate(data.Date);
          setStartTime(data.StartTime);
          setEndTime(data.EndTime);
          setActivityType(data.ActivityType);
          setWeek(data.Week);
          const timeInput = getTimeSpent(data.StartTime, data.EndTime);
          setTimeSpent(timeInput);
          getWeekDetail(data.Week);
        }
        setID(props.id);
      }
    };
    fetchData();
    if (props.week) {
      setWeek(props.week);
    }

    if(props.maxDate && props.minDate){
      setStartDate(props.minDate);
      setEndDate(props.maxDate);
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

  const getWeekDetail = async (week) => {
      const {data, error} =await RequestHelper.get(`learningcontracts?week=${week}`);
      if(!error){
        setStartDate(data.StartDate);
        setEndDate(data.EndDate);
      }
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let userData = {
      Week: week,
      Date: date,
      Activity: activity,
      ActivityType: activityType,
      StartTime: startTime,
      EndTime: endTime,
    };
    let result;
    if (id.length > 0) {
      result = RequestHelper.update(`activities/${id}`, userData);
    } else {
      result = RequestHelper.post(`activities`, userData);
    }

    const { data, error } = await result;

    if (!error) {
      setMessage(data.message);
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
      }
      props.onSave(userData, data.id);
    } else {
      setMessage(data.message);
    }

    onCancelHandler();
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
          onChange={weekChangeHandler}
          onBlur={weekBlurHandler}
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
      <div className={formStyles["form__message"]}>{message}</div>

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
