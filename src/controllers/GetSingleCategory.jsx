import Cookies from "js-cookie";

const getSingleCategory = async (
  setLoading,
  setErrors,
  apiBase,
  setCategories,
  slug
) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/single-category/${slug}`, {
      method: "GET",
      credentials: "include",
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

    setCategories(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleCategory;
