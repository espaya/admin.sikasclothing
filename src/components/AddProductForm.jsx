import Cookies from "js-cookie";
import { useState } from "react";

export default function AddProductForm() {
  const sizeOptions = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "4XL",
    "Custom",
  ];

  const brandOptions = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Other"];

  const categories = [
    "Shop",
    "Product",
    "Services",
    "Electronics",
    "Clothing",
    "Automobiles",
  ];

  const fitTypes = [
    "Regular",
    "Slim",
    "Loose",
    "Relaxed",
    "Tailored",
    "Skinny",
    "Oversized",
  ];

  const [formData, setFormData] = useState({
    product_name: "",
    category: "",

    tags: [],
    gender: "",
    brand: "",
    custom_brand: "",
    description: "",
    price: "",
    sale_price: "",
    stock_quantity: "",
    stock_status: "",
    status: "",
    color: "",
    material: "",
    fit_type: "",
    size: "",
    custom_size: "",
    gallery: [],
    featured: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "gallery") {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...files] }));
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = Cookies.get("XSRF-TOKEN");

      const form = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "gallery") {
          value.forEach((file) => form.append("gallery[]", file));
        } else {
          form.append(key, value);
        }
      }

      const response = await fetch(`${apiBase}/api/add-product`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
        credentials: "include",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrors({ general: data.message || "An error occurred" });
      } else {
        setFormData({
          product_name: "",
          category: "",

          tags: [],
          gender: "",
          brand: "",
          custom_brand: "",
          description: "",
          price: "",
          sale_price: "",
          stock_quantity: "",
          stock_status: "",
          status: "",
          color: "",
          material: "",
          fit_type: "",
          size: "",
          custom_size: "",
          gallery: [],
          featured: false,
        });
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({}), 3500);
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
      <form className="tf-section-2 form-add-product" onSubmit={handleSubmit}>
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Product name <span className="tf-color-1">*</span>
            </div>
            <input
              className={`mb-10 ${errors.product_name ? "is-invalid" : ""}`}
              type="text"
              placeholder="Enter product name"
              name="product_name"
              tabIndex="0"
              value={formData.product_name}
              aria-required="true"
              onChange={handleChange}
            ></input>
            {errors.product_name && (
              <div className="text-tiny text-danger">
                {errors.product_name[0]}
              </div>
            )}
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Category <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select
                  name="category"
                  className=""
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Choose category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <div className="text-tiny text-danger">
                  {errors.category[0]}
                </div>
              )}
            </fieldset>
          </div>

          <div className="gap22 cols">
            
            <fieldset className="name">
              <div className="body-title mb-10">
                Tags <span className="tf-color-1">*</span>
              </div>

              <div className="tag-input-container mb-10">
                <div className="tags flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      style={{ fontSize: "16px" }}
                      key={index}
                      className="inline-flex items-center bg-gray-200 text-sm px-2 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        href="#"
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 text-red-500 hover:text-red-700 text-xs leading-none px-1 py-0"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="mb-10"
                  placeholder="Enter a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>

              {errors.tags && (
                <div className="text-tiny text-danger">{errors.tags[0]}</div>
              )}
            </fieldset>
          </div>

          <div className="gap22 cols">
            <fieldset className="male">
              <div className="body-title mb-10">
                Gender <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select name="gender" className="">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Unisex</option>
                  <option>Other</option>
                </select>
              </div>
              {errors.gender && (
                <div className="text-tiny text-danger">{errors.gender[0]}</div>
              )}
            </fieldset>
            <fieldset className="brand">
              <div className="body-title mb-10">
                Brand <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select
                  name="brand"
                  className=""
                  value={formData.brand}
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>
                  {brandOptions.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {formData.brand === "Other" && (
                <input
                  type="text"
                  name="custom_brand"
                  placeholder="Enter custom brand"
                  value={formData.custom_brand || ""}
                  onChange={handleChange}
                  className="mt-2"
                />
              )}
              {errors.brand && (
                <div className="text-tiny text-danger">{errors.brand[0]}</div>
              )}
            </fieldset>
          </div>
          <fieldset className="description">
            <div className="body-title mb-10">
              Description <span className="tf-color-1">*</span>
            </div>
            <textarea
              className="mb-10"
              name="description"
              placeholder="Description"
              tabIndex="0"
              aria-required="true"
              onChange={handleChange}
              value={formData.description}
            ></textarea>
            {errors.description && (
              <div className="text-tiny text-danger">
                {errors.description[0]}
              </div>
            )}
          </fieldset>

          <hr></hr>

          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Product price <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter product price"
                name="price"
                tabIndex="0"
                value={formData.price}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.price && (
                <div className="text-tiny text-danger">{errors.price[0]}</div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Sale price <span className="tf-color-1">(Optional)</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter product price"
                name="sale_price"
                tabIndex="0"
                value={formData.sale_price}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.sale_price && (
                <div className="text-tiny text-danger">
                  {errors.sale_price[0]}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Quantity in Stock <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter product price"
                name="stock_quantity"
                tabIndex="0"
                value={formData.stock_quantity}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.stock_quantity && (
                <div className="text-tiny text-danger">
                  {errors.stock_quantity[0]}
                </div>
              )}
            </fieldset>
          </div>

          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Stock Status <span className="tf-color-1">*</span>
              </div>
              <div className="select mb-10">
                <select
                  name="stock_status"
                  value={formData.stock_status}
                  onChange={handleChange}
                >
                  <option value="">Select stock status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="backorder">Backorder</option>
                </select>
              </div>
              {errors.stock_status && (
                <div className="text-tiny text-danger">
                  {errors.stock_status[0]}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select mb-10">
                <select
                  name="stock_status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select product status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              {errors.status && (
                <div className="text-tiny text-danger">{errors.status[0]}</div>
              )}
            </fieldset>
          </div>
        </div>

        <div className="wg-box">
          <fieldset>
            <div className="body-title mb-10">Upload images</div>
            <div
              className="upload-image mb-16"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {formData.gallery.map((file, index) => (
                <div
                  className="item"
                  key={index}
                  style={{ position: "relative" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      // background: "#fff",
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

            <div className="body-text">
              You need to add at least 4 images. Pay attention to the quality of
              the pictures you add, comply with the background color standards.
              Pictures must be in certain dimensions. Notice that the product
              shows all the details
            </div>
            {errors.gallery && (
              <div className="text-tiny text-danger">{errors.gallery[0]}</div>
            )}
          </fieldset>
          <div className="cols gap22">
            <fieldset className="name">
              <div className="body-title mb-10">Add size</div>
              <div className="select mb-10">
                <select
                  name="size"
                  className=""
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {formData.size === "Custom" && (
                <input
                  type="text"
                  name="custom_size"
                  className="mt-2"
                  placeholder="Enter custom size"
                  value={formData.custom_size || ""}
                  onChange={handleChange}
                />
              )}
              {errors.size && (
                <div className="text-tiny text-danger">{errors.size[0]}</div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Color <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter product color"
                name="color"
                tabIndex="0"
                value={formData.color}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.color && (
                <div className="text-tiny text-danger">{errors.color[0]}</div>
              )}
            </fieldset>
          </div>

          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Material <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter product material"
                name="material"
                tabIndex="0"
                value={formData.material}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.material && (
                <div className="text-tiny text-danger">
                  {errors.material[0]}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">Fit Type</div>
              <div className="select mb-10">
                <select
                  name="fit_type"
                  className=""
                  value={formData.fit_type}
                  onChange={handleChange}
                >
                  <option value="">Select Fit Type</option>
                  {fitTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {errors.fit_type && (
                <div className="text-tiny text-danger">
                  {errors.fit_type[0]}
                </div>
              )}
            </fieldset>
          </div>

          <fieldset className="name">
            <div className="body-title mb-10">
              Featured <span className="tf-color-1"></span>
            </div>
            <div className="select mb-10">
              <label className="flex items-center gap-2">
                <input
                  className="total-checkbox"
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span className="text-tiny">Mark this product as featured</span>
              </label>
            </div>
          </fieldset>

          <div className="cols gap10">
            <button
              className="tf-button w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving Product..." : "Add product"}
            </button>
            <button className="tf-button style-1 w-full" type="submit">
              Save product
            </button>
            <a href="#" className="tf-button style-2 w-full">
              Schedule
            </a>
          </div>
        </div>
      </form>
    </>
  );
}
