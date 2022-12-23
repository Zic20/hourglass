import React from "react";
import styles from "./Input.module.css";

const SelectInput = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        value={props.selectedIndex}
        className={`${styles.select} ${styles[props.className]}`}
        ref={ref}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option value="">--Select Option--</option>

        {props.options &&
          props.options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.text}
              </option>
            );
          })}
      </select>
    </React.Fragment>
  );
});

export default SelectInput;
