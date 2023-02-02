import * as React from "react";
import styles from "./BasicCard.module.css";

export default function BasicCard(props) {
  return (
    <div className={styles.basicCard}>
      <h5 className={styles.header}>{props.header}</h5>
      {props.children}
    </div>
  );
}
