import { useCallback, useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const baseUrl = `http://127.0.0.1/practicumapi/`;
  const baseUrl = `http://192.168.0.197:80/practicumapi/`;

  const sendRequest = useCallback(
    async (requestConfig, workWithData) => {
      try {
        setLoading(true);
        const headers = new Headers();
        headers.append(
          "Authorization",
          `Bearer ${localStorage.getItem("tracksToken")}`
        );
        headers.append("Content-Type", "application/json");
        const response = await fetch(baseUrl + requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers,
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
