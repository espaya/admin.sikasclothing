import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { PATHS } from "../router";
import { Link } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const [perPage, setPerPage] = useState(10);

  const fetchCategories = async (page = 1, limit = 10) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL;
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const res = await fetch(
        `${apiBase}/api/get-category?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();

      setCategories(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
      });
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories(pagination.current_page, perPage);
  }, [pagination.current_page, perPage]);

  return (
    <>
      <meta charSet="utf-8"></meta>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"></meta>
      <title>Add Category - Sika's Clothing</title>
      <meta name="author" content="themesflat.com"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>

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
                        <h3>All category</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div className="text-tiny">Category</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">All category</div>
                          </li>
                        </ul>
                      </div>

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
                                  tabIndex="2"
                                  value=""
                                  aria-required="true"
                                  onChange={() => null}
                                  autoComplete="off"
                                ></input>
                              </fieldset>
                              <div className="button-submit">
                                <button className="" type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <a
                            className="tf-button style-1 w208"
                            href="/sc-dashboard/product/add-category"
                          >
                            <i className="icon-plus"></i>Add new
                          </a>
                        </div>
                        <div className="wg-table table-all-category">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Category</div>
                            </li>
                            <li>
                              <div className="body-title">Featured</div>
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
                          <ul className="flex flex-column">
                            {Array.isArray(categories) &&
                            categories.length > 0 ? (
                              categories.map((category) => (
                                <li
                                  className="product-item gap14"
                                  key={category.id}
                                >
                                  <div className="image no-bg">
                                    <img
                                      src={
                                        category.image
                                          ? `${
                                              import.meta.env.VITE_API_URL
                                            }/storage/${category.image}`
                                          : "/assets/images/products/default.png"
                                      }
                                      alt={category.name}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    <div className="name">
                                      <a href="#" className="body-title-2">
                                        {category.name}
                                      </a>
                                    </div>
                                    <div className="body-text">
                                      {category.is_featured == "1"
                                        ? "Yes"
                                        : "No"}
                                    </div>
                                    <div className="body-text">
                                      {category.status.charAt(0).toUpperCase() +
                                        category.status.slice(1)}
                                    </div>
                                    <div className="body-text">
                                      {new Date(
                                        category.created_at
                                      ).toLocaleDateString()}
                                    </div>
                                    <div className="list-icon-function">
                                      <div className="item eye">
                                        <i className="icon-eye"></i>
                                      </div>

                                      <Link
                                        to={`/sc-dashboard/product/edit-category/${category.slug}`}
                                      >
                                        <div className="item edit">
                                          <i className="icon-edit-3"></i>
                                        </div>
                                      </Link>
                                      {category.slug === "general" ? (
                                        ""
                                      ) : (
                                        <div className="item trash">
                                          <i className="icon-trash-2"></i>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p className="alert alert-info">
                                No categories found.
                              </p>
                            )}
                          </ul>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">
                            Showing page {pagination.current_page} of{" "}
                            {pagination.last_page}
                          </div>
                          <ul className="wg-pagination">
                            <li>
                              <a
                                disabled={pagination.current_page === 1}
                                onClick={() =>
                                  setPagination((prev) => ({
                                    ...prev,
                                    current_page: prev.current_page - 1,
                                  }))
                                }
                              >
                                <i className="icon-chevron-left"></i>
                              </a>
                            </li>
                            {[...Array(pagination.last_page)].map((_, i) => (
                              <li
                                key={i + 1}
                                className={
                                  pagination.current_page === i + 1
                                    ? "active"
                                    : ""
                                }
                              >
                                <a
                                  onClick={() =>
                                    setPagination((prev) => ({
                                      ...prev,
                                      current_page: i + 1,
                                    }))
                                  }
                                >
                                  {i + 1}
                                </a>
                              </li>
                            ))}
                            <li>
                              <a
                                disabled={
                                  pagination.current_page ===
                                  pagination.last_page
                                }
                                onClick={() =>
                                  setPagination((prev) => ({
                                    ...prev,
                                    current_page: prev.current_page + 1,
                                  }))
                                }
                              >
                                <i className="icon-chevron-right"></i>
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

        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-select.min.js"></script>
        <script src="js/zoom.js"></script>
        <script src="js/switcher.js"></script>
        <script src="js/theme-settings.js"></script>
        <script src="js/main.js"></script>
      </div>
    </>
  );
}
