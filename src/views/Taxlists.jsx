import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

export default function TaxLists() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const csrfToken = Cookies.get("XSRF-TOKEN");
  const [taxData, setTaxData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  const [errors, setErrors] = useState({});

  const fetchTaxRates = async (page = 1) => {
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${apiBase}/api/tax-rates?page=${page}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
      } else {
        setTaxData({
          data: data.data,
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxRates();
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= taxData.last_page) {
      fetchTaxRates(page);
    }
  };

  return (
    <>
      <title>Tax Rates - Sika's Clothing</title>

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
                      <h3>Tax Rates</h3>
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
                          <div className="text-tiny">Tax Rates</div>
                        </li>
                      </ul>
                    </div>

                    {/* tax-rates-list */}
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

                      {/* Table */}
                      <div className="wg-table table-product-list">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Country</div>
                          </li>
                          <li>
                            <div className="body-title">Code</div>
                          </li>
                          <li>
                            <div className="body-title">Tax Name</div>
                          </li>
                          <li>
                            <div className="body-title">Type</div>
                          </li>
                          <li>
                            <div className="body-title">Rate (%)</div>
                          </li>
                          <li>
                            <div className="body-title">Effective Date</div>
                          </li>
                          <li>
                            <div className="body-title">Status</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>

                        {loading ? (
                          <div className="p-4">Loading tax rates...</div>
                        ) : errors.general ? (
                          <div className="p-4 text-danger">
                            {errors.general}
                          </div>
                        ) : (
                          <ul className="flex flex-column">
                            {taxData.data.map((tax) => (
                              <li key={tax.id} className="product-item gap14">
                                <div className="flex items-center justify-between gap20 flex-grow">
                                  <div className="body-text">{tax.country}</div>
                                  <div className="body-text">
                                    {tax.country_code}
                                  </div>
                                  <div className="body-text">
                                    {tax.tax_name}
                                  </div>
                                  <div className="body-text">
                                    {tax.tax_type}
                                  </div>
                                  <div className="body-text">{tax.rate}</div>
                                  <div className="body-text">
                                    {new Date(
                                      tax.effective_date
                                    ).toLocaleDateString()}
                                  </div>
                                  <div className="body-text">{tax.status}</div>
                                  <div className="list-icon-function">
                                    <div className="item eye">
                                      <i className="icon-eye" />
                                    </div>
                                    <div className="item edit">
                                      <i className="icon-edit-3" />
                                    </div>
                                    <div className="item trash">
                                      <i className="icon-trash-2" />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="divider" />
                      <div className="flex items-center justify-between flex-wrap gap10">
                        <div className="text-tiny">
                          Showing {taxData.data.length} of {taxData.total}{" "}
                          entries
                        </div>
                        <ul className="wg-pagination">
                          <li>
                            <a
                              onClick={() =>
                                handlePageChange(taxData.current_page - 1)
                              }
                              disabled={taxData.current_page === 1}
                            >
                              <i className="icon-chevron-left" />
                            </a>
                          </li>

                          {/* Always show first page */}
                          <li
                            className={
                              taxData.current_page === 1 ? "active" : ""
                            }
                          >
                            <a onClick={() => handlePageChange(1)}>1</a>
                          </li>

                          {/* Show second page if not active and not adjacent to first */}
                          {taxData.current_page > 3 && (
                            <li>
                              <a disabled>...</a>
                            </li>
                          )}

                          {/* Show pages around current page */}
                          {Array.from(
                            { length: taxData.last_page },
                            (_, i) => i + 1
                          )
                            .filter(
                              (page) =>
                                page === taxData.current_page ||
                                page === taxData.current_page - 1 ||
                                page === taxData.current_page + 1
                            )
                            .filter(
                              (page) => page > 1 && page < taxData.last_page
                            )
                            .map((page) => (
                              <li
                                key={page}
                                className={
                                  taxData.current_page === page ? "active" : ""
                                }
                              >
                                <a onClick={() => handlePageChange(page)}>
                                  {page}
                                </a>
                              </li>
                            ))}

                          {/* Show second last page if not active and not adjacent to last */}
                          {taxData.current_page < taxData.last_page - 2 && (
                            <li>
                              <a disabled>...</a>
                            </li>
                          )}

                          {/* Always show last page if there's more than one page */}
                          {taxData.last_page > 1 && (
                            <li
                              className={
                                taxData.current_page === taxData.last_page
                                  ? "active"
                                  : ""
                              }
                            >
                              <a
                                onClick={() =>
                                  handlePageChange(taxData.last_page)
                                }
                              >
                                {taxData.last_page}
                              </a>
                            </li>
                          )}

                          <li>
                            <a
                              onClick={() =>
                                handlePageChange(taxData.current_page + 1)
                              }
                              disabled={
                                taxData.current_page === taxData.last_page
                              }
                            >
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
