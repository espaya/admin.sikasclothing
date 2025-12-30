import Cookies from "js-cookie";

const getSingleHero = async (setLoading, setErrors, id, setHero, apiBase) => {
  setLoading(false);

  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(`${apiBase}/api/get-single-hero/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }
    setHero(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleHero;
