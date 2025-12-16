export default function SingleOrderCartDetails({ details }) {
  return (
    <div className="wg-table table-cart-totals">
      <ul className="table-title flex mb-24">
        <li>
          <div className="body-title">Cart Totals</div>
        </li>
        <li>
          <div className="body-title">Price</div>
        </li>
      </ul>
      <ul className="flex flex-column gap14">
        <li className="cart-totals-item">
          <span className="body-text">Subtotal:</span>
          <span className="body-title-2">${details?.subtotal_amount}</span>
        </li>
        <li className="divider"></li>
        <li className="cart-totals-item">
          <span className="body-text">Shipping:</span>
          <span className="body-title-2">${details?.shipping_amount}</span>
        </li>
        <li className="divider"></li>
        <li className="cart-totals-item">
          <span className="body-text">Tax:</span>
          <span className="body-title-2">${details?.tax_amount}</span>
        </li>
        <li className="divider"></li>
        <li className="cart-totals-item">
          <span className="body-title">Total price:</span>
          <span className="body-title tf-color-1">${details?.total_amount}</span>
        </li>
      </ul>
    </div>
  );
}
