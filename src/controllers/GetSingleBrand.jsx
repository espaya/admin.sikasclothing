import Cookies from "js-cookie";

const getSingleBrand = async (
  setLoading,
  setErrors,
  setBrand,
  apiBase,
  slug
) => {
  setLoading(true);
  setErrors({});
  try {
    await fetch(`${apiBase}/sanctum/csrf-token`, {
      credentials: "include",
    });
    
    const response = await fetch(`${apiBase}/api/single-brand/${slug}`, {
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

    setBrand(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleBrand;
