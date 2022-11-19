import React from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        className={styles.input}
        onChange={props.onChange}
        onBlur={props.onBlur}
        {...props}
        required={props.isRequired}
        readOnly={props.readOnly}
      />
    </div>
  );
});

export default Input;
