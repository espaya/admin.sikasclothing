import Cookies from "js-cookie";
const getOrders = async (setLoading, apiBase, setErrors, setOrders) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/admin/all-orders`, {
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
    setOrders(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getOrders;
