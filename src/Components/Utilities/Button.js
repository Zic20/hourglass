import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${styles.btn} ${styles[props.className]}`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
