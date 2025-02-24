import router from "@/router";
// import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const location = localStorage.getItem("books-for-all-location");
if (!location) {
  localStorage.setItem("books-for-all-location", "NG");
  axios.defaults.headers.common["X-Eden-Location"] = "NG";
} else {
  axios.defaults.headers.common["X-Eden-Location"] = location;
}

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("books-for-all-token"));

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling service
    return response;
  },
  (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token has expired
    if (
      error.response.status === 401 ||
      error.response.message === "Unauthenticated."
    ) {
      localStorage.removeItem("books-for-all-token");
      localStorage.removeItem("books-for-all-user");
      localStorage.removeItem("books-for-all-state");
      if (router.history.current.name !== "login") {
        router.push({ name: "login" });
      }
      return true;
    }
  }
);
