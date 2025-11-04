import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getSingleDiscount from "../../controllers/GetSingleDiscount";
import { useParams } from "react-router-dom";

export default function EditDiscountForm() {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [discount, setDiscounts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    amount: "",
    minimum_order_value: "",
    maximum_discount: "",
    discount_code: "",
    starts_at: "",
    ends_at: "",
    status: "",
    usage_limit: "",
    used_count: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const response = await fetch(`${apiBase}/api/update-discount/${id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
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

      setSuccessMessage(data.message);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3500);
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => {
        setErrors({ general: "" });
      }, 3500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleDiscount(setLoading, setErrors, setDiscounts, apiBase, id);
  }, [id]);

  useEffect(() => {
    if (discount && Object.keys(discount).length > 0) {
      setFormData({
        title: discount.title || "",
        type: discount.type
          ? discount.type.charAt(0).toUpperCase() + discount.type.slice(1)
          : "",
        amount: discount.amount || "",
        percentage: discount.percentage || "",
        minimum_order_value: discount.minimum_order_value || "",
        maximum_discount: discount.maximum_discount || "",
        discount_code: discount.discount_code || "",
        starts_at: discount.starts_at ? discount.starts_at.split(" ")[0] : "",
        ends_at: discount.ends_at ? discount.ends_at.split(" ")[0] : "",
        status: discount.status || "",
        usage_limit: discount.usage_limit || "",
        used_count: discount.used_count || "",
      });
    }
  }, [discount]);

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
      <form onSubmit={handleSubmit} className="tf-section-2 form-add-product">
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Title <span className="tf-color-1">*</span>
              <div className="text-tiny">
                The name of the discount (e.g., "Black Friday Deal").
              </div>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter discount title"
              name="title"
              tabIndex={0}
              aria-required="true"
              onChange={handleChange}
              value={formData.title}
            />
            {errors.title && (
              <div className="text-tiny text-danger">{errors.title[0]}</div>
            )}
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Type <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  Choose if the discount is a fixed amount or a percentage.
                </div>
              </div>
              <div className="select">
                <select
                  value={formData.type}
                  name="type"
                  className=""
                  onChange={handleChange}
                >
                  <option value="">Choose type</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
              {errors.type && (
                <div className="text-tiny text-danger">{errors.type[0]}</div>
              )}
            </fieldset>

            {formData.type === "Percentage" || formData.type === "Fixed" ? (
              <fieldset className="name">
                <div className="body-title mb-10">
                  {formData.type === "Percentage" ? "Discount (%)" : "Amount"}{" "}
                  <span className="tf-color-1">*</span>
                  <div className="text-tiny">
                    {formData.type === "Percentage"
                      ? "Enter the discount percentage (e.g. 10%)"
                      : "Enter the discount amount (e.g. ₵50)"}
                  </div>
                </div>
                <input
                  className="mb-10"
                  type="text"
                  placeholder={
                    formData.type === "Percentage"
                      ? "Enter discount percentage"
                      : "Enter discount amount"
                  }
                  name={
                    formData.type === "Percentage" ? "percentage" : "amount"
                  }
                  tabIndex={0}
                  aria-required="true"
                  onChange={handleChange}
                  value={
                    formData.type === "Percentage"
                      ? formData.percentage
                      : formData.amount
                  }
                />
                {formData.type === "Percentage" && errors.percentage && (
                  <div className="text-tiny text-danger">
                    {errors.percentage[0]}
                  </div>
                )}
                {formData.type === "Fixed" && errors.amount && (
                  <div className="text-tiny text-danger">
                    {errors.amount[0]}
                  </div>
                )}
              </fieldset>
            ) : null}
          </div>

          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Minimum order value <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  The least amount the customer must spend to use this
                  discount.(in money – e.g. ₵50)
                </div>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter minimum order value"
                name="minimum_order_value"
                tabIndex={0}
                aria-required="true"
                onChange={handleChange}
                value={formData.minimum_order_value}
              />
              {errors.minimum_order_value && (
                <div className="text-tiny text-danger">
                  {errors.minimum_order_value[0]}
                </div>
              )}
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Maximum discount <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  The highest discount allowed (useful for percentage discounts
                  (in money – e.g. ₵50)).
                </div>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter minimum discount"
                name="maximum_discount"
                tabIndex={0}
                aria-required="true"
                onChange={handleChange}
                value={formData.maximum_discount}
              />
              {errors.maximum_discount && (
                <div className="text-tiny text-danger">
                  {errors.maximum_discount[0]}
                </div>
              )}
            </fieldset>
          </div>
        </div>
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Discount Code <span className="tf-color-1">*</span>
              <div className="text-tiny">
                The unique code customers must enter to claim the discount.
              </div>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter discount code"
              name="discount_code"
              autoComplete="off"
              tabIndex={0}
              aria-required="true"
              onChange={handleChange}
              value={formData.discount_code}
            />
            {errors.discount_code && (
              <div className="text-tiny text-danger">
                {errors.discount_code[0]}
              </div>
            )}
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Starts at <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  The date the discount becomes active.
                </div>
              </div>
              <input
                className="mb-10"
                type="date"
                name="starts_at"
                tabIndex={0}
                aria-required="true"
                onChange={handleChange}
                value={formData.starts_at}
              />
              {errors.starts_at && (
                <div className="text-tiny text-danger">
                  {errors.starts_at[0]}
                </div>
              )}
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Ends at <span className="tf-color-1">*</span>
                <div className="text-tiny">The date the discount expires.</div>
              </div>
              <input
                className="mb-10"
                type="date"
                name="ends_at"
                tabIndex={0}
                aria-required="true"
                onChange={handleChange}
                value={formData.ends_at}
              />
              {errors.ends_at && (
                <div className="text-tiny text-danger">{errors.ends_at[0]}</div>
              )}
            </fieldset>
          </div>
          <div className="gap22 cols">
            <fieldset className="male">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  Set whether the discount is currently active or inactive.
                </div>
              </div>
              <div className="select">
                <select
                  value={formData.status}
                  name="status"
                  className=""
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {errors.status && (
                <div className="text-tiny text-danger">{errors.status[0]}</div>
              )}
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Usage Limit <span className="tf-color-1">*</span>
                <div className="text-tiny">
                  The total number of times this discount can be used (across
                  all customers).
                </div>
              </div>
              <input
                className="mb-10"
                type="number"
                placeholder="Enter usage limit"
                name="usage_limit"
                tabIndex={0}
                aria-required="true"
                onChange={handleChange}
                value={formData.usage_limit}
              />

              {errors.usage_limit && (
                <div className="text-tiny text-danger">
                  {errors.usage_limit[0]}
                </div>
              )}
            </fieldset>
          </div>
          <div className="cols gap10">
            <button
              className="tf-button w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating Discount..." : "Update Discount"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
