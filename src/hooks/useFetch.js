import { useCallback, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const baseUrl = `http://192.168.0.101:80/practicumapi/`;
  const baseUrl = `http://127.0.0.1/practicumapi/`;

  const sendRequest = useCallback(
    async (requestConfig, workWithData) => {
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
        const data = await response.json();
        workWithData(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setLoading(false); 
    },
    [baseUrl]
  );

  return { loading, error, sendRequest };
};

export default useFetch;
