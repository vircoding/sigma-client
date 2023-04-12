import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
