import React, { useState, useEffect } from "react";
import authContext from "./auth-context";
import Requester from "../modules/Requester";

const AuthProvider = (props) => {
  const [userName, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [userUniqueID, setUserUniqueID] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const RequestHelper = new Requester();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setisLoggedIn(true);
    }
  }, []);

  const loginHandler = async (username, password) => {
    if (!isLoggedIn) {
      let data = {
        username: username,
        password: password,
      };

      const response = await RequestHelper.post("login.php", data);
      if (response) {
        setisLoggedIn(true);
        setUsername(response.username);
        setUserType(response.usertype);
        setUserUniqueID(response.uniqueid);
        localStorage.setItem("tracksToken", response["access_token"]);
        localStorage.setItem("tracksRefresh", response["refresh_token"]);
        localStorage.setItem("isLoggedIn", true);
      }
    }
  };

  const logoutHandler = () => {
    if (isLoggedIn) {
      setisLoggedIn(false);
      setUsername("");
      setUserType("");
      localStorage.removeItem("tracksToken");
      localStorage.removeItem("tracksRefresh");
      localStorage.removeItem("isLoggedIn");
    }
  };

  const authCtx = {
    username: userName,
    usertype: userType,
    userUniqueID:userUniqueID,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <authContext.Provider value={authCtx}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
