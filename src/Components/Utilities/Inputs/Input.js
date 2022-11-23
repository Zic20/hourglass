import React from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {props.inputtype === "select" && (
        <select className={styles.select} ref={ref}>
          <option value="">--Select Option--</option>
          {props.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })}
        </select>
      )}
      {props.inputtype === "textarea" && (
        <textarea className={styles.textarea} {...props}>{props.children}</textarea>
      )}

      {props.inputtype !== "textarea" && props.inputtype !== "select" && (
        <input
          ref={ref}
          className={styles.input}
          onChange={props.onChange}
          onBlur={props.onBlur}
          {...props}
          required={props.isRequired}
          readOnly={props.readOnly}
        />
      )}

      {props.isRequired && (
        <p className={styles.isInvalid}>{`${props.label} is required`}</p>
      )}
    </div>
  );
});

export default Input;
