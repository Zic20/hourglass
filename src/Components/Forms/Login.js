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
import studentprofileContext from "../../store/studentprofile-context";
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
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(authContext);
  const studenprofileCtx = useContext(studentprofileContext);
  const navigate = useNavigate();
  const { sendRequest } = useFetch();

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
          const { usertype, uniqueid } = data;
          if (usertype === "Student") {
            sendRequest(
              { url: `students?studentid=${uniqueid}` },
              setStudentProfile
            );
            sendRequest(
              { url: `practicuminstructors?studentid=${uniqueid}` },
              setPracticumInstructor
            );
          }
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid email or password");
          setShowErrorModal(true);
        }
      }
    );
  };

  const setStudentProfile = (data) => {
    const { FirstName, MiddleName, LastName, PhoneNo, Email } = data;
    const studentprofile = {
      Name: `${FirstName} ${MiddleName || ""} ${LastName}`,
      Phone: PhoneNo || "",
      Email: Email || "",
    };
    studenprofileCtx.addStudent(studentprofile);
    localStorage.setItem("studentProfile", JSON.stringify(studentprofile));
  };



  const setPracticumInstructor = (data) => {
    const { Name, Phone, Email, Agency } = data;

    const practicumInstructor = { Name, Phone, Email, Agency };

    studenprofileCtx.addInstructor(practicumInstructor);
    localStorage.setItem(
      "practicuminstructor",
      JSON.stringify(practicumInstructor)
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
            <h1 className={styles["heading__primary"]}>TRACKS</h1>
            <p className={styles["description"]}>Log in to your account to easily track your work hours and improve your productivity.</p>
            <p>Don't have an account?</p>
            <Button
              type="button"
              className="btn__secondary"
              onClick={onSignupClickHandler}
            >
              Sign Up
            </Button>
          </div>
          <div className={styles["form__login"]}>
            <h2>Sign In</h2>
            <div className={styles["form__group"]}>
              <input
                type="text"
                name="email"
                id="email"
                onChange={emailOnChangeHandler}
                onBlur={emailOnBlurHandler}
                className={formStyles["form__input"]}
                placeholder="Enter Email"
                required
              />
              <label htmlFor="email" className={styles["form__label"]}>
                Enter email <span>*</span>
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
                className="btn__primary"
                disabled={!formIsValid ? true : false}
                onClick={onSubmitHandler}
              >
                Sign In
              </Button>
              <Button
                type="button"
                className="btn__secondary"
                disabled={false}
                onClick={onSignupClickHandler}
              >
                Sign Up
              </Button>

              <Button
                type="button"
                className="form__link"
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
