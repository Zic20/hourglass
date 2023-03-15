import React, {Fragment} from "react";
  import { useNavigate } from "react-router-dom";
  import Button from "../Utilities/Button";
  import styles from "./Form.module.css";
  import formStyle from "./ChangePassword.module.css";

const ChangePassword = () => {

  const navigate = useNavigate();

  const resetHandler = ()=> {
     navigate("/login");
  }


  return (
    <form action="#" className={`${styles["form"]} ${formStyle.form}`}>
      <div>
        <h2>Reset Password</h2>
        <div className={styles["form__group"]}>
          <input
            type="email"
            name="email"
            id="email"
            className={styles["form__input"]}
            placeholder="Enter email"
            required
          />
          <label htmlFor="email" className={styles["form__label"]}>
            Student ID or email <span>*</span>
          </label>
        </div>
        <div className={styles["form__group"]}>
          <input
            type="text"
            name="code"
            id="code"
            className={styles["form__input"]}
            placeholder="Enter reset code"
            required
          />
          <label htmlFor="email" className={styles["form__label"]}>
            Enter reset code <span>*</span>
          </label>
        </div>
        <div className={styles["form__group"]}>
          <input
            type="password"
            name="password"
            className={styles["form__input"]}
            placeholder="Password"
            required
          />
          <label htmlFor="password" className={styles["form__label"]}>
            Password <span>*</span>
          </label>
        </div>
        <div className={styles["form__group"]}>
          <input
            type="password"
            name="confirmpassword"
            className={styles["form__input"]}
            placeholder="Confirm Password"
            required
          />
          <label
            htmlFor="confirmpassword"
            className={styles["form__label"]}
          >
            Confirm Password <span>*</span>
          </label>
        </div>
        <div className={styles["form__group"]}>
          <Button
            type="button"
            className="btn__primary-rounded"
            onClick={resetHandler}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChangePassword