import React from "react";
import styles from "./Input.module.css";

const SelectInput = React.forwardRef((props, ref) => {
  return (
    <div>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <select className={styles.select} ref={ref} onChange={props.onChange}>
        <option value="">-- Select Option --</option>
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default SelectInput;
