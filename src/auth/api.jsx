// api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use env variable
  withCredentials: true, // Required for sessions
});

// Production: Ensure cookies are managed properly
api.interceptors.request.use((config) => {
  // Clear any malformed cookies (if any)
  if (process.env.NODE_ENV === "production") {
    const allowedCookies = ["app_session", "XSRF-TOKEN"];
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      if (!allowedCookies.includes(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.yourdomain.com`;
      }
    });
  }
  return config;
});

export default api;
