import { useState } from "react";

export default function EditGallery({
  handleDrop,
  handleDragOver,
  formData,
  handleChange,
  handleRemoveImage,
  apiBase,
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : formData.gallery.length - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev < formData.gallery.length - 1 ? prev + 1 : 0
    );
  };

  const getImageSrc = (file) =>
    typeof file === "string"
      ? `${apiBase}/storage/${file}`
      : URL.createObjectURL(file);

  return (
    <>
      <div
        className="upload-image mb-16"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {formData.gallery.map((file, index) => (
          <div className="item" key={index} style={{ position: "relative" }}>
            <img
              onClick={() => handleOpenLightbox(index)}
              style={{
                objectFit: "cover",
                width: "120px",
                height: "120px",
                cursor: "pointer",
                borderRadius: "8px",
              }}
              src={getImageSrc(file)}
              alt={`Preview ${index}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold",
                color: "red",
                width: "24px",
                height: "24px",
              }}
              title="Remove image"
            >
              ✖
            </button>
          </div>
        ))}

        <div className="item up-load">
          <label className="uploadfile" htmlFor="myFile">
            <span className="icon">
              <i className="icon-upload-cloud"></i>
            </span>
            <span className="text-tiny">
              Drop your images here or select{" "}
              <span className="tf-color">click to browse</span>
            </span>
            <input
              type="file"
              id="myFile"
              name="gallery"
              onChange={handleChange}
              multiple
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* ✅ Lightbox Overlay with Arrows */}
      {lightboxIndex !== null && (
        <div
          onClick={handleCloseLightbox}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            transition: "all 0.3s ease",
          }}
        >
          {/* Left Arrow */}
          <button
          type="button"
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "30px",
              fontSize: "2rem",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            title="Previous"
          >
            ❮
          </button>

          {/* Image */}
          <img
            src={getImageSrc(formData.gallery[lightboxIndex])}
            alt="Preview"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          />

          {/* Right Arrow */}
          <button
          type="button"
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "2rem",
              color: "#fff",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            title="Next"
          >
            ❯
          </button>
        </div>
      )}
    </>
  );
}
