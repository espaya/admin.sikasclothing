import Cookies from "js-cookie";
const getOrders = async (setLoading, apiBase, setErrors, setOrders, setPagination) => {
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

    console.log(data);

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setOrders(data.data);

    setPagination({
      current_page: data.current_page,
      last_page: data.last_page,
      links: data.links,
      total: data.total,
      from: data.from,
      to: data.to,
    });

  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getOrders;
