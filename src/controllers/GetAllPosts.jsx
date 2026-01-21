import Cookies from "js-cookie";

const getAllPosts = async (
  setErrors,
  setAllPost,
  setLoading,
  apiBase,
  currentPage,
) => {
  setErrors({});
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/blog/get?page=${currentPage}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setErrors(data.message);
      return;
    }
    setAllPost(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getAllPosts;
