
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-5-0g50.onrender.com/api' // ✅ Render live backend
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
