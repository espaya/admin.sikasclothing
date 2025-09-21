import { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

const useLogout = () => {
  const { setUser, fetchUser } = useContext(AuthContext);
  const apiBase = import.meta.env.VITE_API_URL;

  const logout = async (navigate) => {
    try {
      // 1. Get CSRF cookie
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      // 2. Call Laravel logout
      await fetch(`${apiBase}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      // 3. Cleanup
      Cookies.remove("XSRF-TOKEN");

      // 4. Refresh user state from backend
      await fetchUser();

      // 5. Navigate to homepage
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);

      // fallback: clear user manually
      setUser(null);
      navigate("/");
    }
  };

  return logout;
};

export default useLogout;
