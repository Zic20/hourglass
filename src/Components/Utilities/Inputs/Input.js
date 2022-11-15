import React, { useRef, useImperativeHandle } from "react";
import styles from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const clearValue = () => {
    inputRef.current.value = "";
  };

  useImperativeHandle(ref, () => {
    return { clear: clearValue };
  });
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        className={styles.input}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        required={props.isRequired}
        readOnly={props.readOnly}
        value={props.value}
      />
    </div>
  );
});

export default Input;
