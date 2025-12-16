import { useState } from "react";
import Cookies from "js-cookie";

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

    console.log(`Order ID: ${order?.id}`);

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
      }, 3500);
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
        <fieldset className="mb-20">
          <div className="body-title mb-10">
            Order Status <span className="tf-color-1">*</span>
          </div>
          <div className="select">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Select Status</option>

              {/* Processing */}
              <optgroup label="Processing">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="on_hold">On Hold</option>
              </optgroup>

              {/* Fulfillment */}
              <optgroup label="Fulfillment">
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </optgroup>

              {/* Completion */}
              <optgroup label="Completion">
                <option value="completed">Completed</option>
              </optgroup>

              {/* Issues */}
              <optgroup label="Issues">
                <option value="delayed">Delayed</option>
                <option value="returned">Returned</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </optgroup>
            </select>
          </div>
          {errors.status && <p className="text-danger"> {errors.status[0]} </p>}
        </fieldset>

        {/* Payment Status */}
        <fieldset className="mb-20">
          <div className="body-title mb-10">Payment Status</div>
          <div className="select">
            <select
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Select</option>
              <option value="unpaid">Unpaid</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="paid">Paid</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {errors.payment_status && (
            <p className="text-danger"> {errors.payment_status[0]} </p>
          )}
        </fieldset>

        {/* Admin Notes */}
        <fieldset className="mb-30">
          <div className="body-title mb-10">Admin Notes</div>
          <textarea
            name="admin_notes"
            value={formData.admin_notes}
            onChange={handleChange}
            placeholder="Add internal notes..."
            rows="3"
            className="w-full"
          />
          {errors.admin_notes && (
            <p className="text-danger">{errors.admin_notes[0]}</p>
          )}
        </fieldset>

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
