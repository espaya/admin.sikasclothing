import { useState } from "react";
import Cookies from "js-cookie";
import { useCallback } from "react";

export default function AddCategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    is_featured: false,
    image: null,
    parent_id: "",
  });

  const [preview, setPreview] = useState(null); // preview image
  const parentCategories = [
    { id: 1, name: "Men's Clothing" },
    { id: 2, name: "Women's Clothing" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Home & Garden" },
  ];

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      const response = await fetch(`${apiBase}/api/add-category`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
        credentials: "include",
        body: formPayload,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        setErrors(data.errors || { general: data.message || "Error" });
      } else {
        setFormData({
          name: "",
          description: "",
          status: "",
          is_featured: false,
          image: null,
          parent_id: "",
        });
        setPreview(null);
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({ general: "" }), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wg-box">
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
          <fieldset className="name">
            <div className="body-title mb-10">
              Category name <span className="tf-color-1">*</span>
            </div>
            <input
              className="flex-grow"
              type="text"
              placeholder="Category name"
              name="name"
              tabIndex={0}
              value={formData.name}
              onChange={handleChange}
              aria-required="true"
              autoComplete="off"
            ></input>
            {errors.name && (
              <div className="text-tiny text-danger mt-4">
                {" "}
                {errors.name[0]}{" "}
              </div>
            )}
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select
                  name="status"
                  value={formData.status}
                  className=""
                  onChange={handleChange}
                >
                  <option>Choose status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              {errors.status && (
                <div className="text-tiny text-danger mt-4">
                  {" "}
                  {errors.status[0]}{" "}
                </div>
              )}
            </fieldset>
            <fieldset className="male">
              <div className="body-title mb-10">
                Parent Category <span className="tf-color-1"></span>
              </div>
              <div className="select">
                <select
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                >
                  <option value="">None (Top-level)</option>
                  {parentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>
          <fieldset className="brand">
            <legend className="body-title mb-2">
              Featured <span className="tf-color-1"></span>
            </legend>
            <div className="select flex-grow">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="total-checkbox"
                />
                <p className="text">Mark as featured</p>
              </label>
            </div>
          </fieldset>

          <fieldset className="description">
            <div className="body-title mb-10">
              Description <span className="tf-color-1">*</span>
            </div>
            <textarea
              className="flex-grow"
              type="text"
              placeholder="Category description"
              name="description"
              tabIndex={0}
              value={formData.description}
              onChange={handleChange}
              aria-required="true"
            ></textarea>
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
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

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
              }}
            >
              <label className="uploadfile">
                <span class="icon">
                  <i class="icon-upload-cloud"></i>
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
