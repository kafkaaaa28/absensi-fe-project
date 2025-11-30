import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
// const isDevelopment = window.location.hostname === 'localhost';

// const baseURL = isDevelopment ? 'http://localhost:5000/api' : 'http://192.168.100.230:5000/api';

// const api = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
// });
let accessToken = null;
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await api.post('/auth/refresh');
      accessToken = data.accessToken;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
export const setAccessToken = (token) => {
  accessToken = token;
};

export default api;
