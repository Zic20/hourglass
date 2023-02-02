import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import authContext from "../../store/auth-context";
import Button from "../Utilities/Button";
import styles from "./Login.module.css";
import formStyles from "./Form.module.css";
import ErrorModal from "../ImportedComponents/ErrorModal";

// this reducer is used to validate user email input and manage the email state
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }

  return { value: "", isValid: false };
};

// this reducer is used to validate user password input and manage the password state
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  // the reducer below manages email state
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  // the reducer below manages password state
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(authContext);
  const navigate = useNavigate();
  const { sendRequest } = useFetch();

  // This effect hook is used to change the formIsValid state whenever emailState.isValid or passwordState.isValid changes
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailOnChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };
  const emailOnBlurHandler = () => {
    dispatchEmail({ type: "BLUR" });
  };

  const passwordOnChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };
  const passwordOnBlurHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const onSignupClickHandler = () => {
    navigate("/signup");
  };

  const onForgotPasswordHandler = () => {
    navigate("/changepassword");
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let userData = {
      username: emailState.value,
      password: passwordState.value,
    };
    sendRequest(
      { url: "login.php", method: "POST", body: userData },
      (data) => {
        if (data["access_token"]) {
          authCtx.login(data);
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid username or password");
          setShowErrorModal(true);
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
      <div className={styles["form__container"]}>
        <form action="#" onSubmit={onSubmitHandler} className={styles["form"]}>
          <div className={styles["form__signup"]}>
            <h1 className={styles["heading__primary"]}>Welcome!</h1>
            <p>Create your account For Free!</p>
            <Button
              type="button"
              className="btn__secondary-rounded"
              onClick={onSignupClickHandler}
            >
              Sign Up
            </Button>
          </div>
          <div className={styles["form__login"]}>
            <h2>Login</h2>
            <div className={styles["form__group"]}>
              <input
                type="text"
                name="username"
                id="username"
                onChange={emailOnChangeHandler}
                onBlur={emailOnBlurHandler}
                className={formStyles["form__input"]}
                placeholder="Enter username"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                Enter username or email <span>*</span>
              </label>
            </div>
            <div className={styles["form__group"]}>
              <input
                type="password"
                name="password"
                id="password"
                onChange={passwordOnChangeHandler}
                onBlur={passwordOnBlurHandler}
                className={formStyles["form__input"]}
                placeholder="Password"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                Password <span>*</span>
              </label>
            </div>
            <div className={styles["form__group"]}>
              <Button
                type="submit"
                className="btn__primary-rounded"
                disabled={!formIsValid ? true : false}
              >
                Sign In
              </Button>
              <Button
                type="button"
                className="btn__secondary-rounded"
                disabled={false}
                onClick={onSignupClickHandler}
              >
                Sign Up
              </Button>

              <Button
                type="button"
                className="form__link-rounded"
                onClick={onForgotPasswordHandler}
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
