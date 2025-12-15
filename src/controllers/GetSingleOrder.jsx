import Cookies from "js-cookie";

const getSingleOrder = async (
  apiBase,
  setLoading,
  setErrors,
  setOrders,
  order_number
) => {
  setLoading(true);

  try {
    const response = await fetch(
      `${apiBase}/api/admin/get-order/${order_number}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      }
    );

    const data = await response.json();

    console.log(data);

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

export default getSingleOrder;
