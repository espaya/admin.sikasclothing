import Cookies from "js-cookie";

const getSinglePost = async (
  setFormData,
  setError,
  setLoading,
  apiBase,
  slug,
) => {
  setError({});
  setLoading(true);

  try {
    if (slug) {
      const response = await fetch(`${apiBase}/api/blog/get/${slug}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const post = await response.json();

      if (!response.ok) {
        setError({ general: post.message || "Post not found" });
        return;
      }

      // Parse tags (stored as JSON string)
      let tags = [];
      if (post.post_tags?.length) {
        tags = JSON.parse(post.post_tags[0].tag);
      }

      // Map API → formData
      setFormData({
        title: post.title || "",
        category: post.category?.id || "",
        tags: tags,
        tagInput: "",
        content: post.content || "",
        status: post.status || "draft",
        featured_image: post.featured_image || null, // ✅ <-- use API path here
        published_at: post.published_at
          ? new Date(post.published_at).toISOString().split("T")[0] // YYYY-MM-DD
          : "",
        comments_enabled: String(post.comments_enabled),
      });

    }
  } catch (err) {
    setError({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSinglePost;
