export default function SingleOrderCartDetails({ details }) {
  return (
    <div class="wg-table table-cart-totals">
      <ul class="table-title flex mb-24">
        <li>
          <div class="body-title">Cart Totals</div>
        </li>
        <li>
          <div class="body-title">Price</div>
        </li>
      </ul>
      <ul class="flex flex-column gap14">
        <li class="cart-totals-item">
          <span class="body-text">Subtotal:</span>
          <span class="body-title-2">${details?.subtotal_amount}</span>
        </li>
        <li class="divider"></li>
        <li class="cart-totals-item">
          <span class="body-text">Shipping:</span>
          <span class="body-title-2">${details?.shipping_amount}</span>
        </li>
        <li class="divider"></li>
        <li class="cart-totals-item">
          <span class="body-text">Tax:</span>
          <span class="body-title-2">${details?.tax_amount}</span>
        </li>
        <li class="divider"></li>
        <li class="cart-totals-item">
          <span class="body-title">Total price:</span>
          <span class="body-title tf-color-1">${details?.total_amount}</span>
        </li>
      </ul>
    </div>
  );
}
