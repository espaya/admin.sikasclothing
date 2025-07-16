import { useEffect, useState } from "react";

export default function BrandOptions({ formData, handleChange, errors }) {
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    const fetchBrandOptions = async (e) => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiBase}/api/get-brands`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data.data)) {
          setBrandOptions(data.data);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchBrandOptions();
  }, []);

  return (
    <>
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
    </>
  );
}
