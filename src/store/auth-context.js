import React from "react";

const authContext = React.createContext({
  username: "",
  usertype: "",
  userUniqueID:"",
  isLoggedIn: "",
  login: (username, password) => {},
  logout: () => {},
});

export default authContext;
