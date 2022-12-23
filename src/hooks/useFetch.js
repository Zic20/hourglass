import { useCallback, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = `http://127.0.0.1/practicumapi/`;

  const getRefreshToken = async () => {
    const refreshToken = localStorage.getItem("tracksRefresh")
    ? localStorage.getItem("tracksRefresh")
    : "";

    const response = await fetch(baseUrl +"refresh.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
        "Content-Type": "application/json",
      },

      body: {token:refreshToken},
    });

    if(!response.ok){
      if(response.status === 401 || response.status === 400){
        localStorage.clear();
      }
    }

    const data = await response.json();


    if(!error){
      localStorage.setItem("tracksToken", data["access_token"]);
      localStorage.setItem("tracksRefresh", data["refresh_token"]);
    }else{
      localStorage.clear();
    }
  };

  const sendRequest = useCallback(async (requestConfig, useData) => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        if(response.status === 401){
          getRefreshToken();
        }
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      useData(data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
    setLoading(false);
  }, []);

  return { loading, error, sendRequest };
};

export default useFetch;
