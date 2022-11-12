import React from "react";
import styles from "./Input.module.css";
const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={styles.input}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        required={props.isRequired}
      />
    </div>
  );
};

export default Input;
