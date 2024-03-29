import React from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import styles from "./Modal.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={`${styles.modal}`}>
          <div
            onClick={props.onClose}
            className={styles["modal-backdrop"]}
          ></div>
          <div
            className={`${styles["modal-dialog"]} ${styles[props.className]} `}
          >
            <div className={styles["modal-header"]}>
              <h3>{props.headerText}</h3>
              <Button className={styles.btnClose} onClick={props.onClose}>
                <FontAwesomeIcon  icon={faClose} />
              </Button>
            </div>
            <div className={styles["modal-body"]}>
              <div className={styles["modal-content"]}>{props.children}</div>
              <div className={styles["modal-footer"]}>
                <Button
                  onClick={props.onClose}
                  type="button"
                  className="buttonPrimary"
                  text="Okay"
                />
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};

export default Modal;
