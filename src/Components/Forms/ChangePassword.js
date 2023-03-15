import React, {
  useState,
  useReducer,
  useEffect,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Utilities/Button";
import styles from "./Form.module.css";
import formStyle from "./ChangePassword.module.css";
import useFetch from "../../hooks/useFetch";

function StepOne(props) {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const { sendRequest } = useFetch();

  const onEmailChangeHandler = (event) => {
    setEmailIsValid(event.target.value.trim().length > 0);
    setEmail(event.target.value);
  };

  const submitHandler = () => {
    sendRequest({ url: `/reset.php?email=${email}` }, (data) => {
      if (!data || !data.status) {
        alert("Please use a valid email");
        return;
      }
      props.onSubmit(email);
    });
  };
  return (
    <div className={styles["form__group"]} style={{ marginTop: "5rem" }}>
      <input
        type="email"
        name="email"
        id="email"
        className={styles["form__input"]}
        placeholder="Enter your email"
        onChange={onEmailChangeHandler}
        required
      />
      <label htmlFor="email" className={styles["form__label"]}>
        Enter email <span>*</span>
      </label>
      <div className={styles["form__group"]} style={{ marginTop: ".5rem" }}>
        <Button
          type="button"
          className="btn__primary"
          onClick={submitHandler}
          disabled={!emailIsValid}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}

function StepTwo(props) {
  const [resetCode, setResetCode] = useState("");
  const [resetIsValid, setResetIsValid] = useState(false);

  const { sendRequest } = useFetch();
  const onBackHandler = () => {
    props.onBack();
  };

  const onCodeChangeHandler = (event) => {
    setResetIsValid(event.target.value.trim().length > 6);
    setResetCode(event.target.value.trim());
  };

  const onSubmitHandler = () => {
    sendRequest(
      {
        url: `/reset.php`,
        method: "POST",
        body: { code: resetCode, username: props.email },
      },
      (data) => {
        if (!data || !data.status) {
          return;
        }

        props.onSubmit();
      }
    );
  };

  return (
    <div className={styles["form__group"]} style={{ marginTop: "5rem" }}>
      <input
        type="text"
        name="code"
        id="code"
        className={styles["form__input"]}
        placeholder="Enter reset code"
        onChange={onCodeChangeHandler}
        required
      />
      <label htmlFor="email" className={styles["form__label"]}>
        Enter reset code <span>*</span>
      </label>
      <div className={styles["form__group"]} style={{ marginTop: ".5rem" }}>
        <Button
          type="button"
          className="btn__secondary"
          onClick={onBackHandler}
        >
          Back
        </Button>
        <Button
          type="button"
          className="btn__primary"
          onClick={onSubmitHandler}
          disabled={resetIsValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// this reducer is used to validate user password input and manage the password state
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 7 };
  }
  return { value: "", isValid: false };
};

const confirmPasswordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 7 };
  }
  return { value: "", isValid: false };
};

function StepThree(props) {
  const [passwordValid, setPasswordValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [confirmPasswordState, dispatchConfirmPassword] = useReducer(
    confirmPasswordReducer,
    { value: "", isValid: null }
  );

  const { sendRequest } = useFetch();

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (
        passwordState.value.trim().length > 7 &&
        confirmPasswordState.value.trim().length > 7
      ) {
        setPasswordValid(
          passwordState.value.trim() === confirmPasswordState.value.trim()
        );
      }
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [passwordState.value, confirmPasswordState.value]);

  const onConfirmPasswordChangeHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      return;
    }
    let value = event.target.value.trim();
    dispatchConfirmPassword({ type: "USER_INPUT", val: value });
  };
  const onConfirmPasswordBlurHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      return;
    }
    let value = event.target.value.trim();
    dispatchConfirmPassword({ type: "BLUR", val: value });
  };

  const onPasswordChangeHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      return;
    }

    let value = event.target.value.trim();
    dispatchPassword({ type: "USER_INPUT", val: value });
  };
  const onPasswordBlurHandler = (event) => {
    if (event.target.value.trim().length === 0) {
      return;
    }

    let value = event.target.value.trim();
    dispatchPassword({ type: "BLUR", val: value });
  };

  const onSubmitHandler = () => {
    sendRequest(
      {
        url: `/reset.php`,
        method: "POST",
        body: {
          username: props.email,
          password: passwordState.value,
          confirmpassword: confirmPasswordState.value,
        },
      },
      (data) => {
        if (!data || !data.status) {
          return;
        }

        props.onSubmit();
      }
    );
  };
  return (
    <Fragment>
      <div className={styles["form__group"]}>
        <input
          type="password"
          name="password"
          className={styles["form__input"]}
          placeholder="Password"
          required
          onChange={onPasswordChangeHandler}
          onBlur={onPasswordBlurHandler}
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
          onChange={onConfirmPasswordChangeHandler}
          onBlur={onConfirmPasswordBlurHandler}
        />
        <label htmlFor="confirmpassword" className={styles["form__label"]}>
          Confirm Password <span>*</span>
        </label>

        <div className={styles["form__group"]} style={{ marginTop: ".5rem" }}>
          <Button type="button" className="btn__secondary">
            Back
          </Button>
          <Button
            type="button"
            className="btn__primary"
            disabled={!passwordValid}
            onClick={onSubmitHandler}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const onCancelHandler = () => {
    navigate("/login");
  };

  const onNextHandler = () => {
    setStep(step + 1);
  };

  const getEmail = (email) => {
    setEmail(email);
    setStep(step + 1);
  };

  const onBackHandler = () => {
    setStep(step - 1);
  };

  return (
    <form action="#" className={`${styles["form"]} ${formStyle.form}`}>
      <h2>Password Reset</h2>
      {step === 1 && <StepOne onSubmit={getEmail} />}
      {step === 2 && (
        <StepTwo
          onSubmit={onNextHandler}
          onBack={onBackHandler}
          email={email}
        />
      )}
      {step === 3 && <StepThree onBack={onBackHandler}  email={email} onSubmit={onCancelHandler}/>}

      <Button type="button" className="btn__cancel" onClick={onCancelHandler} >
        Cancel
      </Button>
    </form>
  );
};

export default ChangePassword;
