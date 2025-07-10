import { useEffect, useState } from "react";

export default function GetDiscount({formData, handleChange, errors}) {
  const [discountOptions, setDiscountOptions] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiBase}/api/get-discount`, {
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok && Array.isArray(data.data)) {
          setDiscountOptions(data.data);
        } else {
          console.error("Failed to fetch discounts:", data.message || data);
        }
      } catch (error) {
        console.error("Error fetching discounts:", error.message);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <>
      <fieldset className="name">
        <div className="body-title mb-10">
          Discount <span className="tf-color-1"></span>
        </div>
        <div className="select mb-10">
          <select
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          >
            <option value="">Select discount</option>
            {discountOptions.map((discount) => (
              <option key={discount.id} value={discount.id}>
                {discount.title}
              </option>
            ))}
          </select>
        </div>
        {errors.discount && (
          <div className="text-tiny text-danger">{errors.discount[0]}</div>
        )}
      </fieldset>
    </>
  );
}
