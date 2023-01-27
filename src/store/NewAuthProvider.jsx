import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import authContext from "./auth-context";

let refreshTimer;

function retrieveStoredToken() {
  const hasToken = !!localStorage.getItem("tracksToken");
  if (hasToken) {
    const accessToken = localStorage.getItem("tracksToken");
    const refreshToken = localStorage.getItem("tracksRefresh");
    const storedExpirationDate = localStorage.getItem("tokenExpiration");

    const remainingTime = getRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
      return null;

    }

    return {
      accessToken,
      refreshToken,
      duration: remainingTime,
    };
  }

  return null;
}

const getRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const expiration = new Date(expirationTime).getTime();
  const remainingTime = expiration - currentTime;
  return remainingTime;
};

const NewAuthProvider = (props) => {
  /* user has token?
   1. Retrieve user's tokens
   2. If user has token, validate token but if user doesn't have token ask user to log in
   3. if user token is valid allow access else check whether user has a valid refresh token
   4. if user has a valid refresh token request a new token set else ask user to login
  */

  const navigate = useNavigate();
  const tokenData = useMemo(() => retrieveStoredToken(), []);

  let initialAccessToken = "";
  let initialRefreshToken = "";

  if (tokenData) {
    initialAccessToken = tokenData.accessToken;
    initialRefreshToken = tokenData.refreshToken;
  }

  const [token, setToken] = useState(initialAccessToken);
  const [refreshToken, setRefreshToken] = useState(initialRefreshToken);

  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    let hasRefreshToken = !!refreshToken;
    if (hasRefreshToken) {
      getNewToken();
    }
  }

  const { error, sendRequest } = useFetch();

  useEffect(() => {
    if (tokenData) {
      //sets a timer based on the token expiration time to get a new token
      refreshTimer = setTimeout(getNewToken, tokenData.duration);
    }
  }, [tokenData]);

  //   set token details
  const setTokens = (data) => {
    setToken(data["access_token"]);
    setRefreshToken(data["refresh_token"]);
    const expiresIn = new Date(data.expiresIn * 1000).getTime();
    const remainingTime = getRemainingTime(expiresIn);

    localStorage.setItem("tokenExpiration", expiresIn);
    localStorage.setItem("tracksToken", data["access_token"]);
    localStorage.setItem("tracksRefresh", data["refresh_token"]);
    refreshTimer = setTimeout(getNewToken, remainingTime);
  };


  const loginHandler = (data) => {
    setTokens(data);
    navigate("/dashboard");
  };

  const logoutHandler = useCallback(() => {
    if (isLoggedIn) {
      setToken("");
      setRefreshToken("");
      localStorage.clear();
      clearTimeout(refreshTimer);
      navigate("/login");
    }
  }, []);

  const authCtx = {
    isLoggedIn,
    token,
    refreshToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  async function getNewToken() {
    let userData = { token: refreshToken };
    sendRequest(
      { url: `refresh.php`, method: "POST", body: userData },
      (data) => {
        if (!error) {
          setTokens(data);
        }

        if (error) {
          logoutHandler();
        }
      }
    );
  }

  return (
    <authContext.Provider value={authCtx}>
      {props.children}
    </authContext.Provider>
  );
};

export default NewAuthProvider;
