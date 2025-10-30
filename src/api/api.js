import axios from 'axios';
const API = axios.create({ baseURL: "https://expense-tracker-backend-gy5b.onrender.com/api" });

// If using JWT, attach token:
// API.interceptors.request.use(cfg => {
//   const token = localStorage.getItem('token');
//   if(token) cfg.headers.Authorization = `Bearer ${token}`;
//   return cfg;
// });

export default API;
