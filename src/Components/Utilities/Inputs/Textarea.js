import React, { Fragment } from "react";
import styles from "./Input.module.css";

const Textarea = React.forwardRef((props, ref) => {
  return (
    <Fragment>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <textarea
        className={styles.textarea}
        {...props}
        ref={ref}
        style={{
          resize: "none",
          padding: ".5rem",
          lineHeight: "1.5",
          fontFamily: "Roboto Slab",
        }}
      ></textarea>

      {props.isrequired === true && (
        <p className={styles.isInvalid}>* {`${props.label} is required`}</p>
      )}
    </Fragment>
  );
});

export default React.memo(Textarea);
