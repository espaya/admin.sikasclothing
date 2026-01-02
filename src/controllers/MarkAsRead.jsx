import Cookies from "js-cookie";

const markAsRead = async (contactID, setErrors, apiBase) => {
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(
      `${apiBase}/api/admin/contact-us/mark-as-read/${contactID}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.message);
      return;
    }
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default markAsRead;
