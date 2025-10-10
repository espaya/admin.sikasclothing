import { useState } from "react";

export default function FeaturedImage({
  handleOnChange,
  errors,
  formData,
  setFormData,
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        featured_image: file,
      }));

      if (handleOnChange) {
        handleOnChange({ target: { name: "featured_image", files: [file] } });
      }
    }
  };

  const handleRemove = () => {
    setFormData((prev) => ({
      ...prev,
      featured_image: null,
    }));
  };

  return (
    <>
      <fieldset>
        <div className="body-title mb-10">Featured Image</div>

        <div
          className="upload-image mb-16"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {!formData.featured_image ? (
            <label
              className="uploadfile cursor-pointer"
              htmlFor="featuredImage"
            >
              <span className="icon">
                <i className="icon-upload-cloud"></i>
              </span>
              <span className="text-tiny">
                Drop your image here or{" "}
                <span className="tf-color">click to browse</span>
              </span>
              <input
                type="file"
                id="featuredImage"
                name="featured_image"
                accept="image/*"
                className="hidden"
                onChange={handleOnChange}
              />
            </label>
          ) : (
            <div className="relative inline-block">
              <img
                src={URL.createObjectURL(formData.featured_image)}
                alt="Preview"
                className="max-h-48 mx-auto rounded shadow"
              />
              <button
                type="button"
                onClick={handleRemove}
                style={{backgroundColor: "red"}}
                className="absolute top-2 right-2 text-white rounded-full px-2 py-1 text-xs shadow"
              >
                ×
              </button>

              <p className="text-xs text-gray-500 mt-2">
                Drag & drop here to replace the image
              </p>
            </div>
          )}
        </div>
        {errors.featured_image && (
          <div className="text-tiny text-danger">
            {errors.featured_image[0]}
          </div>
        )}
      </fieldset>
    </>
  );
}
