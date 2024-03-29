import React, { Fragment } from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>

      <input
        ref={ref}
        className={styles.input}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required={props.isrequired === "true" ? true : false}
        {...props}
        readOnly={props.readOnly}
      />

      {props.isrequired === true && (
        <p className={styles.isInvalid}>* {`${props.label} is required`}</p>
      )}
    </Fragment>
  );
});

export default React.memo(Input);
