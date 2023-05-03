import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import Button from "../Utilities/Button";
import Editor from "../Utilities/Inputs/Editor";
import formStyles from "./Form.module.css";
import SelectInput from "../Utilities/Inputs/Select";
import Input from "../Utilities/Inputs/Input";
import useFetch from "../../hooks/useFetch";
import { convertDate } from "../../modules/timecalculation";
import goals from "../../modules/goals";

const LearningContractForm = (props) => {
  const [week, setWeek] = useState(Number);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goal, setGoal] = useState(Number);
  const [goalText, setGoalText] = useState("");
  const [objective, setObjective] = useState("");
  const [activities, setActivities] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  const [indicators, setIndicators] = useState("");
  const [meansOfVerification, setMeansOfVerification] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const { error, sendRequest } = useFetch();

  useEffect(() => {
    if (props.data) {
      const { data: learningContract } = props;
      let selectedGoal = goals.filter(
        (row) => row.Goal === learningContract.Goal
      );
      setGoal(selectedGoal[0].value);
      setWeek(learningContract.Week);
      let startDate = convertDate(learningContract.StartDate);
      setStartDate(startDate);
      let endDate = convertDate(learningContract.EndDate);
      setEndDate(endDate);
      setGoalText(learningContract.Goal);
      setObjective(
        learningContract.Objectives ? learningContract.Objectives : ""
      );
      setActivities(
        learningContract.Activities ? learningContract.Activities : ""
      );
      setIndicators(
        learningContract.IndicatorsOfPerformance
          ? learningContract.IndicatorsOfPerformance
          : ""
      );
      setExpectedOutcome(
        learningContract.ExpectedOutcome ? learningContract.ExpectedOutcome : ""
      );
      setMeansOfVerification(
        learningContract.MeansOfVerification
          ? learningContract.MeansOfVerification
          : ""
      );
      setFormIsValid(false);
    }
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        week > 0 &&
          startDate.length > 0 &&
          endDate.length > 0 &&
          goal > 0 &&
          objective.length > 0 &&
          activities.length > 0 &&
          expectedOutcome.length > 0 &&
          indicators.length > 0 &&
          meansOfVerification.length > 0
      );
    }, 50);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    week,
    startDate,
    endDate,
    goal,
    objective,
    activities,
    expectedOutcome,
    indicators,
    meansOfVerification,
  ]);

  const onObjectiveChangeHandler = (value) => {
    setObjective(value);
  };
  const onActivitiesChangeHandler = (value) => {
    setActivities(value);
  };
  const onOutcomeChangeHandler = (value) => {
    setExpectedOutcome(value);
  };
  const onIndicatorsChangeHandler = (value) => {
    setIndicators(value);
  };

  const onMeansChangeHandler = (value) => {
    setMeansOfVerification(value);
  };

  const onGoalChangeHandler = (event) => {
    let value = parseInt(event.target.value);
    if (value > 0) {
      setGoal(value);
      setGoalText(goals[+value - 1].Goal);
    } else {
      setGoal("");
      setGoalText("");
    }
  };

  const onWeekChangeHandler = (event) => {
    setWeek(+event.target.value);
  };

  const onStartDateChangeHandler = (event) => {
    setStartDate(event.target.value);
  };

  const onEndDateChangeHandler = (event) => {
    setEndDate(event.target.value);
  };

  const onSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const userData = {
        Week: week,
        StartDate: startDate,
        EndDate: endDate,
        Goals: goal,
        Objectives: objective,
        Activities: activities,
        ExpectedOutcome: expectedOutcome,
        IndicatorsOfPerformance: indicators,
        MeansOfVerification: meansOfVerification,
        GoalText: goalText,
      };

      if (props.data) {
        sendRequest(
          {
            url: `learningcontracts/${+props.data.id}`,
            method: "PATCH",
            body: userData,
          },
          () => {
            if (!error) {
              setSaveMessage("Goal updated");
              setTimeout(() => {
                setSaveMessage("");
              }, 3000);
            }
          }
        );

        props.onSave(userData, props.data.id);
      } else {
        sendRequest(
          { url: "learningcontracts", method: "POST", body: userData },
          (data) => {
            if (!error) {
              userData.id = data.id;
              setSaveMessage("Goal created");
              setTimeout(() => {
                setSaveMessage("");
              }, 3000);
            }
          }
        );
        props.onSave(userData);
      }
    }
  };

  const clearState = () => {
    setWeek("");
    setStartDate("");
    setEndDate("");
    setGoal("");
    setObjective("");
    setActivities("");
    setIndicators("");
    setExpectedOutcome("");
    setMeansOfVerification("");
    setGoalText("");
    setFormIsValid(false);
  };

  return (
    <form onSubmit={onSubmissionHandler}>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="week"
          label="Week"
          type="number"
          placeholder="Week"
          onChange={onWeekChangeHandler}
          value={week ? week : ""}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="startDate"
          label="Start Date"
          type="date"
          onChange={onStartDateChangeHandler}
          value={startDate}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="endDate"
          label="End Date"
          type="date"
          readOnly={!startDate.length > 0}
          min={startDate}
          onChange={onEndDateChangeHandler}
          value={endDate}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <SelectInput
          inputtype="select"
          label="Goal"
          onChange={onGoalChangeHandler}
          options={goals}
          selectedIndex={goal}
          defaultvalue={goal}
        />
      </div>
      <div className={formStyles["form__group"]}>
        <Input
          inputtype="textarea"
          className={formStyles["form__textarea"]}
          readOnly={true}
          disabled={true}
          value={goalText}
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Objective</p>
        <Editor onChange={onObjectiveChangeHandler} value={objective} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Activities</p>
        <Editor onChange={onActivitiesChangeHandler} value={activities} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Expected Outcome</p>
        <Editor onChange={onOutcomeChangeHandler} value={expectedOutcome} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Indicators of Performance</p>
        <Editor onChange={onIndicatorsChangeHandler} value={indicators} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Means of Verification</p>
        <Editor onChange={onMeansChangeHandler} value={meansOfVerification} />
      </div>
      {saveMessage.length > 0 && (
        <Alert
          severity="success"
          sx={{ mx: "auto", mt: 1, mb: 1, width: "80%" }}
        >
          {saveMessage}
        </Alert>
      )}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button disabled={!formIsValid} type="submit" className="btn__primary">
          Save
        </Button>
        <Button onClick={clearState} className="btn__cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LearningContractForm;
