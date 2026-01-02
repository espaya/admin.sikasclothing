import { useState } from "react";
import Cookies from "js-cookie";
import PaymentStatusOptions from "./PaymentStatusOptions";
import OrderStatusOptions from "./OrderStatusOptions";
import OrderAdminNotes from "./OrderAdminNotes";

export default function SingleOrderOptions({ order }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    status: "",
    payment_status: "",
    admin_notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, { credentials: "include" });

      const response = await fetch(
        `${apiBase}/api/admin/update-order-options/${order?.id}`,
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      setSuccessMsg(data.message);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wg-table table-cart-totals">
      {errors.general && <p className="alert alert-danger">{errors.general}</p>}
      {successMsg && <p className="alert alert-success">{successMsg}</p>}
      <form
        method="POST"
        className="tf-section-2 form-add-product"
        onSubmit={handleSubmit}
      >
        {/* Combined Order Status with Groups */}
        <OrderStatusOptions
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          setErrors={setErrors}
        />

        {/* Payment Status */}
        <PaymentStatusOptions
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          setErrors={setErrors}
        />

        {/* Admin Notes */}
        <OrderAdminNotes
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          setErrors={setErrors}
        />

        {/* Submit Button */}
        <div className="cols gap10 mt-20">
          <button
            type="submit"
            className="tf-button w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-30 pt-20 border-t">
          <div className="body-title mb-15">Quick Actions</div>
          <div className="grid cols gap-10">
            <button
              type="button"
              className="tf-button style-1 w-full flex items-center justify-center gap-2"
            >
              <i className="icon-dollar-sign"></i>
              Mark as Paid
            </button>
            <button
              type="button"
              className="tf-button style-2 w-full flex items-center justify-center gap-2"
            >
              <i className="icon-truck"></i>
              Mark as Shipped
            </button>
          </div>

          <div className="grid cols gap-10">
            <button
              type="button"
              className="tf-button style-2 w-full flex items-center justify-center gap-2"
            >
              <i className="icon-printer"></i>
              Print Invoice
            </button>
            <button
              type="button"
              className="tf-button style-2 w-full flex items-center justify-center gap-2"
            >
              <i className="icon-file-text"></i>
              Packing Slip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
