import React from "react";

const authContext = React.createContext({
  username: "",
  usertype: "",
  userUniqueID: "",
  token: "",
  refreshToken: "",
  isLoggedIn: false,
  register: ({ username, studentID, password, password2 }) => {},
  login: (username, password) => {},
  logout: () => {},
});

export default authContext;
