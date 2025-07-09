import { BASE_URL } from "./constants";
import axios from "axios";

const token = localStorage.getItem("userInfo");

const api = axios.create({
  baseURL: `${BASE_URL}`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userInfo");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
