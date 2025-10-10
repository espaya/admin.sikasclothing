import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

export default function CreatePostCategory() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    category_name: "",
    status: "",
    description: "",
    featured_image: null, // store File object
  });
  const [preview, setPreview] = useState(null);

  // ✅ handle text/textarea/select changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featured_image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featured_image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // ✅ submit form with FormData
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setLoading(true);

    try {
      const body = new FormData();
      body.append("category_name", formData.category_name);
      body.append("status", formData.status);
      body.append("description", formData.description);
      if (formData.featured_image) {
        body.append("featured_image", formData.featured_image);
      }

      await fetch(`${apiBase}/sanctum/csrf-token`, {
        credentials: "include",
        method: "GET"
      });

      const response = await fetch(`${apiBase}/api/store-post-category`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setFormData({
        category_name: "",
        status: "",
        description: "",
        featured_image: null,
      });
      setPreview(null);
      setSuccessMsg(data.message);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                        <h3>Add Post Category</h3>
                        <ul className="breadcrumbs flex items-center gap10">
                          <li>
                            <a href="index.html">
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
                            <div className="text-tiny">Add Post category</div>
                          </li>
                        </ul>
                      </div>

                      {errors.general && (
                        <p className="alert alert-danger">{errors.general}</p>
                      )}
                      {successMsg && (
                        <p className="alert alert-success">{successMsg}</p>
                      )}

                      <form
                        onSubmit={handleFormSubmit}
                        method="POST"
                        className="tf-section-2 form-add-product"
                      >
                        <div className="wg-box">
                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Category name{" "}
                              <span className="tf-color-1">*</span>
                            </div>
                            <input
                              className="mb-10"
                              type="text"
                              placeholder="Enter category name"
                              name="category_name"
                              value={formData.category_name}
                              onChange={handleOnChange}
                            />
                            {errors.category_name && (
                              <p className="text-danger">
                                {errors.category_name[0]}
                              </p>
                            )}
                          </fieldset>

                          <div className="gap22 cols">
                            <fieldset className="category">
                              <div className="body-title mb-10">
                                Status <span className="tf-color-1">*</span>
                              </div>
                              <div className="select">
                                <select
                                  onChange={handleOnChange}
                                  name="status"
                                  value={formData.status}
                                >
                                  <option value="">Choose status</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>
                              {errors.status && (
                                <p className="text-danger">
                                  {errors.status[0]}
                                </p>
                              )}
                            </fieldset>
                          </div>

                          <fieldset className="description">
                            <div className="body-title mb-10">
                              Description{" "}
                              <span className="tf-color-1">(Optional)</span>
                            </div>
                            <textarea
                              className="mb-10"
                              name="description"
                              placeholder="Description"
                              value={formData.description}
                              onChange={handleOnChange}
                            />
                            {errors.description && (
                              <p className="text-danger">
                                {errors.description[0]}
                              </p>
                            )}
                          </fieldset>
                        </div>

                        <div className="wg-box">
                          <fieldset>
                            <div className="body-title mb-10">
                              Featured Image
                            </div>
                            <div
                              className="upload-image mb-16 border border-dashed p-4 text-center cursor-pointer"
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                            >
                              {preview ? (
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="max-h-40 mx-auto"
                                />
                              ) : (
                                <p>
                                  Drag & drop your image here or{" "}
                                  <label
                                    htmlFor="myFile"
                                    className="tf-color cursor-pointer"
                                  >
                                    click to browse
                                  </label>
                                </p>
                              )}
                              <input
                                type="file"
                                id="myFile"
                                name="featured_image"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
                              />
                            </div>
                            {errors.featured_image && (
                              <p className="text-danger">
                                {errors.featured_image[0]}
                              </p>
                            )}
                          </fieldset>

                          <div className="cols gap10">
                            <button
                              className="tf-button w-full"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => window.history.back()}
                              className="tf-button style-1 w-full"
                              type="button"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
