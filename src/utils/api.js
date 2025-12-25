import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   withCredentials: true,
// });
const isDevelopment = window.location.hostname === 'localhost';

const baseURL = isDevelopment ? 'http://localhost:5000/api' : 'http://192.168.100.230:5000/api';
const forceLogout = () => {
  accessToken = null;
  window.location.href = '/login';
};

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
let accessToken = null;
api.interceptors.request.use(
  async (config) => {
    await Promise.resolve();
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
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh');
        accessToken = data.accessToken;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error('❌ Refresh token gagal:', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
(async () => {
  try {
    const { data } = await api.post('/auth/refresh');
    accessToken = data.accessToken;
  } catch {}
})();
export const setAccessToken = async (token) => {
  accessToken = token;
};

export default api;
