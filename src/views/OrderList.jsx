import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import getOrders from "../controllers/GetOrders";
import Spinner from "../components/Spinner";

export default function OrderList() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getOrders(setLoading, apiBase, setErrors, setOrders, setPagination);
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
                            <Spinner />
                          ) : orders.length > 0 ? (
                            <ul className="flex flex-column">
                              {orders.map((order) => (
                                <li
                                  key={order.id}
                                  className="product-item gap14"
                                >
                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    <div className="body-text">
                                      <a
                                        href={`/sc-dashboard/order-detail/${order.order_number}`}
                                      >
                                        {order.order_number}
                                      </a>
                                    </div>
                                    <div className="body-text">
                                      {order.user_id}
                                    </div>
                                    <div className="body-text">
                                      ${order.total_amount}
                                    </div>
                                    <div>
                                      <div
                                        className={`${
                                          order.payment_status === "unpaid"
                                            ? "block-not-available"
                                            : "block-available"
                                        }`}
                                      >
                                        {order.payment_status.toUpperCase()}
                                      </div>
                                    </div>
                                    <div>
                                      <div
                                        className={`${
                                          order.status === "pending"
                                            ? "block-not-available"
                                            : "block-available"
                                        }`}
                                      >
                                        {order.status.toUpperCase()}
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
                              {pagination.links
                                .filter(
                                  (link) =>
                                    link.label !== "&laquo; Previous" &&
                                    link.label !== "Next &raquo;"
                                )
                                .map((link, index) => (
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
