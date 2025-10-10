import Cookies from "js-cookie";

const fetchContactUs = async (
  setLoading,
  apiBase,
  setErrors,
  setContactUs,
  setPagination
) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/admin/contact-us/get`, {
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

    setContactUs(data.data);
    setPagination({
      current_page: data.current_page,
      last_page: data.last_page,
      total: data.total,
      per_page: data.per_page,
    });
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default fetchContactUs;
