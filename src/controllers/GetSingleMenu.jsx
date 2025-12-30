import Cookies from "js-cookie";

const getSingleMenu = async (setLoading, setErrors, setMenu, id, apiBase) => {
  setLoading(true);

  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(`${apiBase}/api/get-single-menu/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setMenu(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleMenu;
