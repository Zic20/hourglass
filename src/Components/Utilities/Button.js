import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${styles.btn} ${styles[props.className]}`}
      value={props.value}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
