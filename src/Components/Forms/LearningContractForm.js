import React from "react";
import Button from "../Utilities/Button";
import Editor from "../Utilities/Inputs/Editor";
import formStyles from "./Form.module.css";
import Input from "../Utilities/Inputs/Input";

const LearningContractForm = () => {
  const showValue = (event) => {
    console.log(event.target);
  };
  return (
    <form>
      <div className={formStyles["form__group-inline"]}>
        <Input id="week" label="Week" type="number" placeholder="Week" />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input id="startDate" label="Start Date" type="date" />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <Input id="endDate" label="End Date" type="date" />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <label>Goal</label>
        <select>
          <option>-- Select Goal --</option>
          <option>Client Contact</option>
        </select>
      </div>
      <div className={formStyles["form__group"]}>
        <textarea
          className={formStyles["form__textarea"]}
          readOnly={true}
          disabled={true}
        ></textarea>
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Objective</p>
        <Editor onKeyUp={showValue} />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Activities</p>
        <Editor />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Expected Outcome</p>
        <Editor />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Indicators of Performance</p>
        <Editor />
      </div>
      <div className={formStyles["form__group-inline"]}>
        <p>Means of Verification</p>
        <Editor />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          type="submit"
          className="btn__primary"
          style={{ marginTop: "5px" }}
        >
          Save
        </Button>
        <Button className="btn__cancel" style={{ marginTop: "5px" }}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LearningContractForm;
