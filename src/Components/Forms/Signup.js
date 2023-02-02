import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../Utilities/Button";
import ErrorModal from "../ImportedComponents/ErrorModal";
import styles from "./Form.module.css";
import formStyle from "./Signup.module.css";

// this reducer is used to validate user email input and manage the email state
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().includes("@") };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().includes("@") };
  }

  return { value: "", isValid: false };
};

const studentIDReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 4 };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 4 };
  }

  return { value: "", isValid: false };
};

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

const Signup = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const passwordRef = useRef();
  // the reducer below manages email state
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [studentIDState, dispatchStudentID] = useReducer(studentIDReducer, {
    value: "",
    isValid: null,
  });

  // the reducer below manages password state
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [
    confirmPasswordState,
    dispatchConfirmPassword,
  ] = useReducer(confirmPasswordReducer, { value: "", isValid: null });

  const navigate = useNavigate();
  const { sendRequest } = useFetch();

  useEffect(() => {
    if (!passwordValid) {
      passwordRef.current.innerText = "Passwords must match";
    } else {
      passwordRef.current.innerText = "Passwords matched";
    }
  });
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

  // This effect hook is used to change the formIsValid state whenever emailState.isValid or passwordValid changes
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && studentIDState.isValid && passwordValid
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, studentIDState.isValid, passwordValid]);

  const emailOnChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const emailOnBlurHandler = () => {
    dispatchEmail({ type: "BLUR" });
  };

  const studentIdOnChangeHandler = (event) => {
    dispatchStudentID({ type: "USER_INPUT", val: event.target.value });
  };

  const studentIdOnBlurHandler = () => {
    dispatchStudentID({ type: "BLUR" });
  };

  const passwordOnChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordOnBlurHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const confirmPasswordOnChangeHandler = (event) => {
    dispatchConfirmPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const confirmPasswordOnBlurHandler = () => {
    dispatchConfirmPassword({ type: "BLUR" });
  };

  const onSignInClickHandler = () => {
    navigate("/login");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let userData = {
      username: emailState.value,
      password: passwordState.value,
      confirm_password: confirmPasswordState.value,
      uniqueID: studentIDState.value,
      usertype: "Student",
    };

    sendRequest(
      { url: "register.php", method: "POST", body: userData },
      (data) => {
        if (data && data.id > 0) {
          window.alert("User created");
          navigate("/login");
        } else {
          if (data.message) {
            setShowErrorModal(true);
            setErrorMessage(data.message);
          }
        }
      }
    );
  };

  const showModal = (option) => {
    setShowErrorModal(option);
  };

  return (
    <Fragment>
      <ErrorModal
        message={errorMessage}
        open={showErrorModal}
        onClose={showModal}
      />
      <div className={formStyle["form__container"]}>
        <form onSubmit={onSubmitHandler} className={styles["form"]}>
          <div>
            <h2 className={formStyle["heading__primary"]}>Sign Up</h2>
            <div className={styles["form__group"]}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={emailOnChangeHandler}
                onBlur={emailOnBlurHandler}
                className={styles["form__input"]}
                placeholder="Enter username or email"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                Enter username or email <span>*</span>
              </label>
            </div>
            <div className={styles["form__group"]}>
              <input
                type="text"
                name="studentID"
                id="studentID"
                onChange={studentIdOnChangeHandler}
                onBlur={studentIdOnBlurHandler}
                className={styles["form__input"]}
                placeholder="Enter Student ID"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                Enter Student ID <span>*</span>
              </label>
            </div>
            <div className={styles["form__group"]}>
              <input
                type="password"
                name="password"
                onChange={passwordOnChangeHandler}
                onBlur={passwordOnBlurHandler}
                className={styles["form__input"]}
                placeholder="Password"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                {passwordState.value.length > 7 && "Password"}
                {passwordState.value.length < 8 && (
                  <>
                    Password must be at least 8 characters long <span>*</span>
                  </>
                )}
              </label>
            </div>
            <div className={styles["form__group"]}>
              <input
                type="password"
                name="password"
                onChange={confirmPasswordOnChangeHandler}
                onBlur={confirmPasswordOnBlurHandler}
                className={styles["form__input"]}
                placeholder="Confirm Password"
                required
              />
              <label
                ref={passwordRef}
                htmlFor="email"
                className={styles["form__label"]}
              >
                Confirm Password <span>*</span>
              </label>
            </div>
            <div className={styles["form__group"]}>
              <Button
                type="submit"
                className="btn__primary-rounded"
                disabled={!formIsValid ? true : false}
              >
                Sign Up
              </Button>
              <Button
                type="button"
                className="btn__secondary-rounded"
                onClick={onSignInClickHandler}
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Signup;
