import { useState } from "react";
import Cookies from "js-cookie";

export default function AddBrandForm() {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    description: "",
    status: "",
    is_featured: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files)[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      const form = new FormData();
      form.append("name", formData.name);
      form.append("status", formData.status);
      form.append("description", formData.description);
      form.append("website", formData.website);
      form.append("is_featured", formData.is_featured ? 1 : 0);
      if (formData.logo) {
        form.append("logo", formData.logo);
      }

      console.log(form);

      const response = await fetch(`${apiBase}/api/add-brand`, {
        method: "POST",
        credentials: "include",
        body: form,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
      } else {
        setSuccessMessage(data.message);
        setFormData({
          name: "",
          logo: null,
          description: "",
          status: "",
          is_featured: "",
          website: "",
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 3500);
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => {
        setErrors({ general: "" });
      }, 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errors.general && (
        <p id="error-message" className="text-danger md-5">
          {" "}
          {errors.general}{" "}
        </p>
      )}
      {successMessage && (
        <p className="alert alert-success"> {successMessage} </p>
      )}
      <form onSubmit={handleSubmit} className="tf-section-2 form-add-product">
        <div className="wg-box">
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Name <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter brand name"
                name="name"
                tabIndex={0}
                value={formData.name}
                aria-required="true"
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && (
                <div className="text-tiny text-danger">{errors.name[0]}</div>
              )}
            </fieldset>
            <fieldset className="category">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Choose status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              {errors.status && (
                <div className="text-tiny text-danger">{errors.status[0]}</div>
              )}
            </fieldset>
          </div>
          <fieldset className="name">
            <div className="body-title mb-10">
              Website <span className="tf-color-1"></span>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="https://example.com"
              name="website"
              tabIndex={0}
              value={formData.website}
              aria-required="true"
              onChange={handleChange}
            />
            {errors.website && (
              <div className="text-tiny text-danger">{errors.website[0]}</div>
            )}
          </fieldset>
          <fieldset className="description">
            <div className="body-title mb-10">
              Description <span className="tf-color-1"></span>
            </div>
            <textarea
              className="mb-10"
              name="description"
              placeholder="Description"
              tabIndex={0}
              aria-required="true"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="text-tiny text-danger">
                {errors.description[0]}
              </div>
            )}
          </fieldset>
          <fieldset className="name">
            <div className="body-title mb-10">
              Featured <span className="tf-color-1"></span>
            </div>
            <label className="flex items-center gap-2 mb-10">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_featured: e.target.checked,
                  }))
                }
                className="total-checkbox"
              />
              <span className="text-tiny">Mark this brand as featured</span>
            </label>
            {errors.is_featured && (
              <div className="text-tiny text-danger">
                {errors.is_featured[0]}
              </div>
            )}
          </fieldset>
        </div>
        <div className="wg-box">
          <fieldset>
            <div className="body-title mb-10">
              Upload Logo<span className="tf-color-1"> *</span>
            </div>
            <div
              className="upload-image mb-16"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
              }}
            >
              {formData.logo ? (
                <div className="item">
                  <img
                    src={URL.createObjectURL(formData.logo)}
                    alt="Brand Logo Preview"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, logo: null })}
                    className="text-red-500 text-sm mt-2 block"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="item up-load">
                  <label className="uploadfile" htmlFor="myFile">
                    <span className="icon">
                      <i className="icon-upload-cloud" />
                    </span>
                    <span className="text-tiny">
                      Drop your logo here or{" "}
                      <span className="tf-color">click to browse</span>
                    </span>
                    <input
                      type="file"
                      id="myFile"
                      name="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </label>
                </div>
              )}
            </div>
            {errors.logo && (
              <div className="text-tiny text-danger">{errors.logo[0]}</div>
            )}
          </fieldset>

          <div className="cols gap10">
            <button className="tf-button w-full" type="submit">
              {loading ? "Saving branding..." : "Add brand"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
