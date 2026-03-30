import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // backend base URL
  withCredentials: true, // needed if using cookies for refresh tokens
});

// 🔹 Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// 🔹 Handle expired tokens automatically
API.interceptors.response.use(
  (res) => res, // success → just return it
  async (error) => {
    const originalRequest = error.config;

    // check if unauthorized + not retried before
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // request new token using refresh endpoint
        const refreshResponse = await axios.post(
          "http://localhost:8080/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.token;

        // save new token and retry the original request
        localStorage.setItem("token", newToken);
        API.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return API(originalRequest); // retry original request
      } catch (refreshError) {
        // refresh token failed → log user out
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // any other errors → reject normally
    return Promise.reject(error);
  }
);

export default API;
