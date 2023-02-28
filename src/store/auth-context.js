import React from "react";

const authContext = React.createContext({
  username: "",
  name: "",
  usertype: "",
  userUniqueID: "",
  token: "",
  refreshToken: "",
  isLoggedIn: "",
  register: ({ username, studentID, password, password2 }) => {},
  login: (username, password) => {},
  logout: () => {},
});

export default authContext;
