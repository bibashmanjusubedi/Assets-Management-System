import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5091/api",
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const local = localStorage.getItem("token");
//   const token = local ? JSON.parse(local) : null;
//   if (token?.access) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token.access}`;
//   }
//   return config;
// });


api.interceptors.request.use((config) =>{
  const token = localStorage.getItem("authToken");
  if (token){
    config.headers.Authorization = ' Bearer {token}';
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) =>{
    if(error.response?.status == 401){
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
)