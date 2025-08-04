import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({});
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(
          `${apiBase}/api/customers?limit=${limit}&page=${page}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message });
          setTimeout(() => setErrors({ general: "" }), 5000);
        }

        console.log(data.data);

        setCustomers(data.data);
        setPagination({
          currentPage: data.current_page,
          lastPage: data.last_page,
          total: data.total,
        });
      } catch (err) {
        setErrors({ general: "Failed to fetch customers" });
        setTimeout(() => setErrors({ general: "" }), 5000);
      } finally {
        setLoading(false);
      }
    };

    getCustomers();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      setPage(newPage);
    }
  };

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
                      <h3>All Customers</h3>
                      <ul className="breadcrumbs flex items-center gap10">
                        <li>
                          <a href="/">
                            <div className="text-tiny">Dashboard</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right"></i>
                        </li>
                        <li>
                          <div className="text-tiny">Customers</div>
                        </li>
                      </ul>
                    </div>

                    {errors.general && (
                      <div className="alert alert-danger">{errors.general}</div>
                    )}

                    <div className="wg-box">
                      <div className="wg-filter flex-grow">
                        <form
                          className="form-search"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <fieldset className="name">
                            <input
                              type="text"
                              placeholder="Search here..."
                              name="name"
                              autoComplete="off"
                            />
                          </fieldset>
                          <div className="button-submit">
                            <button type="submit">
                              <i className="icon-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className="wg-table table-all-user">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Name</div>
                          </li>
                          <li>
                            <div className="body-title">Email</div>
                          </li>
                          <li>
                            <div className="body-title">Verified At</div>
                          </li>
                          <li>
                            <div className="body-title">Role</div>
                          </li>
                          <li>
                            <div className="body-title">Date</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          {customers.map((user, index) => (
                            <li key={index} className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-6.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    {user.name || "example.com"}
                                  </a>
                                  <div className="text-tiny mt-3">
                                    {user.email}
                                  </div>
                                </div>
                                <div className="body-text">
                                  {user.email}
                                </div>
                                <div className="body-text">
                                  {user.email_verified_at || "Unverified"}
                                </div>
                                <div className="body-text">{user.role}</div>
                                <div className="body-text">
                                  {new Date(user.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
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
                      </div>

                      <div className="divider"></div>
                      <div className="flex items-center justify-between flex-wrap gap10">
                        <div className="text-tiny">
                          Showing page {pagination.currentPage} of{" "}
                          {pagination.lastPage}
                        </div>
                        <ul className="wg-pagination">
                          <li>
                            <a
                              href="#"
                              onClick={() => handlePageChange(page - 1)}
                            >
                              <i className="icon-chevron-left"></i>
                            </a>
                          </li>
                          {[...Array(pagination.lastPage)].map((_, i) => (
                            <li
                              key={i}
                              className={
                                pagination.currentPage === i + 1 ? "active" : ""
                              }
                            >
                              <a
                                href="#"
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </a>
                            </li>
                          ))}
                          <li>
                            <a
                              href="#"
                              onClick={() => handlePageChange(page + 1)}
                            >
                              <i className="icon-chevron-right"></i>
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
    </div>
  );
}
