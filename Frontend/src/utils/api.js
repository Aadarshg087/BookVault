import { BASE_URL } from "./constants";

const token = localStorage.getItem("userInfo");

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default api;
