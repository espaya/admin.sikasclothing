import Cookies from "js-cookie";

const getSingleSpotlight = async (
  setLoading,
  id,
  setSpotlight,
  setErrors,
  apiBase
) => {
  setLoading(true);
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(`${apiBase}/api/single-spotlight/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setSpotlight(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleSpotlight;
