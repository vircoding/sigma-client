import axios from "axios";
import { useUserStore } from "../stores/userStore.js";

export const unauthorizedAPI = () => {
  return axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/v1"
        : "https://sigmacuba.com/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const authorizedAPI = () => {
  const userStore = useUserStore();
  return axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/v1"
        : "https://sigmacuba.com/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.credentialsState.token}`,
    },
  });
};
