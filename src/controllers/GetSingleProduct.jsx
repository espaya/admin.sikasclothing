import Cookies from "js-cookie";

const getSingleProduct = async (
  slug,
  setLoading,
  setErrors,
  setProduct,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/edit-product/${slug}`, {
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

    setProduct(data);
  } catch (err) {
    setErrors({ general: err.mesage });
  } finally {
    setLoading(false);
  }
};

export default getSingleProduct;
