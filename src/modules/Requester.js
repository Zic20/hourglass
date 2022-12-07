class Requester {
  constructor() {
    this.baseUrl = "http://127.0.0.1/practicumapi/";
    this.loading = false;
    this.error = false;
    this.result = null;
  }

  get = async (url) => {
    this.error = false;
    try {
      const response = await fetch(this.baseUrl + url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if(response.status === 401){
          this.getToken();
        }
        throw new Error();
      }
      this.result = await response.json();
    } catch (error) {
      this.error = true;
    }

    return { data: this.result, loading: this.loading, error: this.error };
  };

  post = async (url, data) => {
    const userdata = data;
    this.error = false;
    try {
      const response = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("tracksToken")}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userdata),
      });

      if (!response.ok) {
        if(response.status === 401){
          this.getToken();
        }
        throw new Error();
      }
      this.result = await response.json();
    } catch (error) {
      this.error = true;
    }

    return { data: this.result, loading: this.loading, error: this.error };
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
        if(response.status === 401){
          this.getToken();
        }
        throw new Error();
      }
      this.result = await response.json();
    } catch (error) {
      this.error = true;
    }

    return { data: this.result, loading: this.loading, error: this.error };
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
        if(response.status === 401){
          this.getToken();
        }
        throw new Error();
      }
      this.result = await response.json();
    } catch (error) {
      this.error = true;
    }

    return { data: this.result, loading: this.loading, error: this.error };
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
