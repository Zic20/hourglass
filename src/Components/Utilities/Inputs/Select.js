import React from "react";
import styles from "./Input.module.css";

const SelectInput = React.forwardRef((props, ref) => {
  
  return (
    <div>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <select
        value={props.selectedIndex}
        className={styles.select}
        ref={ref}
        onChange={props.onChange}
      >
        <option value="">--Select Option--</option>

        {props.options && props.options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default SelectInput;
