import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import getSingleBrand from "../../controllers/GetSingleBrand";

export default function EditBrandForm() {
  const { slug } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;

  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    description: "",
    status: "",
    is_featured: false,
    website: "",
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // handle text/select/checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle logo upload (click)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // handle drag and drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, logo: file }));
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const changedFields = new FormData();

      // Always send required fields
      changedFields.append("name", formData.name);
      changedFields.append("status", formData.status);

      // Send changed optional fields only
      Object.keys(formData).forEach((key) => {
        if (["name", "status", "logo"].includes(key)) return;
        if (formData[key] !== initialData[key] && formData[key] != null) {
          changedFields.append(key, formData[key]);
        }
      });

      // Only append logo if new file is chosen
      if (formData.logo && formData.logo !== initialData.logo) {
        changedFields.append("logo", formData.logo);
      }

      const response = await fetch(`${apiBase}/api/update-brand/${slug}`, {
        method: "POST",
        credentials: "include",
        body: changedFields,
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

      setSuccessMessage(data.message);
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({ general: "" }), 3500);
    } finally {
      setLoading(false);
    }
  };

  // load brand data
  useEffect(() => {
    getSingleBrand(
      setLoading,
      setErrors,
      (brandData) => {
        setInitialData(brandData);
        setFormData({
          name: brandData.name || "",
          logo: null,
          description: brandData.description || "",
          status: brandData.status || "",
          is_featured: !!brandData.is_featured,
          website: brandData.website || "",
        });
        if (brandData.logo) {
          setPreviewLogo(`${apiBase}/storage/${brandData.logo}`);
        }
      },
      apiBase,
      slug
    );
  }, [slug]);

  return (
    <>
      {errors.general && <p className="text-danger">{errors.general}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="tf-section-2 form-add-product">
        <div className="wg-box">
          <div className="gap22 cols">
            {/* Brand Name */}
            <fieldset className="name">
              <div className="body-title mb-10">
                Name <span className="tf-color-1">*</span>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter brand name"
              />
              {errors.name && (
                <div className="text-tiny text-danger">{errors.name[0]}</div>
              )}
            </fieldset>

            {/* Status */}
            <fieldset className="category">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Choose status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <div className="text-tiny text-danger">{errors.status[0]}</div>
              )}
            </fieldset>
          </div>

          {/* Website */}
          <fieldset>
            <div className="body-title mb-10">Website</div>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
            {errors.website && (
              <div className="text-tiny text-danger">{errors.website[0]}</div>
            )}
          </fieldset>

          {/* Description */}
          <fieldset>
            <div className="body-title mb-10">Description</div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brand description"
            />
          </fieldset>

          {/* Featured Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
            />
            <span>Mark as featured</span>
          </label>
        </div>

        {/* Logo Upload */}
        <div className="wg-box">
          <fieldset>
            <div className="body-title mb-10">
              Brand Logo <span className="tf-color-1">*</span>
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
              {previewLogo ? (
                <div className="item">
                  <img
                    src={previewLogo}
                    alt="Brand Logo"
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, logo: null }));
                      setPreviewLogo(null);
                    }}
                    className="text-red-500 text-sm mt-2 block"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label htmlFor="logoUpload" className="uploadfile">
                  <i className="icon-upload-cloud" />
                  <span className="text-tiny">
                    Drop logo here or{" "}
                    <span className="tf-color">click to browse</span>
                  </span>
                  <input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
            {errors.logo && (
              <div className="text-tiny text-danger">{errors.logo[0]}</div>
            )}
          </fieldset>

          {/* Submit Button */}
          <button className="tf-button w-full" type="submit" disabled={loading}>
            {loading ? "Updating Brand..." : "Update Brand"}
          </button>
        </div>
      </form>
    </>
  );
}
