import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import getOrders from "../controllers/GetOrders";

export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  // Fetch Orders Function
  const fetchOrders = async (url = `${apiBase}/admin/all-orders?page=1`) => {
    setLoading(true);
    try {
      const response = await getOrders(setLoading, url, setErrors, setOrders);

      // If getOrders returns data directly, you can modify this part accordingly
      if (response && response.data) {
        setOrders(response.data.data);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          links: response.data.links,
          total: response.data.total,
          from: response.data.from,
          to: response.data.to,
        });
      }
    } catch (error) {
      console.error(error);
      setErrors({ fetch: "Failed to load orders" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders - Sika's Clothing</title>
      <div className="body">
        <div id="wrapper">
          <div id="page">
            <div className="layout-wrap">
              <Sidebar />
              <div className="section-content-right">
                <Header />
                <div className="main-content">
                  <div className="main-content-inner">
                    <div className="main-content-wrap">
                      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Order List</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="/dashboard">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Order List</div>
                          </li>
                        </ul>
                      </div>

                      <div className="wg-box">
                        <div className="flex items-center justify-between gap10 flex-wrap">
                          <div className="wg-filter flex-grow">
                            <form className="form-search">
                              <fieldset className="name">
                                <input
                                  type="text"
                                  placeholder="Search here..."
                                />
                              </fieldset>
                              <div className="button-submit">
                                <button type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <a className="tf-button style-1 w208" href="#">
                            <i className="icon-file-text"></i>Export all order
                          </a>
                        </div>

                        <div className="wg-table table-all-category">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Order ID</div>
                            </li>
                            <li>
                              <div className="body-title">Customer</div>
                            </li>
                            <li>
                              <div className="body-title">Total</div>
                            </li>
                            <li>
                              <div className="body-title">Payment</div>
                            </li>
                            <li>
                              <div className="body-title">Status</div>
                            </li>
                            <li>
                              <div className="body-title">Tracking</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>

                          {loading ? (
                            <p className="text-center py-4">
                              Loading orders...
                            </p>
                          ) : orders.length > 0 ? (
                            <ul className="flex flex-col">
                              {orders.map((order) => (
                                <li
                                  key={order.id}
                                  className="product-item gap14"
                                >
                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    <div className="body-text">
                                      {order.order_number}
                                    </div>
                                    <div className="body-text">
                                      {order.user_id}
                                    </div>
                                    <div className="body-text">
                                      ${order.total_amount}
                                    </div>
                                    <div className="body-text">
                                      {order.payment_status}
                                    </div>
                                    <div>
                                      <div
                                        className={`block-available ${
                                          order.status === "pending"
                                            ? "text-yellow-500"
                                            : "text-green-600"
                                        }`}
                                      >
                                        {order.status}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="block-tracking">
                                        {order.tracking_number}
                                      </div>
                                    </div>
                                    <div className="list-icon-function">
                                      <div className="item eye">
                                        <i className="icon-eye"></i>
                                      </div>
                                      <div className="item edit">
                                        <i className="icon-edit-3"></i>
                                      </div>
                                      <div className="item trash">
                                        <i className="icon-trash-2"></i>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-center py-4">No orders found.</p>
                          )}
                        </div>

                        <div className="divider"></div>

                        {/* ✅ Pagination */}
                        {pagination?.links && (
                          <div className="flex items-center justify-between flex-wrap gap10">
                            <div className="text-tiny">
                              Showing {pagination.from} to {pagination.to} of{" "}
                              {pagination.total} entries
                            </div>
                            <ul className="wg-pagination flex items-center gap2">
                              {pagination.links.map((link, index) => (
                                <li
                                  key={index}
                                  className={link.active ? "active" : ""}
                                  style={{
                                    cursor: link.url
                                      ? "pointer"
                                      : "not-allowed",
                                  }}
                                  onClick={() =>
                                    link.url && fetchOrders(link.url)
                                  }
                                >
                                  <a
                                    dangerouslySetInnerHTML={{
                                      __html: link.label,
                                    }}
                                  ></a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
