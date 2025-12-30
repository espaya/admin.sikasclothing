import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import getSingleSpotlight from "../controllers/GetSingleSpotlight";

export default function EditSpotlight() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [spotlight, setSpotlight] = useState([]);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    link_text: "",
    link_url: "",
    bg_color: "",
    bg_image: null,
    add_to_megamenu: "",
  });

  // Handle text, link, color inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection / drag drop
  const handleImageSelect = (file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, bg_image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    handleImageSelect(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageSelect(e.dataTransfer.files[0]);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, bg_image: null }));
    setPreviewImage(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("link_text", formData.link_text);
      formDataToSend.append("link_url", formData.link_url);
      formDataToSend.append("bg_color", formData.bg_color);
      formDataToSend.append(
        "add_to_megamenu",
        formData.add_to_megamenu ? 1 : 0
      );

      // If there's a new file uploaded, append it
      if (formData.bg_image instanceof File) {
        formDataToSend.append("bg_image", formData.bg_image);
      }
      // If there's no new file but we have an existing image from the API
      else if (spotlight.bg_image) {
        // Append the existing filename as a regular form field
        formDataToSend.append("bg_image", spotlight.bg_image);
      }

      const response = await fetch(
        `${apiBase}/api/update-single-spotlight/${id}`,
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);

      // Refresh the spotlight data after successful update
      getSingleSpotlight(setLoading, id, setSpotlight, setErrors, apiBase);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleSpotlight(setLoading, id, setSpotlight, setErrors, apiBase);
  }, []);

  useEffect(() => {
    if (spotlight && spotlight.id) {
      setFormData({
        add_to_megamenu: spotlight.add_to_megamenu || "",
        bg_color: spotlight.bg_color || "",
        bg_image: null, // ✅ keep existing filename
        link_text: spotlight.link_text || "",
        link_url: spotlight.link_url || "",
        title: spotlight.title || "",
      });

      if (spotlight.bg_image) {
        setPreviewImage(`${apiBase}/storage/spotlight/${spotlight.bg_image}`);
      }
    }
  }, [spotlight]);

  return (
    <>
      <title>Edit Spotlight - Sika's Clothing</title>

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
                      <h3>Edit Spotlight</h3>
                      <ul className="breadcrumbs flex items-center gap10">
                        <li>
                          <a href="/">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Add Spotlight</div>
                        </li>
                      </ul>
                    </div>

                    {successMsg && (
                      <p className="alert alert-success">{successMsg}</p>
                    )}
                    {errors.general && (
                      <p className="alert alert-danger">{errors.general}</p>
                    )}

                    <form
                      className="tf-section-2 form-add-product"
                      onSubmit={HandleFormSubmit}
                    >
                      <div className="wg-box">
                        <div className="gap22 cols">
                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Title <span className="tf-color-1">*</span>
                            </div>
                            <input
                              type="text"
                              placeholder="Enter spotlight title"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {errors.title && (
                              <div class="text-tiny text-danger">
                                {errors.title[0]}
                              </div>
                            )}
                          </fieldset>

                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Link text <span className="tf-color-1">*</span>
                            </div>
                            <input
                              type="text"
                              placeholder="Enter spotlight link text"
                              name="link_text"
                              value={formData.link_text}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {errors.link_text && (
                              <div class="text-tiny text-danger">
                                {errors.link_text[0]}
                              </div>
                            )}
                          </fieldset>
                        </div>

                        <fieldset className="name">
                          <div className="body-title mb-10">
                            Link URL <span className="tf-color-1">*</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter spotlight link"
                            name="link_url"
                            value={formData.link_url}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          {errors.link_url && (
                            <div class="text-tiny text-danger">
                              {errors.link_url[0]}
                            </div>
                          )}
                        </fieldset>

                        <div className="cols gap22 items-center">
                          <fieldset className="name">
                            <div className="body-title mb-10">
                              Background Color
                            </div>
                            <input
                              type="color"
                              name="bg_color"
                              value={formData.bg_color}
                              onChange={handleChange}
                            />
                            {errors.bg_color && (
                              <div class="text-tiny text-danger">
                                {errors.bg_color[0]}
                              </div>
                            )}
                          </fieldset>

                          {/* Color preview box */}
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "1px solid #ccc",
                              backgroundColor:
                                formData.bg_color || "transparent",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="wg-box">
                        <fieldset>
                          <div className="body-title mb-10">Upload Image</div>
                          <div
                            className="item up-load mb-16"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            style={{
                              border: "2px dashed #ccc",
                              padding: "20px",
                              textAlign: "center",
                              position: "relative",
                            }}
                          >
                            {previewImage ? (
                              <div
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  style={{
                                    maxWidth: "200px",
                                    borderRadius: "8px",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-10px",
                                    background: "red",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "24px",
                                    height: "24px",
                                    cursor: "pointer",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <>
                                <p>Drop your image here or click to browse</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    opacity: 0,
                                    cursor: "pointer",
                                  }}
                                />
                              </>
                            )}
                          </div>
                          <div className="body-text">
                            Image size is 450px X 450px
                          </div>
                          {errors.bg_image && (
                            <div class="text-tiny text-danger">
                              {errors.bg_image[0]}
                            </div>
                          )}
                        </fieldset>

                        <fieldset className="name">
                          <label className="d-flex align-items-center gap-2">
                            <input
                              type="checkbox"
                              value={1}
                              name="add_to_megamenu"
                              checked={formData.add_to_megamenu}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  add_to_megamenu: e.target.checked,
                                })
                              }
                            />
                            <span className="body-title mb-0">
                              Add this spotlight to the megamenu?
                            </span>
                          </label>

                          {errors.add_to_megamenu && (
                            <div className="text-tiny text-danger">
                              {errors.add_to_megamenu[0]}
                            </div>
                          )}
                        </fieldset>

                        <div className="cols gap10">
                          <button
                            className="tf-button w-full"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Adding..." : "Add Spotlight"}
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
