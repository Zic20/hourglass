import React, { Fragment, useState } from "react";
import styles from "./Sidebar.module.css";
import Button from "../Button";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const onCloseHandler = (event) => {
    if (event.target.checked) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
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
              checked={true}
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
        <div className={styles.logo}>
          <h1>Tracks</h1>
        </div>

        <ul className={styles["nav-list"]}>
          <li>Dashboard</li>
          <li>Learning Contracts</li>
          <li>Activities</li>
          <li>Summary Timesheet</li>
          <li>Profile</li>
        </ul>
        <input
          type="checkbox"
          className={styles["nav-check"]}
          id="nav-check"
          onChange={onCloseHandler}
        ></input>
        {!isClosed && (
          <label htmlFor="nav-check" className={styles["nav-check-icon"]}>
            &lt;
          </label>
        )}

        {isClosed && (
          <label htmlFor="nav-check" className={styles["nav-check-icon"]}>
            &gt;
          </label>
        )}

        <Button className="btn__dark">Exit</Button>
      </div>
    </Fragment>
  );
};

export default Sidebar;
