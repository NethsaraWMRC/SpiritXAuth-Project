import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-base-url.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(
      "https://your-api-base-url.com/auth/refresh",
      { refreshToken }
    );

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
