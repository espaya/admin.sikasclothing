import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getSingleMenu from "../controllers/GetSingleMenu";
import { useParams } from "react-router-dom";

export default function EditMenuForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    source_type: "",
    source_id: "",
    custom_url: "",
    location: "",
    child_id: "",
    order: "",
    is_active: "",
    child_type: "",
    children: [], // repeatable children
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const response = await fetch(`${apiBase}/api/get-category`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message });
          return;
        }
        setCategories(data.data);
      } catch (err) {
        setErrors({ general: err.message });
        setTimeout(() => setErrors({ general: "" }), 3500);
      }
    };
    fetchCategories();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // --- CHILD HANDLERS ---
  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.children];
    updatedChildren[index] = { ...updatedChildren[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, children: updatedChildren }));
  };

  const addChild = () => {
    setFormData((prevData) => ({
      ...prevData,
      children: [
        ...prevData.children,
        { title: "", source_type: "", source_id: "", custom_url: "" },
      ],
    }));
  };

  const removeChild = (index) => {
    const updatedChildren = [...formData.children];
    updatedChildren.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, children: updatedChildren }));
  };

  // --- SUBMIT FORM ---
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const response = await fetch(`${apiBase}/api/add-menu`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleMenu(setLoading, setErrors, setMenu, id, apiBase);
  }, []);

  useEffect(() => {
    if (menu && id) {
      setFormData({
        title: menu.title || "",
        source_type: menu.source_type || "",
        source_id: menu.source_id || "",
        custom_url: menu.custom_url || "",
        location: menu.location || "",
        child_id: menu.child_id || "",
        order: menu.order || "",
        is_active: menu.is_active || "",
        child_type: menu.child_type || "",
        children: menu.children || [], // repeatable children
      });
    }
  }, [menu]);

  return (
    <>
      {errors.general && <p className="alert alert-danger">{errors.general}</p>}
      {successMsg && <p className="alert alert-success">{successMsg}</p>}
      {/* {data.message && <p className="alert alert-success">{data.message}</p>} */}

      <form onSubmit={handleOnSubmit} className="tf-section-2 form-add-product">
        <div className="wg-box">
          <div className="gap22 cols">
            {/* Title */}
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

            {/* Source Type */}
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

          {/* Category / Custom URL */}
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
                  {categories.map((category, idx) => (
                    <option key={idx} value={category.id}>
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
            <fieldset className="name mt-3">
              <label className="body-title mb-10">
                Custom URL <span className="tf-color-1">*</span>
              </label>
              <input
                className="mb-10"
                type="text"
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
          )}

          {/* Menu Location */}
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

          {/* Order / Active / Submit */}

          <div className="cols gap10 mt-4">
            <button
              className="tf-button w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Edit menu"}
            </button>
            <button
              type="button"
              className="tf-button style-1 w-full"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* --- REPEATABLE CHILDREN --- */}
        <div className="wg-box">
          {formData.children.map((child, idx) => (
            <div key={idx} className="gap22 cols mt-3">
              <fieldset className="name">
                <label className="body-title mb-10">
                  Child Title <span className="tf-color-1">*</span>
                </label>
                <input
                  className="mb-10"
                  type="text"
                  name="title"
                  value={child.title}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Enter child title"
                  autoComplete="off"
                />
                {errors[`children.${idx}.title`] && (
                  <div className="text-tiny text-danger">
                    {errors[`children.${idx}.title`][0]}
                  </div>
                )}
              </fieldset>

              <fieldset className="category">
                <label className="body-title mb-10">
                  Source Type <span className="tf-color-1">*</span>
                </label>
                <div className="select">
                  <select
                    name="source_type"
                    value={child.source_type}
                    onChange={(e) => handleChildChange(idx, e)}
                  >
                    <option value="">Choose source type</option>
                    <option value="category">Category</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </fieldset>

              {child.source_type === "category" && (
                <fieldset className="category mt-3">
                  <label className="body-title mb-10">Category</label>
                  <div className="select">
                    <select
                      name="source_id"
                      value={child.source_id}
                      onChange={(e) => handleChildChange(idx, e)}
                    >
                      <option value="">Choose category</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
              )}

              {child.source_type === "custom" && (
                <fieldset className="name mt-3">
                  <label className="body-title mb-10">Custom URL</label>
                  <input
                    className="mb-10"
                    type="url"
                    name="custom_url"
                    value={child.custom_url}
                    onChange={(e) => handleChildChange(idx, e)}
                    placeholder="Enter custom URL"
                  />
                </fieldset>
              )}

              {/* Remove button per child */}
              <button
                type="button"
                className="tf-button style-1 w-1/2 mt-2"
                onClick={() => removeChild(idx)}
              >
                ❌
              </button>
            </div>
          ))}

          {/* --- Child Type selector appears only once if at least one child exists --- */}
          {formData.children.length > 0 && (
            <fieldset className="brand mt-4">
              <label className="body-title mb-10">
                Child Type <span className="tf-color-1">*</span>
              </label>
              <div className="select">
                <select
                  name="child_type"
                  value={formData.child_type}
                  onChange={handleOnChange}
                >
                  <option value="">Choose</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="mega">Megamenu</option>
                </select>
              </div>
              {errors.child_type && (
                <div className="text-tiny text-danger mt-4">
                  {errors.child_type[0]}
                </div>
              )}
            </fieldset>
          )}

          <div className="gap22 cols mt-4">
            <button
              type="button"
              className="tf-button w-full"
              onClick={addChild}
            >
              Add Child
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
