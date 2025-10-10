import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import fetchCategory from "../controllers/PostCategoryController";
import Spinner from "../components/Spinner";

export default function PostCategory() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
 

  useEffect(() => {
    fetchCategory(setCategories, setPagination, setLoading, setErrors, apiBase);
  }, []);

  return (
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
                      <h3>Post Category</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap gap10">
                        <li>
                          <a href="#">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">
                            <div className="text-tiny">Blog</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right"></i>
                        </li>
                        <li>
                          <div className="text-tiny">Post Category</div>
                        </li>
                      </ul>
                    </div>

                    <div className="wg-box">
                      {loading ? (
                        <Spinner/>
                      ) : errors.general ? (
                        <p className="text-red-500">{errors.general}</p>
                      ) : (
                        <>
                          <div className="wg-table table-all-user">
                            <ul className="table-title flex gap20 mb-14">
                              <li>
                                <div className="body-title">Image</div>
                              </li>
                              <li>
                                <div className="body-title">Name</div>
                              </li>
                              <li>
                                <div className="body-title">Status</div>
                              </li>
                              <li>
                                <div className="body-title">Description</div>
                              </li>
                              <li>
                                <div className="body-title">Action</div>
                              </li>
                            </ul>

                            <ul className="flex flex-column">
                              {categories.length === 0 ? (
                                <li className="user-item">
                                  No categories found.
                                </li>
                              ) : (
                                categories.map((cat) => (
                                  <li key={cat.id} className="user-item gap14">
                                    <div className="image">
                                      {cat.featured_image ? (
                                        <img
                                          src={`${apiBase}/storage/${cat.featured_image}`}
                                          alt={cat.category_name}
                                          width="50"
                                          height="50"
                                        />
                                      ) : (
                                        <img
                                          src="/assets/images/no-image.png"
                                          alt="No Image"
                                          width="50"
                                          height="50"
                                        />
                                      )}
                                    </div>

                                    <div className="flex items-center justify-between gap20 flex-grow">
                                      <div className="name">
                                        <span className="body-title-2">
                                          {cat.category_name}
                                        </span>
                                      </div>
                                      <div className="body-text">
                                        {cat.status}
                                      </div>
                                      <div className="body-text">
                                        {cat.description}
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
                                ))
                              )}
                            </ul>
                          </div>

                          <div className="divider"></div>
                          <div className="flex items-center justify-between flex-wrap gap10">
                            <div className="text-tiny">
                              Showing {categories.length} of {pagination.total}{" "}
                              entries
                            </div>
                            <ul className="wg-pagination">
                              <li>
                                <a href="#">
                                  <i className="icon-chevron-left"></i>
                                </a>
                              </li>
                              {[...Array(pagination.last_page)].map(
                                (_, idx) => (
                                  <li
                                    key={idx + 1}
                                    className={
                                      pagination.current_page === idx + 1
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <a href="#">{idx + 1}</a>
                                  </li>
                                )
                              )}
                              <li>
                                <a href="#">
                                  <i className="icon-chevron-right"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </>
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
  );
}
