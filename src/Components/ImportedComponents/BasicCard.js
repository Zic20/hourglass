import * as React from "react";
import styles from "./BasicCard.module.css";

export default function BasicCard(props) {
  return (
    <div className={styles.basicCard}>
      
      {props.children}
    </div>
  );
}
