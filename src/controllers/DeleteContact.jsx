import Cookies from "js-cookie";

const destroyContact = async (setErrors, setSuccessMsg, apiBase, contactID) => {
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

    const response = await fetch(
      `${apiBase}/api/admin/contact-us/delete/${contactID}`,
      {
        credentials: "include",
        method: "DELETE",
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

    setSuccessMsg(data.message);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default destroyContact;
