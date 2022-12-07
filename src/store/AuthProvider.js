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
      let userData = {
        username: username,
        password: password,
      };

      const {data} = await RequestHelper.post("login.php", userData);
      if (data) {
        setisLoggedIn(true);
        setUsername(data.username);
        setUserType(data.usertype);
        setUserUniqueID(data.uniqueid);
        localStorage.setItem("tracksToken", data["access_token"]);
        localStorage.setItem("tracksRefresh", data["refresh_token"]);
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
