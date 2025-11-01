import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [searchData, setSearchData] = useState({
    search: "",
  });

  const apiBase = import.meta.env.VITE_API_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const searchResponse = await fetch(`${apiBase}/api/get-product`, {
        method: "GET",
        credentials: "include",
      });

      const data = await searchResponse.json();

      setProductList(data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    setErrors({});
    try {
      // Get CSRF cookie
      const csrfResponse = await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      if (!csrfResponse.ok) {
        setErrors({ general: "Faild to fetch CSRF token" });
      }

      const csrfToken = Cookies.get("XSRF-TOKEN");

      if (!csrfToken) {
        setErrors({ general: "CSRF token not found!" });
      }

      const response = await fetch(`${apiBase}/api/delete-product/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors({
          general: data.message || `HTTP error! status: ${response.status}`,
        });
      }

      const data = await response.json();
      setSuccess(data.message);
      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setErrors({
        general: err.message || "Network error - please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProductList = async (page = 1) => {
    try {
      setLoading(true);

      const response = await fetch(`${apiBase}/api/get-product`, {
        credentials: "include",
        method: "GET",
      });

      const data = await response.json();

      // Check if data and data.data exist before setting state
      if (data && data.data) {
        setProductList(data.data);

        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
        });
      } else {
        // Handle case where data structure is different
        setProductList(data || []); // Fallback to empty array
        setPagination({
          current_page: 1,
          last_page: 1,
        });
      }
    } catch (err) {
      console.error(err.message);
      setProductList([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      <title>Product List - Sika's Clothing</title>

      <div className="body">
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
                        <h3>Product List</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <Link to={PATHS.ADMIN}>
                              <div className="text-tiny">Dashboard</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <Link to={PATHS.PRODUCTLIST}>
                              <div className="text-tiny">Product List</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Product List</div>
                          </li>
                        </ul>
                      </div>

                      {errors.general && (
                        <p className="alert alert-danger"> {errors.general} </p>
                      )}

                      {success && (
                        <p className="alert alert-success"> {success} </p>
                      )}

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
                            <form
                              onSubmit={handleSearch}
                              className="form-search"
                            >
                              <fieldset className="name">
                                <input
                                  type="text"
                                  placeholder="Search here..."
                                  className=""
                                  name="search"
                                  tabIndex="2"
                                  value={searchData.search}
                                  aria-required="true"
                                />
                              </fieldset>
                              <div className="button-submit">
                                <button className="" type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <Link
                            className="tf-button style-1 w208"
                            to={PATHS.ADDPRODUCT}
                          >
                            <i className="icon-plus"></i>Add new
                          </Link>
                        </div>
                        <div className="wg-table table-product-list">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Product</div>
                            </li>
                            <li>
                              <div className="body-title">Color</div>
                            </li>
                            <li>
                              <div className="body-title">Price</div>
                            </li>
                            <li>
                              <div className="body-title">Quantity</div>
                            </li>
                            <li>
                              <div className="body-title">Sale</div>
                            </li>
                            <li>
                              <div className="body-title">Stock Status</div>
                            </li>
                            <li>
                              <div className="body-title">Status</div>
                            </li>
                            <li>
                              <div className="body-title">Date</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>
                          {loading ? (
                            <Spinner></Spinner>
                          ) : (
                            <ul className="flex flex-column">
                              {productList.length > 0 ? (
                                productList.map((product, index) => (
                                  <li
                                    key={index}
                                    className="product-item gap14"
                                  >
                                    <div className="image no-bg">
                                      <img
                                        src={
                                          product.gallery
                                            ? `${apiBase}/storage/${
                                                product.gallery.split(",")[0]
                                              }`
                                            : "/assets/images/products/default.png"
                                        }
                                        alt={product.product_name}
                                      />
                                    </div>
                                    <div className="flex items-center justify-between gap20 flex-grow">
                                      <div className="name">
                                        <a
                                          href="product-list.html"
                                          className="body-title-2"
                                        >
                                          {product.product_name}
                                        </a>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {(() => {
                                          let colors = [];

                                          // Normalize color input into an array
                                          if (Array.isArray(product.color)) {
                                            colors = product.color;
                                          } else if (
                                            typeof product.color === "string"
                                          ) {
                                            const trimmed =
                                              product.color.trim();

                                            // Try parsing JSON array like '["#fff", "#000"]'
                                            if (
                                              trimmed.startsWith("[") &&
                                              trimmed.endsWith("]")
                                            ) {
                                              try {
                                                const parsed =
                                                  JSON.parse(trimmed);
                                                if (Array.isArray(parsed)) {
                                                  colors = parsed;
                                                } else {
                                                  colors = [trimmed];
                                                }
                                              } catch {
                                                // fallback if JSON parsing fails
                                                colors = trimmed.includes(",")
                                                  ? trimmed.split(",")
                                                  : [trimmed];
                                              }
                                            } else {
                                              // fallback for comma-separated or single string
                                              colors = trimmed.includes(",")
                                                ? trimmed.split(",")
                                                : [trimmed];
                                            }
                                          }

                                          // Validate and display color bubbles
                                          return colors.map(
                                            (rawColor, index) => {
                                              const color = rawColor
                                                .replace(/["'\[\]]/g, "")
                                                .trim();

                                              const isHex = (c) =>
                                                /^#([0-9A-F]{3}){1,2}$/i.test(
                                                  c
                                                );
                                              const isRgb = (c) =>
                                                /^rgba?\(\s*(\d{1,3}\s*,){2,3}\s*[\d.]+\s*\)$/i.test(
                                                  c
                                                );
                                              const isHsl = (c) =>
                                                /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*[\d.]+\s*)?\)$/i.test(
                                                  c
                                                );

                                              const isValidCssColor = (c) => {
                                                const s = new Option().style;
                                                s.color = "";
                                                s.color = c;
                                                return s.color !== "";
                                              };

                                              let finalColor = "#ccc";
                                              if (
                                                isHex(color) ||
                                                isRgb(color) ||
                                                isHsl(color) ||
                                                isValidCssColor(color)
                                              ) {
                                                finalColor = color;
                                              }

                                              return (
                                                <div
                                                  key={index}
                                                  style={{
                                                    backgroundColor: finalColor,
                                                    width: "16px",
                                                    height: "16px",
                                                    borderRadius: "50%",
                                                    display: "inline-block",
                                                    marginRight: "5px",
                                                    border: "1px solid #999",
                                                  }}
                                                  title={color}
                                                />
                                              );
                                            }
                                          );
                                        })()}

                                        <span className="body-text">
                                          {(() => {
                                            const colors =
                                              Array.isArray(product.color) ||
                                              typeof product.color === "string"
                                                ? JSON.parse(
                                                    JSON.stringify(
                                                      product.color
                                                    )
                                                  )
                                                : [];
                                            if (
                                              Array.isArray(colors) &&
                                              colors.length === 1
                                            )
                                              return colors[0];
                                            if (
                                              typeof product.color ===
                                                "string" &&
                                              !product.color.includes(",")
                                            )
                                              return product.color.trim();
                                            return null;
                                          })()}
                                        </span>
                                      </div>

                                      <div className="body-text">
                                        ${product.price}
                                      </div>
                                      <div className="body-text">
                                        {" "}
                                        {product.stock_quantity}{" "}
                                      </div>
                                      <div className="body-text">
                                        {" "}
                                        {product.sale_price
                                          ? product.sale_price
                                          : "N/A"}{" "}
                                      </div>
                                      <div>
                                        {product.stock_status ===
                                        "out_of_stock" ? (
                                          <div className="block-not-available">
                                            Out of stock
                                          </div>
                                        ) : product.stock_status ===
                                          "backorder" ? (
                                          <div className="block-pending">
                                            Backorder
                                          </div>
                                        ) : product.stock_status ===
                                          "in_stock" ? (
                                          <div className="block-available">
                                            In Stock
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="body-text">
                                        {" "}
                                        {product.status}{" "}
                                      </div>
                                      <div className="body-text">
                                        {" "}
                                        {new Date(
                                          product.created_at
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}{" "}
                                      </div>
                                      <div className="list-icon-function">
                                        <div className="item eye">
                                          <i className="icon-eye"></i>
                                        </div>

                                        <Link
                                          to={{
                                            pathname: `/sc-dashboard/product/edit-product/${product.slug}`,
                                          }}
                                        >
                                          <div className="item edit">
                                            <i className="icon-edit-3"></i>
                                          </div>
                                        </Link>

                                        <div className="item trash">
                                          <i
                                            onClick={(e) => {
                                              e.stopPropagation(); // Prevent any parent click handlers
                                              handleDelete(product.id);
                                            }}
                                            className="icon-trash-2"
                                            style={{ cursor: "pointer" }}
                                            title="Delete"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <p className="alert alert-info">
                                  No Products Found!
                                </p>
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">
                            {pagination.current_page} of {pagination.last_page}
                          </div>

                          <ul className="wg-pagination">
                            <li>
                              <a
                                onClick={() =>
                                  pagination.current_page > 1 &&
                                  fetchProductList(pagination.current_page - 1)
                                }
                              >
                                <i className="icon-chevron-left" />
                              </a>
                            </li>

                            {Array.from(
                              { length: pagination.last_page || 1 }, // prevent undefined error
                              (_, i) => i + 1
                            ).map((page) => (
                              <li
                                key={page}
                                className={
                                  page === pagination.current_page
                                    ? "active"
                                    : ""
                                }
                              >
                                <a onClick={() => fetchProductList(page)}>
                                  {page}
                                </a>
                              </li>
                            ))}

                            <li>
                              <a
                                onClick={() =>
                                  pagination.current_page <
                                    pagination.last_page &&
                                  fetchProductList(pagination.current_page + 1)
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
                  <Footer></Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
