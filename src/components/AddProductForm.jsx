import Cookies from "js-cookie";
import { useState } from "react";
import GetDiscount from "./GetDiscount";
import GetCategory from "./GetCategory";
import BrandOptions from "./BrandOptins";

export default function AddProductForm() {
  const sizeOptions = [
    // Standard sizes
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",

    // Petite sizes
    "P-XS",
    "P-S",
    "P-M",
    "P-L",
    "P-XL",

    // Tall sizes
    "T-XS",
    "T-S",
    "T-M",
    "T-L",
    "T-XL",
    "T-XXL",

    // Plus sizes
    "0X",
    "1X",
    "2X",
    "3X",
    "4X",

    // Numeric sizes (common for pants/dresses)
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
    "48",

    // Alpha-numeric combinations
    "XS/S",
    "M/L",
    "L/XL",

    // Standardized sizing
    "One Size",
    "OSFA",

    // Age-based sizing
    "Newborn",
    "3-6M",
    "6-12M",
    "12-18M",
    "18-24M",
    "2T",
    "3T",
    "4T",
    "5T",

    // European sizes
    "EU 32",
    "EU 34",
    "EU 36",
    "EU 38",
    "EU 40",
    "EU 42",
    "EU 44",
    "EU 46",
    "EU 48",

    // UK sizes
    "UK 4",
    "UK 6",
    "UK 8",
    "UK 10",
    "UK 12",
    "UK 14",
    "UK 16",
    "UK 18",
    "UK 20",

    // Asian sizes
    "Asian S",
    "Asian M",
    "Asian L",

    // Custom options
    "Made-to-Measure",
    "Bespoke",
    "Custom",
  ];

  const fitTypes = [
    // Basic fits
    "Regular Fit",
    "Slim Fit",
    "Loose Fit",
    "Relaxed Fit",
    "Tailored Fit",
    "Skinny Fit",
    "Oversized Fit",

    // Women-specific fits
    "Fitted",
    "Bodycon",
    "A-Line",
    "Empire Waist",
    "Peplum",
    "Sheath",
    "Shift",

    // Men-specific fits
    "Classic Fit",
    "Modern Fit",
    "Athletic Fit",
    "Muscle Fit",
    "Comfort Fit",

    // Jeans/Pants fits
    "Straight Leg",
    "Bootcut",
    "Flared",
    "Wide Leg",
    "Tapered",
    "Cropped",
    "Cigarette",
    "Mom Fit",
    "Dad Fit",

    // Specialized fits
    "Asymmetrical",
    "Draped",
    "Drop Shoulder",
    "Boxy",
    "High Waisted",
    "Low Waisted",
    "Mid Rise",

    // Custom/other
    "Made-to-Measure",
    "Unisex Fit",
    "Maternity Fit",
    "Petite Fit",
    "Tall Fit",
    "Plus Size Fit",
    "custom",
  ];

  const [formData, setFormData] = useState({
    product_name: "",
    category: [],
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
    colors: ["#ffffff"],
    material: "",
    fit_type: [],
    custom_fit_type: [],
    size: [],
    custom_size: [],
    gallery: [],
    featured: false,
    discount: "",
    barcode: "",
    weight: "",
    dimensions: "",
    storage: "",
    display_in_hero: false,
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
    const { name, value, type, checked, files, options, multiple } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "gallery") {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...Array.from(files)],
      }));
    } else if (multiple) {
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
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

  // Handle individual color change
  const handleColorChange = (e, index) => {
    const newColors = [...formData.colors];
    newColors[index] = e.target.value;
    setFormData({ ...formData, colors: newColors });
  };

  // Add new color picker
  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, "#000000"] });
  };

  // Remove a color
  const removeColor = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
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
      const apiBase = import.meta.env.VITE_API_URL;

      const csrfResponse = await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      if (!csrfResponse.ok) {
        throw new Error("Failed to fetch CSRF token");
      }

      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const form = new FormData();

      // Merge custom_fit_type (if not empty) into fit_type
      const customFitTypes = formData.custom_fit_type
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const mergedFitTypes = Array.from(
        new Set([...formData.fit_type, ...customFitTypes])
      );

      // Prepare form data for submission
      for (const [key, value] of Object.entries({
        ...formData,
        fit_type: mergedFitTypes,
      })) {
        if (key === "gallery") {
          value.forEach((file) => form.append("gallery[]", file));
        } else if (Array.isArray(value)) {
          value.forEach((item) => form.append(`${key}[]`, item));
        } else {
          form.append(key, value);
        }
      }

      const response = await fetch(`${apiBase}/api/add-product`, {
        method: "POST",
        headers: {
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          Accept: "application/json",
        },
        credentials: "include",
        body: form,
      });

      console.log(response);

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrors({ general: data.message || "An error occurred" });
      } else {
        setFormData({
          product_name: "",
          category: [],
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
          colors: ["#ffffff"],
          material: "",
          fit_type: [],
          custom_fit_type: [],
          size: [],
          custom_size: [],
          gallery: [],
          featured: "",
          discount: "",
          barcode: "",
          weight: "",
          dimensions: "",
          storage: "",
        });
        setSuccessMessage(data.message);
        setTimeout(() => setSuccessMessage(""), 3500);
      }
    } catch (err) {
      setErrors({ general: err.message });
      console.log(err);
      setTimeout(() => setErrors({}), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errors.general && (
        <p id="error-message" className="alert alert-danger md-5">
          {errors.general}
        </p>
      )}
      {successMessage && (
        <p className="alert alert-success"> {successMessage} </p>
      )}
      <form
        className="tf-section-2 form-add-product"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
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
              autoComplete="off"
              onChange={handleChange}
            ></input>
            {errors.product_name && (
              <div className="text-tiny text-danger">
                {errors.product_name[0]}
              </div>
            )}
          </fieldset>

          <GetCategory
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          ></GetCategory>

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
                <select
                  name="gender"
                  value={formData.gender} // bind it to state
                  onChange={handleChange} // update state when changed
                  className=""
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <div className="text-tiny text-danger">{errors.gender[0]}</div>
              )}
            </fieldset>

            <BrandOptions
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            ></BrandOptions>
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
                autoComplete="off"
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
                autoComplete="off"
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
                Weight <span className="tf-color-1">(Optional)</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="1.5kg"
                name="weight"
                tabIndex="0"
                value={formData.weight}
                aria-required="true"
                onChange={handleChange}
                autoComplete="off"
              ></input>
              {errors.weight && (
                <div className="text-tiny text-danger">{errors.weight[0]}</div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Dimensions <span className="tf-color-1">(Optional)</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="90 x 60 x 90 cm"
                name="dimensions"
                tabIndex="0"
                value={formData.dimensions}
                aria-required="true"
                onChange={handleChange}
              ></input>
              {errors.dimensions && (
                <div className="text-tiny text-danger">
                  {errors.dimensions[0]}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Storage <span className="tf-color-1">(Optional)</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder=""
                name="storage"
                tabIndex="0"
                value={formData.storage}
                aria-required="true"
                onChange={handleChange}
                autoComplete="off"
              ></input>
              {errors.storage && (
                <div className="text-tiny text-danger">{errors.storage[0]}</div>
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
                  multiple
                  value={formData.size}
                  onChange={handleChange}
                >
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {formData.size.includes("Custom") && (
                <div className="custom-sizes">
                  <div className="row g-3">
                    {formData.custom_size.map((cs, i) => (
                      <div
                        key={i}
                        className="col-md-6"
                        // className="col-xl-3 col-lg-4 col-md-6 col-sm-6" // Adjusted for 4 items per row on xl screens
                        style={{ position: "relative" }}
                      >
                        <input
                          type="text"
                          placeholder={`Size ${i + 1}`}
                          value={cs}
                          onChange={(e) => {
                            const updated = [...formData.custom_size];
                            updated[i] = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              custom_size: updated,
                            }));
                          }}
                          className="form-control"
                          style={{
                            minWidth: "100%", // Ensure inputs take full width of their container
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formData.custom_size];
                            updated.splice(i, 1);
                            setFormData((prev) => ({
                              ...prev,
                              custom_size: updated,
                            }));
                          }}
                          className="btn btn-link p-0 position-absolute top-50 end-0 translate-middle-y"
                          style={{
                            color: "red",
                            fontSize: "1rem",
                            right: "15px",
                          }}
                          title="Remove"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        custom_size: [...prev.custom_size, ""],
                      }))
                    }
                    className="btn btn-primary mt-3"
                    style={{
                      padding: "0.5rem 1.25rem",
                      fontSize: "1rem",
                    }}
                  >
                    + Add Another Custom Size
                  </button>
                </div>
              )}
              {errors.size && (
                <div className="text-tiny text-danger">{errors.size[0]}</div>
              )}
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Colors <span className="tf-color-1">*</span>
              </div>

              {formData.colors.map((color, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-3 mb-2"
                >
                  <input
                    type="color"
                    name={`colors[${index}]`}
                    value={color}
                    onChange={(e) => handleColorChange(e, index)}
                    autoComplete="off"
                  />
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor:
                        color === "#ffffff" && index === 0
                          ? "transparent"
                          : color,
                      backgroundImage:
                        color === "#ffffff" && index === 0
                          ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)"
                          : "none",
                      backgroundSize: "10px 10px",
                      backgroundPosition: "0 0, 5px 5px",
                    }}
                  ></div>

                  {/* Allow removing colors except the first */}
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeColor(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-sm btn-primary mt-2"
                onClick={addColor}
              >
                Add Another Color
              </button>

              {errors.colors && (
                <div className="text-tiny text-danger">{errors.colors}</div>
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

            <GetDiscount
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            ></GetDiscount>

            <fieldset className="name">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select mb-10">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select product status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              {errors.status && (
                <div className="text-tiny text-danger">{errors.status[0]}</div>
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
                autoComplete="off"
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
                  multiple
                  value={formData.fit_type}
                  onChange={handleChange}
                >
                  {fitTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show custom input button and fields only when 'custom' is selected */}
              {formData.fit_type.includes("custom") && (
                <div className="custom-fit-types">
                  <div className="row g-3">
                    {formData.custom_fit_type.map((cft, i) => (
                      <div
                        key={i}
                        className="col-md-6"
                        style={{ position: "relative" }}
                      >
                        <input
                          type="text"
                          placeholder={`Custom Fit Type ${i + 1}`}
                          value={cft}
                          onChange={(e) => {
                            const updated = [...formData.custom_fit_type];
                            updated[i] = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              custom_fit_type: updated,
                            }));
                          }}
                          className="form-control"
                          style={{ minWidth: "100%" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formData.custom_fit_type];
                            updated.splice(i, 1);
                            setFormData((prev) => ({
                              ...prev,
                              custom_fit_type: updated,
                            }));
                          }}
                          className="btn btn-link p-0 position-absolute top-50 end-0 translate-middle-y"
                          style={{
                            color: "red",
                            fontSize: "1rem",
                            right: "15px",
                          }}
                          title="Remove"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        custom_fit_type: [...prev.custom_fit_type, ""],
                      }))
                    }
                    className="btn btn-primary mt-3"
                    style={{ padding: "0.5rem 1.25rem", fontSize: "1rem" }}
                  >
                    + Add Another Custom Fit Type
                  </button>
                </div>
              )}

              {errors.fit_type && (
                <div className="text-tiny text-danger">
                  {errors.fit_type[0]}
                </div>
              )}
            </fieldset>
          </div>

          <fieldset className="name">
            <div className="body-title mb-10">
              Barcode <span className="tf-color-1">(Optional)</span>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter product barcode"
              name="barcode"
              tabIndex="0"
              value={formData.barcode}
              aria-required="true"
              onChange={handleChange}
            ></input>
            {errors.barcode && (
              <div className="text-tiny text-danger">{errors.barcode[0]}</div>
            )}
          </fieldset>

          <div className="gap22 cols">
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
                    value="1"
                  />
                  <span className="text-tiny">
                    Mark this product as featured
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Display in hero? <span className="tf-color-1"></span>
              </div>
              <div className="select mb-10">
                <label className="flex items-center gap-2">
                  <input
                    className="total-checkbox"
                    type="checkbox"
                    name="display_in_hero"
                    checked={formData.display_in_hero}
                    onChange={handleChange}
                    value="1"
                  />
                  <span className="text-tiny">
                    Mark this product to be displayed in the hero
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="cols gap10">
            <button
              className="tf-button w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving Product..." : "Add product"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
