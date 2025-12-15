export default function SingleOrderAllItems({ items }) {
      const apiBase = import.meta.env.VITE_API_URL;
  return (
    <div className="wg-table table-order-detail">
      <ul className="table-title flex items-center justify-between gap20 mb-24">
        <li>
          <div className="body-title">All items ({items?.length || 0})</div>
        </li>
        <li>
          <div className="dropdown default">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="body-title-2 flex items-center gap8">
                Sort<i className="h6 icon-chevron-down"></i>
              </span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <a href="javascript:void(0);">Name</a>
              </li>
              <li>
                <a href="javascript:void(0);">Quantity</a>
              </li>
              <li>
                <a href="javascript:void(0);">Price</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      {items && items.length > 0 ? (
        <ul className="flex flex-column">
          {items.map((item) => {
            const product = item.product;
            const galleryImages = product?.gallery
              ? product.gallery.split(",")
              : [];
            const firstImage =
              galleryImages.length > 0 ? galleryImages[0] : null;

            return (
              <li key={item.id} className="product-item gap14">
                <div className="image no-bg">
                  {firstImage ? (
                    <img
                      src={`${apiBase}/storage/${firstImage}`}
                      alt={product.product_name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.png";
                      }}
                    />
                  ) : (
                    <img
                      src="/assets/images/placeholder.png"
                      alt="No image"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between gap40 flex-grow">
                  <div className="name">
                    <div className="text-tiny mb-1">Product name</div>
                    <a
                      href={`/product/${product.slug}`}
                      className="body-title-2 hover:text-blue-600"
                    >
                      {product?.product_name}
                      
                    </a>
                  </div>
                  <div className="name">
                    <div className="text-tiny mb-1">Quantity</div>
                    <div className="body-title-2 font-semibold">
                      {item?.quantity}
                    </div>
                  </div>
                  <div className="name">
                    <div className="text-tiny mb-1">Price</div>
                    <div className="body-title-2">
                      <div className="font-semibold">
                        ${parseFloat(item?.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <i className="icon-package text-3xl"></i>
          </div>
          <p className="text-gray-500">No items found</p>
        </div>
      )}
    </div>
  );
}
