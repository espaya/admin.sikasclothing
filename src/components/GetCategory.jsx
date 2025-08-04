import { useEffect, useState } from "react";

export default function GetCategory({ formData, errors, handleChange }) {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategory = async (e) => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiBase}/api/get-category`, {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data.data)) {
          setCategoryOptions(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <div className="gap22 cols">
        <fieldset className="category">
          <div className="body-title mb-10">
            Category <span className="tf-color-1">*</span>
          </div>
          <div className="select">
            <select
              name="category"
              className=""
              multiple
              value={formData.category}
              onChange={handleChange}
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <div className="text-tiny text-danger">{errors.category[0]}</div>
          )}
        </fieldset>
      </div>
    </>
  );
}
