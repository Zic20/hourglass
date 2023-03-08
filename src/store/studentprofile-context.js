import React from "react";

const studentprofileContext = React.createContext({
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

  addStudent(profile) {},
  addInstructor(profile) {},
});

export default studentprofileContext;
