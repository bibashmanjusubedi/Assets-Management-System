import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5091/api",
});

api.interceptors.request.use((config) => {
  const local = localStorage.getItem("token");
  const token = local ? JSON.parse(local) : null;
  if (token?.access) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token.access}`;
  }
  return config;
});
