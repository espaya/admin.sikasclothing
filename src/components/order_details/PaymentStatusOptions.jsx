import { useEffect, useState } from "react";
import getSingleOrder from "../../controllers/GetSingleOrder";
import { useParams } from "react-router-dom";

export default function PaymentStatusOptions({
  formData,
  errors,
  handleChange,
  setErrors,
}) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState(null);
  const { order_number } = useParams();

  // Fetch order
  useEffect(() => {
    getSingleOrder(apiBase, setLoading, setErrors, setOrders, order_number);
  }, [order_number]);

  // Populate payment_status from DB
  useEffect(() => {
    if (order?.payment_status) {
      handleChange({
        target: {
          name: "payment_status",
          value: order?.payment_status,
        },
      });
    }
  }, [order]);

  return (
    <fieldset className="mb-20">
      <div className="body-title mb-10">{loading ? "Loading..." : "Payment Status"}</div>

      <div className="select">
        <select
          name="payment_status"
          value={formData.payment_status || ""}
          onChange={handleChange}
          className="w-full"
        >
          <option value="">Select</option>
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {errors.payment_status && (
        <p className="text-danger">{errors.payment_status[0]}</p>
      )}
    </fieldset>
  );
}
