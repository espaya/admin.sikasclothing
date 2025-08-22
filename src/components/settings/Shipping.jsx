import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router";

export default function Shipping({ errors, setErrors, setSuccessMsg }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipping_location: "",
    shipping_cost: "",
    shipping_method: "",
    status: "",
    estimated_delivery_time: "",
    weight_limit: "",
    notes: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const response = await fetch(
        `${apiBase}/api/settings/shipping-methods/add`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(formData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
      } else {
        setSuccessMsg(data.message);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch (err) {
      setErrors({ general: err.mesage });
      setTimeout(() => setErrors({ general: "" }), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="tf-section-2 form-add-product form-setting "
      >
        <div className="wg-box" style={{ boxShadow: "none" }}>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Location <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter shipping location"
                name="shipping_location"
                tabindex="0"
                value={formData.shipping_location}
                aria-required="true"
                autoComplete="off"
                onChange={handleOnChange}
              />
              {errors.shipping_location && (
                <div className="text-tiny text-danger">
                  {errors.shipping_location}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Shipping Cost <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter shipping cost. (e.g 50.4)"
                name="shipping_cost"
                tabindex="0"
                value={formData.shipping_cost}
                onChange={handleOnChange}
                aria-required="true"
                autoComplete="off"
              />
              {errors.shipping_cost && (
                <div className="text-tiny text-danger">
                  {errors.shipping_cost}
                </div>
              )}
            </fieldset>
          </div>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Shipping Method <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select name="shipping_method" onChange={handleOnChange}>
                  <option value="">Choose shipping method</option>
                  {/* Generic methods */}
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="pickup">Pickup</option>
                  <option value="courier">Courier</option>

                  {/* Popular carriers */}
                  <option value="dhl">DHL</option>
                  <option value="fedex">FedEx</option>
                  <option value="ups">UPS</option>
                  <option value="usps">USPS</option>
                  <option value="ems">EMS</option>
                  <option value="aramex">Aramex</option>
                  <option value="tnt">TNT</option>
                </select>
              </div>
              {errors.shipping_method && (
                <div className="text-tiny text-danger">
                  {errors.shipping_method}
                </div>
              )}
            </fieldset>
          </div>
          <fieldset className="male">
            <div className="body-title mb-10">
              Status <span className="tf-color-1">*</span>
            </div>
            <div className="select">
              <select name="status" className="" onChange={handleOnChange}>
                <option>Choose status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {errors.status && (
              <div className="text-tiny text-danger">{errors.status}</div>
            )}
          </fieldset>
        </div>

        <div className="wg-ox">
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Estimated Delivery Time <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder=" 3- 5 days"
                name="estimated_delivery_time"
                tabindex="0"
                value={formData.estimated_delivery_time}
                onChange={handleOnChange}
                aria-required="true"
                autoComplete="off"
              />
              {errors.estimated_delivery_time && (
                <div className="text-tiny text-danger">
                  {errors.estimated_delivery_time}
                </div>
              )}
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Weight Limit <span className="tf-color-1"></span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="e.g 120kg"
                name="weight_limit"
                tabindex="0"
                value={formData.weight_limit}
                onChange={handleOnChange}
                aria-required="true"
                autoComplete="off"
              />
              {errors.weight_limit && (
                <div className="text-tiny text-danger">
                  {errors.weight_limit}
                </div>
              )}
            </fieldset>
          </div>
          <fieldset className="description">
            <div className="body-title mb-10">
              Notes <span className="tf-color-1"></span>
            </div>
            <textarea
              className="mb-10"
              name="notes"
              placeholder="Notes"
              tabindex="0"
              aria-required="true"
              value={formData.notes}
              onChange={handleOnChange}
            ></textarea>
            {errors.notes && (
              <div className="text-tiny text-danger">{errors.notes}</div>
            )}
          </fieldset>
        </div>
        <div className="cols gap10">
          <button className="tf-button w-full" type="submit" disabled={loading}>
            <i className="icon-plus"></i>
            {loading ? "Processing..." : ""}
          </button>
          <a
          onClick={() => navigate(PATHS.SHIPPING_METHODS)}
          href="#"
            // href={navigate(PATHS.SHIPPING_METHODS)}
            // onClick={(e) => {
            //   e.preventDefault();
            //   navigate(PATHS.SHIPPING_METHODS);
            // }}
            className="tf-button style-1 w208 w-full"
          >
            <i className="icon-eye"></i>
          </a>
        </div>
      </form>
    </>
  );
}
