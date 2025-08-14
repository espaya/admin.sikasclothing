import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

export default function AddCallToAction() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    btn_text: "",
    btn_url: "",
    bg_image: null,
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({ ...prev, bg_image: file }));
      setPreviewImage(URL.createObjectURL(file)); // always replaces preview
      e.dataTransfer.clearData();
    }
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      const response = await fetch(`${apiBase}/api/add-call-to-action`, {
        method: "POST",
        credentials: "include",
        body: payload,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
      } else {
        setFormData({
          title: "",
          subtitle: "",
          btn_text: "",
          btn_url: "",
          bg_image: null,
        });
        setPreviewImage(null);
        setSuccessMsg(data.message);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({}), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Add Call to action - Sika's Clothing</title>

      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>Add Call to action</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                        <li>
                          <a href="#">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <a href="#">
                            <div className="text-tiny">Ecommerce</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Add call to action</div>
                        </li>
                      </ul>
                    </div>

                    {errors?.general && (
                      <p className="alert alert-danger">{errors.general}</p>
                    )}
                    {successMsg && (
                      <p className="alert alert-success">{successMsg}</p>
                    )}

                    <form
                      method="POST"
                      className="tf-section-2 form-add-product"
                      onSubmit={HandleFormSubmit}
                    >
                      <div className="wg-box">
                        <div className="gap22 cols">
                          <fieldset>
                            <div className="body-title mb-10">Title *</div>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleOnChange}
                            />
                            {errors.title && (
                              <div className="text-tiny text-danger">
                                {errors.title[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset>
                            <div className="body-title mb-10">Subtitle *</div>
                            <input
                              type="text"
                              name="subtitle"
                              value={formData.subtitle}
                              onChange={handleOnChange}
                            />
                            {errors.subtitle && (
                              <div className="text-tiny text-danger">
                                {errors.subtitle[0]}
                              </div>
                            )}
                          </fieldset>
                        </div>

                        <div className="gap22 cols">
                          <fieldset>
                            <div className="body-title mb-10">
                              Button Text *
                            </div>
                            <input
                              type="text"
                              name="btn_text"
                              value={formData.btn_text}
                              onChange={handleOnChange}
                            />
                            {errors.btn_text && (
                              <div className="text-tiny text-danger">
                                {errors.btn_text[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset>
                            <div className="body-title mb-10">Button URL *</div>
                            <input
                              type="text"
                              name="btn_url"
                              value={formData.btn_url}
                              onChange={handleOnChange}
                            />
                            {errors.btn_url && (
                              <div className="text-tiny text-danger">
                                {errors.btn_url[0]}
                              </div>
                            )}
                          </fieldset>
                        </div>
                      </div>

                      <div className="wg-box">
                        <fieldset>
                          <div className="body-title mb-10">Upload images</div>
                          <div
                            className={`upload-image mb-16 p-4 border rounded ${
                              dragActive ? "bg-light" : ""
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            {previewImage ? (
                              <div
                                className="position-relative"
                                style={{ textAlign: "center" }}
                              >
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  style={{
                                    width: "100%",
                                    maxHeight: 200,
                                    objectFit: "contain",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPreviewImage(null);
                                    setFormData((prev) => ({
                                      ...prev,
                                      bg_image: null,
                                    }));
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    background: "rgba(0,0,0,0.6)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: 24,
                                    height: 24,
                                    cursor: "pointer",
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <label
                                className="uploadfile w-100 text-center"
                                htmlFor="myFile"
                                style={{ cursor: "pointer" }}
                              >
                                <span className="icon">
                                  <i className="icon-upload-cloud" />
                                </span>
                                <span className="text-tiny">
                                  Drop your images here or{" "}
                                  <span className="tf-color">
                                    click to browse
                                  </span>
                                </span>
                                <input
                                  type="file"
                                  id="myFile"
                                  name="bg_image"
                                  accept="image/*"
                                  onChange={handleOnChange}
                                  hidden
                                />
                              </label>
                            )}
                          </div>
                          <p>Image size should be 1920px X 700px</p>
                          {errors.bg_image && (
                            <div className="text-tiny text-danger">
                              {errors.bg_image[0]}
                            </div>
                          )}
                        </fieldset>

                        <div className="cols gap10">
                          <button
                            className="tf-button w-full"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Processing..." : "Add call to action"}
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
    </>
  );
}
