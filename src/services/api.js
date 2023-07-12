import axios from "axios";
import { useUserStore } from "../stores/user";

export const unauthorizedAPI = () => {
  return axios.create({
    baseURL: "https://sigma-api-ehki.onrender.com/api/v1",
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
    baseURL: "https://sigma-api-ehki.onrender.com/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.userState.credentials.token}`,
    },
  });
};
