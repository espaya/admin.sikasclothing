import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function AddHero() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const apiBase = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    text: "",
    img: null,
    btn_text: "",
    btn_link: "",
  });

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, img: null }));
    setPreview(null);
  };

  const handleFileSelect = (file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, img: file }));
      setPreview(URL.createObjectURL(file)); // Always replace preview
    }
  };

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img") {
      handleFileSelect(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // 1. Get CSRF cookie
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // 2. Build FormData
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, value);
        }
      });

      // 3. Send request
      const response = await fetch(`${apiBase}/api/store-hero`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      // Reset form
      setFormData({
        title: "",
        subtitle: "",
        text: "",
        img: null,
        btn_text: "",
        btn_link: "",
      });
      setPreview(null);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({}), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <meta charSet="utf-8" />
      <title>Add Hero - Sika's Clothing</title>

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
                      <h3>Add Hero</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                        <li>
                          <a href="index.html">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <a href="#">
                            <div className="text-tiny">Hero</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Add hero</div>
                        </li>
                      </ul>
                    </div>

                    {errors?.general && (
                      <div className="alert alert-danger">
                        {errors?.general}
                      </div>
                    )}

                    <form
                      onSubmit={handleOnSubmit}
                      className="tf-section-2 form-add-product"
                      method="POST"
                    >
                      <div className="wg-box">
                        <div className="gap22 cols">
                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Title <span className="tf-color-1">*</span>
                            </div>
                            <input
                              className="mb-10"
                              type="text"
                              placeholder="Enter hero main title"
                              name="title"
                              value={formData.title}
                              autoComplete="off"
                              onChange={handleOnChange}
                            />
                            {errors.title && (
                              <div className="text-tiny text-danger">
                                {errors.title[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Subtitle <span className="tf-color-1">*</span>
                            </div>
                            <input
                              className="mb-10"
                              type="text"
                              placeholder="Enter hero subtitle"
                              name="subtitle"
                              value={formData.subtitle}
                              autoComplete="off"
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
                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Text <span className="tf-color-1">*</span>
                            </div>
                            <input
                              className="mb-10"
                              type="text"
                              placeholder="Enter hero text"
                              name="text"
                              value={formData.text}
                              autoComplete="off"
                              onChange={handleOnChange}
                            />
                            {errors.text && (
                              <div className="text-tiny text-danger">
                                {errors.text[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Button Text <span className="tf-color-1">*</span>
                            </div>
                            <input
                              className="mb-10"
                              type="text"
                              placeholder="Enter hero button text"
                              name="btn_text"
                              value={formData.btn_text}
                              autoComplete="off"
                              onChange={handleOnChange}
                            />
                            {errors.btn_text && (
                              <div className="text-tiny text-danger">
                                {errors.btn_text[0]}
                              </div>
                            )}
                          </fieldset>
                        </div>

                        <fieldset className="name">
                          <div className="body-title mb-10">
                            Button Link <span className="tf-color-1">*</span>
                          </div>
                          <input
                            className="mb-10"
                            type="text"
                            placeholder="Enter hero button link"
                            name="btn_link"
                            value={formData.btn_link}
                            autoComplete="off"
                            onChange={handleOnChange}
                          />
                          {errors.btn_link && (
                            <div className="text-tiny text-danger">
                              {errors.btn_link[0]}
                            </div>
                          )}
                        </fieldset>
                      </div>

                      <div className="wg-box">
                        <fieldset>
                          <div className="body-title mb-10">Upload image</div>
                          <div
                            className={`upload-image mb-16 ${
                              dragOver ? "drag-over" : ""
                            }`}
                            onDrop={handleOnDrop}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                          >
                            <div className="item up-load">
                              <label className="uploadfile" htmlFor="myFile">
                                <span className="icon">
                                  <i className="icon-upload-cloud" />
                                </span>
                                <span className="text-tiny">
                                  Drop your image here or{" "}
                                  <span className="tf-color">
                                    click to browse
                                  </span>
                                </span>
                                <input
                                  type="file"
                                  id="myFile"
                                  name="img"
                                  accept="image/*"
                                  onChange={handleOnChange}
                                  style={{ display: "none" }}
                                />
                              </label>
                            </div>
                          </div>

                          {preview && (
                            <div
                              className="preview mt-3"
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={preview}
                                alt="Preview"
                                style={{
                                  maxWidth: "100%",
                                  borderRadius: "8px",
                                  border: "1px solid #ddd",
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  background: "rgba(0,0,0,0.6)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "24px",
                                  height: "24px",
                                  cursor: "pointer",
                                }}
                              >
                                ✕
                              </button>
                            </div>
                          )}

                          <div className="body-text">
                            Image size should be 1920 X 924
                          </div>
                          {errors.img && (
                            <div className="text-tiny text-danger">
                              {errors.img[0]}
                            </div>
                          )}
                        </fieldset>

                        <div className="cols gap10">
                          <button
                            className="tf-button w-full"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Processing" : "Add hero"}
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
