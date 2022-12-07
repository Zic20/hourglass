import React, { useState, useEffect } from "react";
import Button from "../Utilities/Button";
import Editor from "../Utilities/Inputs/Editor";
import formStyles from "./Form.module.css";
import SelectInput from "../Utilities/Inputs/Select";
import Input from "../Utilities/Inputs/Input";
import { RequestHelper } from "../../modules/Requester";

const goals = [
  {
    value: 1,
    text: 1,
    Goal:
      "Apply critical thinking skills within the context of professional social work practice.",
  },
  {
    value: 2,
    text: 2,
    Goal:
      "Understand the value base of the profession and its ethical standards and principles, and practice accordingly.",
  },
  {
    value: 3,
    text: 3,
    Goal:
      "Practice without discrimination and with respect, knowledge and skills related to clients, age, class, color, culture, disability, ethnicity, family structure, gender, marital status, national origin,",
  },
  {
    value: 4,
    text: 4,
    Goal:
      "Understand the forms and mechanisms of oppression and discrimination and apply strategies of advocacy and social change that advance social and economic justice.",
  },
  {
    value: 5,
    text: 5,
    Goal:
      "Understand and interpret the history of the social work profession and its contemporary structures and issues.",
  },
  {
    value: 6,
    text: 6,
    Goal:
      "Apply the knowledge and skills of generalist social work practice with systems of all sizes.",
  },
  {
    value: 7,
    text: 7,
    Goal:
      "Use theoretical frameworks supported by empirical evidence to understand individual development and behavior across the life span and the interactions among individuals and between individuals and fam",
  },
  {
    value: 8,
    text: 8,
    Goal: "Analyze, formulate and influence social policies.",
  },
  {
    value: 9,
    text: 9,
    Goal:
      "Evaluate research studies, apply findings to practice and evaluate their own practice interventions.",
  },
  {
    value: 10,
    text: 10,
    Goal:
      "Use communication skills differentially across client populations, colleagues and communities.",
  },
  {
    value: 11,
    text: 11,
    Goal:
      "Use supervision and consultation appropriate to social work practice.",
  },
  {
    value: 12,
    text: 12,
    Goal:
      "Function within the structure of organizations and service delivery systems and seek necessary organizational change.",
  },
  {
    value: 13,
    text: 13,
    Goal:
      "Integrate a Catholic perspective with the knowledge, skills, and values of the social work profession.",
  },
  {
    value: 14,
    text: 14,
    Goal:
      "Understand and apply the principles of a strengths perspective to generalist practice with client systems of all sizes.",
  },
];

const LearningContractForm = () => {
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
  const [formIsValid, setFormIsValid] = useState(false);

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
        Goal: goal,
        Objectives: objective,
        Activities: activities,
        ExpectedOutcomes: expectedOutcome,
        IndicatorsOfPerformance: indicators,
        MeansOfVerification: meansOfVerification,
      };

      const postData = async (userData) => {
        const { data, error } = await RequestHelper.post(
          `learningcontracts`,
          userData
        );
        if (!error) {
          console.log(data);
        }
      };

      postData(userData);
    }
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
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input
          id="startDate"
          label="Start Date"
          type="date"
          onChange={onStartDateChangeHandler}
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
        />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <SelectInput
          inputtype="select"
          label="Goal"
          onChange={onGoalChangeHandler}
          options={goals}
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
        <Editor onChange={onObjectiveChangeHandler} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Activities</p>
        <Editor onChange={onActivitiesChangeHandler} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Expected Outcome</p>
        <Editor onChange={onOutcomeChangeHandler} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Indicators of Performance</p>
        <Editor onChange={onIndicatorsChangeHandler} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Means of Verification</p>
        <Editor onChange={onMeansChangeHandler} />
      </div>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button disabled={!formIsValid} type="submit" className="btn__primary">
          Save
        </Button>
        <Button className="btn__cancel">Cancel</Button>
      </div>
    </form>
  );
};

export default LearningContractForm;
