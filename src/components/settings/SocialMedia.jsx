import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import socialIcons from "../settings/SocialIcons"; // your array of FA icon classes

export default function SocialMedia({ errors, setErrors, setSuccessMsg }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(null); // track which entry index is open
  const pickerRef = useRef(null);

  // Multiple entries state
  const [socialEntries, setSocialEntries] = useState([
    { social_name: "", social_url: "", social_icon: "" },
  ]);

  // Handle input change
  const handleOnChange = (index, e) => {
    const newEntries = [...socialEntries];
    newEntries[index][e.target.name] = e.target.value;
    setSocialEntries(newEntries);
  };

  // Handle icon selection
  const handleSelectIcon = (index, iconClass) => {
    const newEntries = [...socialEntries];
    newEntries[index].social_icon = `<i class="${iconClass}"></i>`;
    setSocialEntries(newEntries);
    setShowIconPicker(null);
  };

  // Add new row
  const addEntry = () => {
    setSocialEntries([
      ...socialEntries,
      { social_name: "", social_url: "", social_icon: "" },
    ]);
  };

  // Remove a row
  const removeEntry = (index) => {
    const newEntries = [...socialEntries];
    newEntries.splice(index, 1);
    setSocialEntries(newEntries);
  };

  // Close icon picker on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowIconPicker(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-token`, {
        credentials: "include",
        method: "GET",
      });

      const response = await fetch(
        `${apiBase}/api/settings/social-media/store`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ socials: socialEntries }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: [data.message] });
        return;
      }

      setSocialEntries([{ social_name: "", social_url: "", social_icon: "" }]);
      setSuccessMsg(data.message || "Saved successfully!");
    } catch (err) {
      setErrors({ general: [err.message] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="tf-section-2 form-add-product form-setting"
    >
      <div className="wg-box" style={{ boxShadow: "none" }}>
        {socialEntries.map((entry, index) => (
          <div
            key={index}
            className="mb-4 border rounded p-3 position-relative"
          >
            {/* Icon */}
            <fieldset className="mb-2 position-relative">
              <div className="body-title mb-2">
                Icon <span className="tf-color-1">*</span>
              </div>
              <input
                type="text"
                name="social_icon"
                value={entry.social_icon}
                readOnly
                className="form-control cursor-pointer"
                placeholder="Click or right-click to choose an icon"
                onClick={() => setShowIconPicker(index)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowIconPicker(index);
                }}
              />

              {errors?.[`socials.${index}.social_icon`] && (
                <div className="text-tiny text-danger">
                  {errors[`socials.${index}.social_icon`][0]}
                </div>
              )}

              {/* Icon Picker */}
              {showIconPicker === index && (
                <div
                  ref={pickerRef}
                  className="position-absolute bg-white border p-3 shadow-lg mt-1 z-10 
                             d-flex flex-wrap gap-3 rounded"
                  style={{
                    minWidth: "600px",
                    maxHeight: "80px",
                    overflow: "hidden",
                  }}
                >
                  {socialIcons.map((icon) => (
                    <div
                      key={icon}
                      className="p-2 cursor-pointer d-flex justify-content-center align-items-center rounded hover-bg-light"
                      onClick={() => handleSelectIcon(index, icon)}
                    >
                      <i className={`${icon} fa-2x`}></i>
                    </div>
                  ))}
                </div>
              )}
            </fieldset>
            {/* Social Name */}
            <fieldset className="mb-2">
              <div className="body-title mb-2">
                Social Media Name <span className="tf-color-1">*</span>
              </div>
              <input
                type="text"
                name="social_name"
                value={entry.social_name}
                onChange={(e) => handleOnChange(index, e)}
                placeholder="Facebook"
                className="form-control"
                autoComplete="off"
              />
              {errors?.[`socials.${index}.social_name`] && (
                <div className="text-tiny text-danger">
                  {errors[`socials.${index}.social_name`][0]}
                </div>
              )}
            </fieldset>

            {/* URL */}
            <fieldset className="mb-2">
              <div className="body-title mb-2">
                Url <span className="tf-color-1">*</span>
              </div>
              <input
                type="text"
                name="social_url"
                value={entry.social_url}
                onChange={(e) => handleOnChange(index, e)}
                placeholder="https://facebook.com/yourpage"
                className="form-control"
                autoComplete="off"
              />
              {errors?.[`socials.${index}.social_url`] && (
                <div className="text-tiny text-danger">
                  {errors[`socials.${index}.social_url`][0]}
                </div>
              )}
            </fieldset>

            {/* Remove Button */}
            {socialEntries.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger mt-2"
                onClick={() => removeEntry(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More */}
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={addEntry}
        >
          + Add More
        </button>

        {/* Submit */}
        <div className="cols gap10 mt-4">
          <button className="tf-button w-full" type="submit" disabled={loading}>
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
          <a className="tf-button w-full style-1" href="#">
            <i className="icon-eye"></i> View
          </a>
        </div>
      </div>
    </form>
  );
}
