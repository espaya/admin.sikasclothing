import { useEffect, useState } from "react";
import getSingleOrder from "../../controllers/GetSingleOrder";
import { useParams } from "react-router-dom";

export default function OrderAdminNotes({ formData, handleChange, errors, setErrors }) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { order_number } = useParams();

  useEffect(() => {
    getSingleOrder(apiBase, setLoading, setErrors, setOrders, order_number);
  }, [order_number]);

  useEffect(() => {
    if (order?.admin_notes) {
      handleChange({
        target: {
          name: "admin_notes",
          value: order?.admin_notes,
        },
      });
    }
  }, [order]);

  return (
    <>
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
    </>
  );
}
