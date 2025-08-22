import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

export default function ShippingMethodLists() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [shippingMethods, setShippingMethods] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShippingMethods = async () => {
      setLoading(true);

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });
        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(
          `${apiBase}/api/settings/shipping-methods/get`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message });
        } else {
          setShippingMethods(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    getShippingMethods();
  }, []);

  return (
    <>
      <title>Shipping Methods - Sika's Clothing</title>

      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              {/* main-content */}
              <div className="main-content">
                {/* main-content-wrap */}
                <div className="main-content-inner">
                  {/* main-content-wrap */}
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>Shipping Methods</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                        <li>
                          <a href="index.html">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <a href="#">
                            <div className="text-tiny">Ecommerce</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Shipping Methods</div>
                        </li>
                      </ul>
                    </div>
                    {/* product-list */}
                    <div className="wg-box">
                      <div className="flex items-center justify-between gap10 flex-wrap">
                        <div className="wg-filter flex-grow">
                          <div className="show">
                            <div className="text-tiny">Showing</div>
                            <div className="select">
                              <select className="">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                              </select>
                            </div>
                            <div className="text-tiny">entries</div>
                          </div>
                          <form className="form-search">
                            <fieldset className="name">
                              <input
                                type="text"
                                placeholder="Search here..."
                                className=""
                                name="name"
                                tabIndex={2}
                                defaultValue=""
                                aria-required="true"
                                required=""
                              />
                            </fieldset>
                            <div className="button-submit">
                              <button className="" type="submit">
                                <i className="icon-search" />
                              </button>
                            </div>
                          </form>
                        </div>
                        <a
                          className="tf-button style-1 w208"
                          href="add-product.html"
                        >
                          <i className="icon-plus" />
                          Add new
                        </a>
                      </div>
                      <div className="wg-table table-product-list">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Location</div>
                          </li>
                          <li>
                            <div className="body-title">Cost</div>
                          </li>
                          <li>
                            <div className="body-title">Method</div>
                          </li>
                          <li>
                            <div className="body-title">Est. Delivery Time</div>
                          </li>
                          <li>
                            <div className="body-title">Weight Limit</div>
                          </li>
                          <li>
                            <div className="body-title">Status</div>
                          </li>
                          <li>
                            <div className="body-title">Notes</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          {shippingMethods.map((method) => (
                            <li key={method.id} className="product-item gap14">
                              {/* Optional Image placeholder (can remove if not needed) */}
                              <div className="image no-bg">
                                {/* <img src="images/products/41.png" alt="" /> */}
                              </div>

                              {/* Data Columns */}
                              <div className="flex items-center justify-between gap20 flex-grow">
                                {/* Location */}
                                <div className="body-title-2">
                                  {method.shipping_location}
                                </div>

                                {/* Cost */}
                                <div className="body-text">
                                  ${method.shipping_cost}
                                </div>

                                {/* Method */}
                                <div className="body-text">
                                  {method.shipping_method}
                                </div>

                                {/* Estimated Delivery */}
                                <div className="body-text">
                                  {method.estimated_delivery_time}
                                </div>

                                {/* Weight Limit */}
                                <div className="body-text">
                                  {method.weight_limit
                                    ? method.weight_limit
                                    : "N/A"}
                                </div>

                                {/* Status */}
                                <div>
                                  {method.status === "active" ? (
                                    <span className="block-available">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="block-not-available">
                                      Inactive
                                    </span>
                                  )}
                                </div>

                                {/* Notes */}
                                <div className="body-text">
                                  {method.notes ?? "—"}
                                </div>

                                {/* Actions */}
                                <div className="list-icon-function flex gap10">
                                  <div className="item eye" title="View">
                                    <i className="icon-eye" />
                                  </div>
                                  <div className="item edit" title="Edit">
                                    <i className="icon-edit-3" />
                                  </div>
                                  <div className="item trash" title="Delete">
                                    <i className="icon-trash-2" />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="divider" />
                      <div className="flex items-center justify-between flex-wrap gap10">
                        <div className="text-tiny">Showing 10 entries</div>
                        <ul className="wg-pagination">
                          <li>
                            <a href="#">
                              <i className="icon-chevron-left" />
                            </a>
                          </li>
                          <li>
                            <a href="#">1</a>
                          </li>
                          <li className="active">
                            <a href="#">2</a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="icon-chevron-right" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
