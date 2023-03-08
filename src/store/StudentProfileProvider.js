import React, { useReducer } from "react";
import studentprofileContext from "./studentprofile-context";

const defaultState = {
  Student: {
    Name: "",
    Phone: "",
    Email: "",
},

PracticumInstructor: {
    Name: "",
    Phone: "",
    Email: "",
    Agency: "",
  },
};

const studentProfileReducer = (state, action) => {
  if (action.type === "ADD_STUDENT") {
    const updatedState = {
      ...state,
      Student: { ...action.Student },
    };
    return updatedState;
  }

  if (action.type === "ADD_INSTRUCTORINFO") {
    const updatedState = {
      ...state,
      PracticumInstructor: {
        ...action.PracticumInstructor,
      },
    };

    return updatedState;
  }

  return defaultState;
};

const StudentProfileProvider = (props) => {
  const [studentProfileState, dispatchProfile] = useReducer(
    studentProfileReducer,
    defaultState
  );

  const addStudent = (profile) => {
    dispatchProfile({ type: "ADD_STUDENT", Student: profile });
  };

  const addInstructor = (profile) => {
    dispatchProfile({
      type: "ADD_INSTRUCTORINFO",
      PracticumInstructor: profile,
    });
  };

  const studentProfile = {
    Student: studentProfileState.Student,
    PracticumInstructor: studentProfileState.PracticumInstructor,
    addStudent,
    addInstructor,
  };

  return (
    <studentprofileContext.Provider value={studentProfile}>
      {props.children}
    </studentprofileContext.Provider>
  );
};

export default StudentProfileProvider;
