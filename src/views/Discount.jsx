import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { PATHS } from "../router";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Discount() {
  const [discounts, setDiscounts] = useState([]);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const fetchDiscounts = async (page = 1, perPage = 10, search = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiBase}/api/get-discount?page=${page}&perPage=${perPage}&search=${search}`,
        {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookie.get("XSRF-TOKEN")),
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setDiscounts(data.data);
      setMeta(data.meta || {});
    } catch (err) {
      console.error("Failed to fetch discounts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts(page, perPage, search);
  }, [page, perPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on new search
    fetchDiscounts(1, perPage, search);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <meta charSet="utf-8" />
      <title>Discount - Sika's Clothing</title>

      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar></Sidebar>
            <div className="section-content-right">
              <Header></Header>
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>All Discounts</h3>
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
                            <div className="text-tiny">Discounts</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">All Discounts</div>
                        </li>
                      </ul>
                    </div>
                    {/* all-attribute */}
                    <div className="wg-box">
                      <div className="flex items-center justify-between gap10 flex-wrap">
                        <div className="wg-filter flex-grow">
                          <div className="show">
                            <div className="text-tiny">Showing</div>
                            <div className="select">
                              <select
                                value={perPage}
                                onChange={handlePerPageChange}
                              >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                              </select>
                            </div>
                            <div className="text-tiny">entries</div>
                          </div>
                          <form className="form-search" onSubmit={handleSearch}>
                            <fieldset className="name">
                              <input
                                type="text"
                                placeholder="Search discount..."
                                className=""
                                name="search"
                                tabIndex={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-required="true"
                              />
                            </fieldset>
                            <div className="button-submit">
                              <button type="submit">
                                <i className="icon-search" />
                              </button>
                            </div>
                          </form>
                        </div>

                        <Link to={PATHS.ADDDISCOUNT}
                          className="tf-button style-1 w208"
                        >
                          <i className="icon-plus" />
                          Add new
                        </Link>
                      </div>
                      <div className="wg-table table-all-attribute">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Title</div>
                          </li>
                          <li>
                            <div className="body-title">Type</div>
                          </li>
                          <li>
                            <div className="body-title">Amount</div>
                          </li>
                          <li>
                            <div className="body-title">Percentage</div>
                          </li>
                          <li>
                            <div className="body-title">
                              Minimum Value Order
                            </div>
                          </li>
                          <li>
                            <div className="body-title">Maximum Discount</div>
                          </li>
                          <li>
                            <div className="body-title">Discount Code</div>
                          </li>
                          <li>
                            <div className="body-title">Starts At</div>
                          </li>
                          <li>
                            <div className="body-title">Ends At</div>
                          </li>
                          <li>
                            <div className="body-title">Status</div>
                          </li>
                          <li>
                            <div className="body-title">Usage Limit</div>
                          </li>
                          <li>
                            <div className="body-title">Used Count</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          {loading ? (
                            <Spinner/>
                          ) : discounts.length === 0 ? (
                            <li className="text-center py-3">
                              No discounts found.
                            </li>
                          ) : (
                            discounts.map((item) => (
                              <li
                                key={item.id}
                                className="attribute-item flex items-center justify-between gap20"
                              >
                                <div className="name">
                                  <span className="body-title-2">
                                    {item.title}
                                  </span>
                                </div>
                                <div className="body-text">{item.type}</div>

                                <div className="body-text">
                                  {item.type === "Percentage"
                                    ? `${item.amount}%`
                                    : `$${item.amount}`}
                                </div>
                                <div className="body-text">
                                  {item.percentage}
                                </div>
                                <div className="body-text">
                                  {`$${item.minimum_order_value}`}
                                </div>
                                <div className="body-text">
                                  {`$${item.maximum_discount}`}
                                </div>
                                <div className="body-text">
                                  {item.discount_code}
                                </div>
                                <div className="body-text">
                                  {item.starts_at}
                                </div>
                                <div className="body-text">{item.ends_at}</div>
                                <div className="body-text">{item.status}</div>
                                <div className="body-text">
                                  {item.usage_limit}
                                </div>
                                <div className="body-text">
                                  {item.used_count}
                                </div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye" />
                                  </div>
                                  <Link
                                    to={`/sc-dashboard/product/edit-discount/${item.id}`}
                                  >
                                    <div className="item edit">
                                      <i className="icon-edit-3" />
                                    </div>
                                  </Link>
                                  <div className="item trash">
                                    <i className="icon-trash-2" />
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      <div className="divider" />
                      <div className="flex items-center justify-between flex-wrap gap10">
                        <div className="text-tiny">
                          Showing {meta.from || 0} to {meta.to || 0} of{" "}
                          {meta.total || 0} entries
                        </div>
                        <ul className="wg-pagination">
                          {meta.current_page > 1 && (
                            <li>
                              <a
                                onClick={() =>
                                  handlePageChange(meta.current_page - 1)
                                }
                              >
                                <i className="icon-chevron-left" />
                              </a>
                            </li>
                          )}

                          {[...Array(meta.last_page || 1)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <li
                                key={pageNumber}
                                className={
                                  pageNumber === meta.current_page
                                    ? "active"
                                    : ""
                                }
                              >
                                <a onClick={() => handlePageChange(pageNumber)}>
                                  {pageNumber}
                                </a>
                              </li>
                            );
                          })}

                          {meta.current_page < meta.last_page && (
                            <li>
                              <a
                                onClick={() =>
                                  handlePageChange(meta.current_page + 1)
                                }
                              >
                                <i className="icon-chevron-right" />
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    {/* /all-attribute */}
                  </div>
                  {/* /main-content-wrap */}
                </div>
                {/* /main-content-wrap */}
                {/* bottom-page */}
                <Footer></Footer>
                {/* /bottom-page */}
              </div>
              {/* /main-content */}
            </div>
            {/* /section-content-right */}
          </div>
          {/* /layout-wrap */}
        </div>
        {/* /#page */}
      </div>
      {/* /#wrapper */}
      {/* Javascript */}
    </>
  );
}
