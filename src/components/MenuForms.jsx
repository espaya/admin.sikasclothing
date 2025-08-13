import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function MenuForms() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [formData, setFormData] = useState({
    title: "",
    source_type: "",
    source_id: "",
    custom_item: "",
    custom_url: "",
    location: "",
    parent_id: "",
    order: "",
    is_active: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(`${apiBase}/api/get-category`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setCategories(data.data);
        }
      } catch (err) {
        setErrors({ general: err });
        setTimeout(() => setErrors({ general: "" }), 3500);
      }
    };
    fetchCategories();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      const response = await fetch(`${apiBase}/api/add-menu`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
      } else {
        setFormData({
          title: "",
          source_type: "",
          source_id: "",
          custom_item: "",
          custom_url: "",
          location: "",
          parent_id: "",
          order: "",
          is_active: "",
        });

        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          timer: 3500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="tf-section-2 form-add-product">
      <div className="wg-box">
        <div className="gap22 cols">
          <fieldset className="name">
            <label className="body-title mb-10">
              Title <span className="tf-color-1">*</span>
            </label>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter menu title"
              name="title"
              value={formData.title}
              onChange={handleOnChange}
              autoComplete="off"
            />
            {errors.title && (
              <div className="text-tiny text-danger">{errors.title[0]}</div>
            )}
          </fieldset>

          <fieldset className="category">
            <label className="body-title mb-10">
              Source Type <span className="tf-color-1">*</span>
            </label>
            <div className="select">
              <select
                name="source_type"
                value={formData.source_type}
                onChange={handleOnChange}
              >
                <option value="">Choose source type</option>
                <option value="category">Category</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            {errors.source_type && (
              <div className="text-tiny text-danger mt-4">
                {errors.source_type[0]}
              </div>
            )}
          </fieldset>
        </div>

        {formData.source_type === "category" && (
          <fieldset className="category mt-3">
            <label className="body-title mb-10">
              Category <span className="tf-color-1">*</span>
            </label>
            <div className="select">
              <select
                name="source_id"
                value={formData.source_id}
                onChange={handleOnChange}
              >
                <option value="">Choose category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.source_id && (
              <div className="text-tiny text-danger mt-4">
                {errors.source_id[0]}
              </div>
            )}
          </fieldset>
        )}

        {formData.source_type === "custom" && (
          <div className="gap22 cols mt-3">
            <fieldset className="name">
              <label className="body-title mb-10">
                Custom item <span className="tf-color-1">*</span>
              </label>
              <input
                className="mb-10"
                type="text"
                name="custom_item"
                value={formData.custom_item}
                onChange={handleOnChange}
                placeholder="Enter custom menu title"
                autoComplete="off"
              />
              {errors.custom_item && (
                <div className="text-tiny text-danger">
                  {errors.custom_item[0]}
                </div>
              )}
            </fieldset>

            <fieldset className="name">
              <label className="body-title mb-10">
                Custom URL <span className="tf-color-1">*</span>
              </label>
              <input
                className="mb-10"
                type="url"
                name="custom_url"
                value={formData.custom_url}
                onChange={handleOnChange}
                placeholder="Enter custom menu URL"
                autoComplete="off"
              />
              {errors.custom_url && (
                <div className="text-tiny text-danger">
                  {errors.custom_url[0]}
                </div>
              )}
            </fieldset>
          </div>
        )}

        <fieldset className="male mt-3">
          <label className="body-title mb-10">
            Menu location <span className="tf-color-1">*</span>
          </label>
          <div className="select">
            <select
              name="location"
              value={formData.location}
              onChange={handleOnChange}
            >
              <option value="">Choose menu location</option>
              <option value="topbar">Topbar</option>
              <option value="main">Main menu</option>
              <option value="footer">Footer menu</option>
            </select>
          </div>
          {errors.location && (
            <div className="text-tiny text-danger mt-4">
              {errors.location[0]}
            </div>
          )}
        </fieldset>
      </div>

      <div className="wg-box">
        <fieldset className="brand">
          <label className="body-title mb-10">Parent</label>
          <div className="select">
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleOnChange}
            >
              <option value="">Choose parent</option>
              <option value="1">Shop</option>
              <option value="2">Product</option>
              {/* Replace with real dynamic parent list */}
            </select>
          </div>
          {errors.parent_id && (
            <div className="text-tiny text-danger mt-4">
              {errors.parent_id[0]}
            </div>
          )}
        </fieldset>

        <fieldset className="description">
          <label className="body-title mb-10">
            Order <span className="tf-color-1">*</span>
          </label>
          <input
            className="mb-10"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleOnChange}
            autoComplete="off"
          />
          {errors.order && (
            <div className="text-tiny text-danger">{errors.order[0]}</div>
          )}
        </fieldset>

        <fieldset className="brand">
          <label className="body-title mb-10">
            Active? <span className="tf-color-1">*</span>
          </label>
          <div className="select">
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleOnChange}
            >
              <option value="">Choose</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          {errors.is_active && (
            <div className="text-tiny text-danger mt-4">
              {errors.is_active[0]}
            </div>
          )}
        </fieldset>

        <div className="cols gap10 mt-4">
          <button className="tf-button w-full" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Add menu"}
          </button>
          <button
            type="button"
            className="tf-button style-1 w-full"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
        {errors.general && <div className="text-danger">{errors.message}</div>}
      </div>
    </form>
  );
}
