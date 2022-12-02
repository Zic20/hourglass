import React, { Fragment } from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      {props.inputtype === "textarea" && (
        <textarea className={styles.textarea} {...props}>
          {props.children}
        </textarea>
      )}

      {props.inputtype !== "textarea" && props.inputtype !== "select" && (
        <input
          ref={ref}
          className={styles.input}
          onChange={props.onChange}
          onBlur={props.onBlur}
          required={props.isrequired === "true"?true:false}
          {...props}
          readOnly={props.readOnly}
        />
      )}

      {props.isrequired === "true" && (
        <p className={styles.isInvalid}>* {`${props.label} is required`}</p>
      )}
    </Fragment>
  );
});

export default Input;
