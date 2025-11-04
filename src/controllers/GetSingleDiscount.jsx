import Cookies from "js-cookie";

const getSingleDiscount = async (
  setLoading,
  setErrors,
  setDiscounts,
  apiBase,
  id
) => {
  setLoading(true);
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const response = await fetch(`${apiBase}/api/single-discount/${id}`, {
      method: "POST",
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
    setDiscounts(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleDiscount;
