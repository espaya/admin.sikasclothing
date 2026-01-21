import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Category from "../components/blog/category";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Tags from "../components/blog/tags";
import BlogContent from "../components/blog/blog_content";
import FeaturedImage from "../components/blog/featured_image";
import getSinglePost from "../controllers/GetSinglePost";
import { useParams } from "react-router-dom";

export default function CreatePost() {
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    tagInput: "", // for the tag text input
    content: "",
    status: "draft", // draft, published, archived
    featured_image: null, // <-- better to use null
    published_at: "",
    comments_enabled: "",
  });

  const handleOnChange = (e) => {
    if (e.target.type === "file") {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0], // store the file object
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    setSuccessMsg("");

    try {
      const newbody = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "tags") {
          formData.tags.forEach((tag) => {
            newbody.append("tags[]", tag);
          });
        } else if (
          key === "featured_image" &&
          formData.featured_image instanceof File
        ) {
          // ✅ only append if it's a File object, not a string
          newbody.append(key, formData[key]);
        } else if (key !== "featured_image") {
          newbody.append(key, formData[key]);
        }
      });

      // Get CSRF cookie
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });

      // ✅ Determine endpoint based on slug
      const endpoint =
        slug && slug.length > 0
          ? `${apiBase}/api/blog/update/${slug}`
          : `${apiBase}/api/blog/create`;

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: newbody,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);

      // ✅ Reset form only for create mode
      if (!slug || slug.length === 0) {
        setFormData({
          title: "",
          category: "",
          tags: [],
          tagInput: "",
          content: "",
          status: "draft",
          featured_image: null,
          published_at: "",
          comments_enabled: "",
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the existing post data using the slug
    getSinglePost(setFormData, setErrors, setLoading, apiBase, slug);
  }, [slug]);

  return (
    <div className="body">
      <div id="wrapper">
        <div id="page">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>{slug ? "Edit Blog Post" : "Add Blog Post"}</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap gap10">
                        <li>
                          <a href="/">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">
                            <div className="text-tiny">Blog</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right"></i>
                        </li>
                        <li>
                          <div className="text-tiny">Add Post</div>
                        </li>
                      </ul>
                    </div>

                    {/* Success/Error Messages */}
                    {successMsg && (
                      <p className="alert alert-success">{successMsg}</p>
                    )}
                    {errors.general && (
                      <p className="alert alert-danger">{errors.general}</p>
                    )}

                    {/* Blog Post Form */}
                    <form
                      onSubmit={handleFormSubmit}
                      className="tf-section-2 form-add-product"
                    >
                      <div className="wg-box">
                        {/* Title */}
                        <fieldset className="title">
                          <div className="body-title mb-10">
                            Post Title <span className="tf-color-1">*</span>
                          </div>
                          <input
                            className="mb-10"
                            type="text"
                            placeholder="Enter post title"
                            name="title"
                            autoComplete="off"
                            onChange={handleOnChange}
                            value={formData.title}
                          />
                          {errors.title && (
                            <div className="text-tiny text-danger">
                              {errors.title[0]}
                            </div>
                          )}
                        </fieldset>

                        <div className="gap22 cols">
                          {/* Category */}
                          <fieldset className="category">
                            <div className="body-title mb-10">
                              Category <span className="tf-color-1">*</span>
                            </div>
                            <Category
                              handleOnChange={handleOnChange}
                              value={formData.category}
                            />
                            {errors.category && (
                              <div className="text-tiny text-danger">
                                {errors.category[0]}
                              </div>
                            )}
                          </fieldset>

                          {/* Tags */}
                          <Tags
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                          />
                        </div>

                        {/* Content */}
                        <BlogContent
                          formData={formData}
                          setFormData={setFormData}
                          errors={errors}
                        />
                      </div>

                      <div className="wg-box">
                        {/* Featured Image */}
                        <FeaturedImage
                          handleOnChange={handleOnChange}
                          errors={errors}
                          formData={formData}
                          setFormData={setFormData}
                        />

                        {/* Publish Settings */}
                        <div className="cols gap22">
                          <fieldset className="publish-date">
                            <div className="body-title mb-10">Publish Date</div>
                            <input
                              type="date"
                              name="published_at"
                              value={formData.published_at} // <-- add this
                              onChange={handleOnChange}
                            />
                            {errors.published_at && (
                              <div className="text-tiny text-danger">
                                {errors.published_at[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset className="status">
                            <div className="body-title mb-10">Status</div>
                            <div className="select">
                              <select
                                value={formData.status}
                                name="status"
                                onChange={handleOnChange}
                              >
                                <option value="">Select</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                              </select>
                            </div>
                            {errors.status && (
                              <div className="text-tiny text-danger">
                                {errors.status[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset className="status">
                            <div className="body-title mb-10">
                              Enable Comments
                            </div>
                            <div className="select">
                              <select
                                name="comments_enabled"
                                onChange={handleOnChange}
                                value={formData.comments_enabled}
                              >
                                <option value="">Select</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                              </select>
                            </div>
                            {errors.comments_enabled && (
                              <div className="text-tiny text-danger">
                                {errors.comments_enabled[0]}
                              </div>
                            )}
                          </fieldset>
                        </div>

                        {/* Buttons */}
                        <div className="cols gap10 mt-4">
                          <button
                            className="tf-button w-full"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </div>
                    </form>
                    {/* End Blog Post Form */}
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
