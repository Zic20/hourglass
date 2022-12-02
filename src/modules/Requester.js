class Requester {
  constructor() {
    this.baseUrl = "http://127.0.0.1/practicumapi/";
  }

  get = async (url) => {
    this.validateToken();
    try {
      const response = await fetch(this.baseUrl + url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  post = async (url, data) => {
    const userdata = data;

    try {
      const response = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userdata),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.getToken();
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  update = async (url, data) => {
    const userData = data;
    try {
      const response = await fetch(this.baseUrl + url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.getToken();
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  delete = async (url) => {
    try {
      const response = await fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          localStorage.removeItem("isLoggedIn");
        }
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  validateToken = async () => {
    const response = await fetch(this.baseUrl + "activities?week=1", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      this.getToken();
    }
  };

  getToken = async () => {
    try {
      const refreshToken = localStorage.getItem("tracksRefresh")
        ? localStorage.getItem("tracksRefresh")
        : "";

      const response = await fetch(this.baseUrl + "refresh.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!response.ok) {
        if (response.status === 400 || response.status === 401) {
          localStorage.removeItem("isLoggedIn");
        }
      }

      const data = await response.json();
      localStorage.setItem("tracksToken", data["access_token"]);
      localStorage.setItem("tracksRefresh", data["refresh_token"]);
    } catch (error) {
      return error.message;
    }
  };
}

export const RequestHelper = new Requester();
export default Requester;
