import React from "react";
import styles from "./Alert.module.css";

const Alert = (props) => {
  return (
    <p className={`${styles.alert} ${styles[props.className]}`}>
      {props.children}
    </p>
  );
};

export default Alert;
