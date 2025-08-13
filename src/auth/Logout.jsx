import Cookies from "js-cookie";

const logoutUser = async (navigate) => {
  const apiBase = import.meta.env.VITE_API_URL;
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const csrfToken = Cookies.get("XSRF-TOKEN");

    await fetch(`${apiBase}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
      },
    });

    navigate("/");
  } catch (err) {
    console.error("Logout failed: " + err);
  }
};

export default logoutUser;
