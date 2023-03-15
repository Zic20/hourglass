import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faHourglass,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { convertTimeToString } from "../../modules/timecalculation";

const Dashboard = (props) => {
  const [hoursLeft, setHoursLeft] = useState("");
  const [totalWorkHours, setTotalWorkHours] = useState("");
  const [goalsCompleted, setGoalsCompleted] = useState([]);
  const [goalsUnattempted, setGoalsUnattempted] = useState([]);
  const { sendRequest } = useFetch();

  useEffect(() => {
    sendRequest({ url: `summary` }, (data) => {
      if (!data) {
        return;
      }
      const {
        Goals: goals,
        "Remaining Hours": RemainingHours,
        "Total Hours": TotalHours,
      } = data;

      const completedGoals = goals.filter(
        (goal) => goal.Status === "Completed"
      );
      const unattemptedGoals = goals.filter(
        (goal) => goal.Status !== "Completed"
      );

      setTotalWorkHours(convertTimeToString(TotalHours));
      setHoursLeft(convertTimeToString(RemainingHours));
      setGoalsCompleted(completedGoals);
      setGoalsUnattempted(unattemptedGoals);
    });
  }, []);

  let className = "";
  if (props.fullWidth) {
    className = "dashboard-large";
  } else {
    className = "dashboard";
  }
  return (
    <div className={styles[`${className}`]}>
      <div
        className={styles.basicCard}
        style={{
          backgroundColor: "#0093E9",
          backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        }}
      >
        <h5 className={styles.header}>Completed Goals</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faBullseye}
          />
          <p className={styles.text}>{goalsCompleted.length}</p>
        </div>
      </div>

      <div
        className={styles.basicCard}
        style={{
          backgroundImage:
            "radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% )",
        }}
      >
        <h5 className={styles.header}>Unattempted Goals</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faBullseye}
          />
          <p className={styles.text}>{goalsUnattempted.length}</p>
        </div>
      </div>
      <div
        className={styles.basicCard}
        style={{
          backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        }}
      >
        <h5 className={styles.header}>Total Work Hours</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faHourglass}
          />
          <p className={styles.text}>{totalWorkHours}</p>
        </div>
      </div>
      <div
        className={styles.basicCard}
        style={{
          backgroundColor: "#0093E9",
          backgroundImage:
            "linear-gradient(160deg, #83c9f1da 0%, #80d0c7f0 100%)",
        }}
      >
        <h5 className={styles.header}>Remaining Hours</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faHourglassStart}
          />
          <p className={styles.text}>{hoursLeft}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
