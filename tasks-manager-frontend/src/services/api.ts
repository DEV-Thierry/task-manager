import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
// const apiUrl = "http://localhost:5226/api";

const api = axios.create({
  baseURL: apiUrl,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // ou onde você guarda o token
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default api;
