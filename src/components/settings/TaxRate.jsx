import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../router";
import { countries } from "./Countries";

export default function TaxRate({ errors, setErrors, setSuccessMsg }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country_code: "",
    state_code: "",
    tax_name: "",
    rate: "",
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

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="tf-section-2 form-add-product form-setting "
      >
        <div className="wg-box" style={{ boxShadow: "none" }}>
          <div className="gap22 cols">
            <fieldset className="male">
              <div className="body-title mb-10">
                Country Code <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select name="country_code" onChange={handleOnChange}>
                  <option value="">Choose country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country_code && (
                <div className="text-tiny text-danger">
                  {errors.country_code}
                </div>
              )}
            </fieldset>

            {/* State Code / State Dropdown */}
            <fieldset className="state">
              <div className="body-title mb-10">
                {formData.country === "US" ? "State" : "State Code"}{" "}
                <span className="tf-color-1">*</span>
              </div>

              {formData.country === "US" ? (
                <select
                  className="mb-10"
                  name="state_code"
                  value={formData.state_code}
                  onChange={handleOnChange}
                >
                  <option value="">-- Select State --</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="mb-10"
                  type="text"
                  placeholder="Enter shipping cost. (e.g 50.4)"
                  name="state_code"
                  value={formData.state_code}
                  onChange={handleOnChange}
                  aria-required="true"
                  autoComplete="off"
                />
              )}

              {errors.state_code && (
                <div className="text-tiny text-danger">{errors.state_code}</div>
              )}
            </fieldset>
          </div>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Tax Name <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="e.g VAT"
                name="tax_name"
                tabindex="0"
                value={formData.tax_name}
                onChange={handleOnChange}
                aria-required="true"
                autoComplete="off"
              />
              {errors.tax_name && (
                <div className="text-tiny text-danger">{errors.tax_name}</div>
              )}
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Rate<span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="e.g 0.9"
                name="rate"
                tabindex="0"
                value={formData.rate}
                onChange={handleOnChange}
                aria-required="true"
                autoComplete="off"
              />
              {errors.rate && (
                <div className="text-tiny text-danger">{errors.rate}</div>
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

        {/* <div className="wg-ox">
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
        </div> */}
        <div className="cols gap10"></div>

        <div className="cols gap22">
          <button className="tf-button w-full" type="submit" disabled={loading}>
            <i className="icon-plus"></i>
            {loading ? "Processing..." : ""}
          </button>
          <a
            onClick={() => navigate(PATHS.TAX_RATES)}
            href="#"
            className="tf-button style-1 w208 w-full"
          >
            <i className="icon-eye"></i>
          </a>
        </div>
      </form>
    </>
  );
}
