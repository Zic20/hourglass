import React from "react";
import BasicCard from "../ImportedComponents/BasicCard";
import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faHourglass, faStar, faStarHalf, faTasks } from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
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
          <p className={styles.text}>12</p>
        </div>
      </div>

      <div
        className={styles.basicCard}
        style={{
          backgroundImage:"radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% )",
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
          <p className={styles.text}>2</p>
        </div>
      </div>
      <div
        className={styles.basicCard}
        style={{
          backgroundImage:"linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
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
          <p className={styles.text}>79</p>
        </div>
      </div>
      <div
        className={styles.basicCard}
        style={{
          backgroundImage:"linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        }}
      >
        <h5 className={styles.header}>Ongoing Tasks</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faTasks}
          />
          <p className={styles.text}>3</p>
        </div>
      </div>
      <div
        className={styles.basicCard}
        style={{
            backgroundColor: "#0093E9",
            backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        }}
      >
        <h5 className={styles.header}>Rating</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faStarHalf}
          />
          <p className={styles.text}>3</p>
        </div>
      </div>

      {/* <div
        className={styles.basicCard}
        style={{
            backgroundColor: "#0093E9",
            backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        }}
      >
        <h5 className={styles.header}>Rating</h5>
        <div className={styles.content}>
          <FontAwesomeIcon
            className={styles.icon}
            style={{
              fontWeight: 400,
            }}
            icon={faStar}
          />
          <p className={styles.text}>3</p>
        </div>
      </div> */}
    </div>
  );
};
export default Dashboard;
