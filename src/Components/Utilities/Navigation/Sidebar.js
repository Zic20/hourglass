import React, { Fragment, useContext, useState } from "react";
import styles from "./Sidebar.module.css";
import Button from "../Button";
import authContext from "../../../store/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBookOpen,
  faListCheck,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faHandPointLeft, faUser } from "@fortawesome/free-regular-svg-icons";

const Sidebar = (props) => {
  const [isClosed, setIsClosed] = useState(false);
  const authCtx = useContext(authContext);

  const onCloseHandler = (event) => {
    if (event.target.checked) {
      setIsClosed(true);
      props.onClose(true);
    } else {
      setIsClosed(false);
      props.onClose(false);
    }
  };

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <div className={styles["top-nav"]}>
        <div className={styles["logo-box"]}>
          <div className={styles["sidebar-check-mobile"]}>
            <input
              type="checkbox"
              className={styles["nav-check-mobile"]}
              id="nav-check-mobile"
              onChange={onCloseHandler}
            ></input>
            <label
              className={styles["nav-check-mobile-icon"]}
              htmlFor="nav-check-mobile"
            >
              &nbsp;
            </label>
          </div>
          <div className={styles.logo}>
            <h1>Tracks</h1>
          </div>
        </div>
        <div>Isaac Zally Jr.</div>
      </div>
      <div className={`${styles.sidebar} ${isClosed && styles.closed}`}>
        <div className={styles["logo-box"]}>
          <div className={styles["sidebar-check-mobile"]}>
            <label
              className={styles["nav-check-mobile-icon"]}
              htmlFor="nav-check-mobile"
            >
              &nbsp;
            </label>
          </div>
          <div className={styles.logo}>
            <h1>Tracks</h1>
          </div>
        </div>

        <ul className={styles["nav-list"]}>
          <li>
            <FontAwesomeIcon icon={faChartLine} /> &nbsp; Dashboard
          </li>
          <li>
            <FontAwesomeIcon icon={faBookOpen} /> &nbsp;Learning Contracts
          </li>
          <li>
            <FontAwesomeIcon icon={faListCheck} /> &nbsp;Activities
          </li>
          <li>
            <FontAwesomeIcon icon={faSquarePollVertical} /> &nbsp;Summary
            Timesheet
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} /> &nbsp;Profile
          </li>
        </ul>
        <Button onClick={onLogoutHandler} className="btn__dark">
          <FontAwesomeIcon icon={faHandPointLeft} /> &nbsp;Exit
        </Button>
      </div>
    </Fragment>
  );
};

export default Sidebar;
