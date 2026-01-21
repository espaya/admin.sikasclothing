import { useState, useEffect } from "react";

export default function FeaturedImage({ formData, setFormData, errors }) {
  const [dragActive, setDragActive] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL; // e.g., http://localhost:8000

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        featured_image: file, // store the new file
      }));
    }
  };

  // Remove the image
  const handleRemove = () => {
    setFormData((prev) => ({
      ...prev,
      featured_image: null,
    }));
  };

  // Generate the preview URL
  const imagePreview = (() => {
    if (!formData.featured_image) return null;

    // New uploaded file
    if (formData.featured_image instanceof File) {
      return URL.createObjectURL(formData.featured_image);
    }

    // Existing image from API
    // Remove any leading 'storage/' to avoid double path
    const cleanPath = formData.featured_image.replace(/^\/?storage\//, "");
    return `${apiBase}/storage/${cleanPath}`;
  })();

  return (
    <fieldset>
      <div className="body-title mb-10">Featured Image</div>

      <div
        className={`upload-image mb-16 ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!imagePreview ? (
          <label className="uploadfile cursor-pointer" htmlFor="featuredImage">
            <span className="icon">
              <i className="icon-upload-cloud"></i>
            </span>
            <span className="text-tiny">
              Drop image here or{" "}
              <span className="tf-color">click to browse</span>
            </span>
            <input
              type="file"
              id="featuredImage"
              name="featured_image"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  featured_image: e.target.files[0],
                }))
              }
            />
          </label>
        ) : (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Featured preview"
              className="max-h-48 mx-auto rounded shadow"
            />

            <button
              type="button"
              onClick={handleRemove}
              style={{ backgroundColor: "#FF0000" }} // pure red
              className="absolute top-2 right-2 text-white rounded-full px-2 py-1 text-xs shadow"
            >
              ×
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Drag & drop to replace image
            </p>
          </div>
        )}
      </div>

      {errors.featured_image && (
        <div className="text-tiny text-danger">{errors.featured_image[0]}</div>
      )}
    </fieldset>
  );
}
