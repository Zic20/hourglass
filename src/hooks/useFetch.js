import { useState, useEffect } from "react";

const useFetch = (url, method = "GET", userData = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1/practicumapi/${url}`, {
          method: method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
            "Content-Type": "application/json",
          },
          body: userData && JSON.stringify(userData),
        });

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(false);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
