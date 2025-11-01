import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import getSingleCategory from "../controllers/GetSingleCategory";
import { useParams } from "react-router-dom";

export default function EditCategoryForm() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    is_featured: false,
    image: null, // can be file or string (existing filename)
    parent_id: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const apiBase = import.meta.env.VITE_API_URL;

  const parentCategories = [
    { id: 1, name: "Men's Clothing" },
    { id: 2, name: "Women's Clothing" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Home & Garden" },
  ];

  // Handle field changes
  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));

    if (type === "file" && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  // Handle drag & drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const formPayload = new FormData();
      for (const key in formData) {
        // Only append image if it's a File (not a string)
        if (key === "image" && typeof formData.image === "string") continue;
        formPayload.append(key, formData[key]);
      }

      const response = await fetch(`${apiBase}/api/update-category/${slug}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        credentials: "include",
        body: formPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message || "Error occurred" });
      } else {
        setSuccessMessage(data.message || "Category updated successfully");
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Fetch category details
  useEffect(() => {
    getSingleCategory(setLoading, setErrors, apiBase, setCategory, slug);
  }, [slug]);

  // Apply category data to form when loaded
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        status: category.status || "",
        is_featured:
          category.is_featured === 1 || category.is_featured === true,
        image: category.image || null,
        parent_id: category.parent_id || "",
      });

      // Set preview to existing image URL if present
      if (category.image) {
        setPreview(`${apiBase}/storage/${category.image}`);
      }
    }
  }, [category]);

  return (
    <div className="wg-box">
      {errors.general && (
        <p id="error-message" className="text-danger mb-5">
          {errors.general}
        </p>
      )}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="tf-section-2 form-add-product">
        <div className="wg-box">
          {/* Category Name */}
          <fieldset className="name">
            <div className="body-title mb-10">
              Category name <span className="tf-color-1">*</span>
            </div>
            <input
              className="flex-grow"
              type="text"
              placeholder="Category name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            {errors.name && (
              <div className="text-tiny text-danger mt-4">{errors.name[0]}</div>
            )}
          </fieldset>

          {/* Status + Parent Category */}
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {errors.status && (
                <div className="text-tiny text-danger mt-4">
                  {errors.status[0]}
                </div>
              )}
            </fieldset>

            <fieldset className="parent">
              <div className="body-title mb-10">Parent Category</div>
              <div className="select">
                <select
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                >
                  <option value="">None (Top-level)</option>
                  {parentCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>

          {/* Featured */}
          <fieldset className="brand">
            <legend className="body-title mb-2">Featured</legend>
            <div className="select flex-grow">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                />
                <p className="text">Mark as featured</p>
              </label>
            </div>
            {errors.is_featured && (
              <div className="text-tiny text-danger mt-5">
                {errors.is_featured[0]}
              </div>
            )}
          </fieldset>

          {/* Description */}
          <fieldset className="description">
            <div className="body-title mb-10">
              Description <span className="tf-color-1">*</span>
            </div>
            <textarea
              className="flex-grow"
              name="description"
              placeholder="Category description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <div className="text-tiny text-danger mt-5">
                {errors.description[0]}
              </div>
            )}
          </fieldset>

          <div className="cols gap10">
            <button
              className="tf-button w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating Category..." : "Update Category"}
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div className="wg-box">
          <fieldset>
            <div className="body-title mb-10">Upload image</div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  setFormData((prev) => ({ ...prev, image: file }));
                  setPreview(URL.createObjectURL(file));
                }
              }}
              onClick={() => document.getElementById("fileInput").click()}
              className="item up-load"
              style={{
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <label className="uploadfile text-center">
                <span className="icon">
                  <i className="icon-upload-cloud"></i>
                </span>
                <span className="text-tiny">
                  Drag & drop an image here or{" "}
                  <span className="tf-color">click to browse</span>
                </span>
                <input
                  type="file"
                  id="fileInput"
                  name="image"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, image: file }));
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            {preview && (
              <div className="preview mb-4 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-xs max-h-48 object-contain rounded mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, image: null }));
                    document.getElementById("fileInput").value = null;
                  }}
                  className="mt-2 text-red-600 text-sm underline hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            )}

            {errors.image && (
              <div className="text-tiny text-danger text-center mt-1">
                {errors.image[0]}
              </div>
            )}
          </fieldset>
        </div>
      </form>
    </div>
  );
}
