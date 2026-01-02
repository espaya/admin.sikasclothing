import { useEffect, useState } from "react";
import getSingleOrder from "../../controllers/GetSingleOrder";
import { useParams } from "react-router-dom";

export default function OrderStatusOptions({
  formData,
  errors,
  handleChange,
  setErrors,
}) {
  const [loading, setLoading] = useState(false);
  const [order, setOrders] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const { order_number } = useParams();

  useEffect(() => {
    getSingleOrder(apiBase, setLoading, setErrors, setOrders, order_number);
  }, [order_number]);

  useEffect(() => {
    if (order?.status) {
      handleChange({
        target: {
          name: "status",
          value: order?.status,
        },
      });
    }
  }, [order]);

  return (
    <>
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
    </>
  );
}
