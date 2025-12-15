import { formatDate } from "../../utils/DateFormatter";

export default function SingleOrderSummary({ summary, order_number }) {
  const {
    firstname,
    lastname,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    country,
    phone,
    email,
  } = summary?.shipping_address || {};

  return (
    <div className="right">
      <div className="wg-box mb-20 gap10">
        <div className="body-title">Summary</div>
        <div className="summary-item">
          <div className="body-text">Order ID</div>
          <div className="body-title-2">#{order_number}</div>
        </div>
        <div className="summary-item">
          <div className="body-text">Date</div>
          <div className="body-title-2">{formatDate(summary?.created_at)}</div>
        </div>
        <div className="summary-item">
          <div className="body-text">Total</div>
          <div className="body-title-2 tf-color-1">
            ${summary?.total_amount}
          </div>
        </div>
      </div>
      <div className="wg-box mb-20 gap10">
        <div className="body-title">Shipping Address</div>
        <div className="body-text">{`${firstname} ${lastname}`}</div>
        <div className="body-text">{address_line_1}</div>
        {address_line_2 && <div className="body-text">{address_line_2}</div>}
        <div className="body-text">{`${city}, ${state}, ${zip}`}</div>
        <div className="body-text">{country}</div>
        <div className="body-text">{phone}</div>
        <div className="body-text">{email}</div>
      </div>
      <div className="wg-box mb-20 gap10">
        <div className="body-title">Payment Method</div>
        <div className="body-text">
          {summary?.payment_method === "direct_bank_transfer"
            ? "Direct Bank Transfer"
            : summary?.payment_method?.replace(/_/g, " ") || "Pay on Delivery"}
        </div>
        <div className="body-text mt-2">
          Status:{" "}
          <span
            className={`font-semibold ${
              summary?.payment_status === "paid" ? "tf-color-2" : "tf-color-1"
            }`}
          >
            {summary?.payment_status?.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="wg-box mb-20 gap10">
        <div className="body-title">Shipping</div>
        <div className="body-text">
          Method: {summary?.shipping_method?.shipping_method.toUpperCase()}
        </div>
        <div className="body-text">
          Location: {summary?.shipping_method?.shipping_location}
        </div>
        <div className="body-text">
          Weight Limit: {summary?.shipping_method?.weight_limit ?? "N/A"}
        </div>
        <div className="body-text">
          Estimated Delivery Time: {summary?.shipping_method?.estimated_delivery_time}
        </div>
        <div className="body-text">
          Notes: {summary?.shipping_method?.notes ?? "N/A"}
        </div>
      </div>
      <div className="wg-box gap10">
        <a
          className="tf-button style-1 w-full"
          href={`/order-tracking/${summary?.tracking_number}`}
        >
          <i className="icon-truck"></i>Track order
        </a>
      </div>
    </div>
  );
}
