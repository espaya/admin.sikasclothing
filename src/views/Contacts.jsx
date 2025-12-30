import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import fetchContactUs from "../controllers/ContactUsController";
import Spinner from "../components/Spinner";

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [contactUs, setContactUs] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchContactUs(setLoading, apiBase, setErrors, setContactUs);
  }, []);

  return (
    <>
      <title>Contacts - Sika's Clothing</title>

      <div class="body">
        <div id="wrapper">
          <div id="page" class="">
            <div class="layout-wrap">
              <Sidebar />
              <div class="section-content-right">
                <Header />
                <div class="main-content">
                  <div class="main-content-inner">
                    <div class="main-content-wrap">
                      <div class="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Contacts</h3>
                        <ul class="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div class="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i class="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div class="text-tiny">Contacts</div>
                          </li>
                        </ul>
                      </div>

                      <div class="wg-box">
                        <div class="wg-table table-product-list">
                          <ul class="table-title flex gap20 mb-14">
                            <li>
                              <div class="body-title">Name</div>
                            </li>
                            <li>
                              <div class="body-title">Email</div>
                            </li>
                            <li>
                              <div class="body-title">Message</div>
                            </li>
                            <li>
                              <div class="body-title">Date</div>
                            </li>
                            <li>
                              <div class="body-title">Action</div>
                            </li>
                          </ul>
                          <ul class="flex flex-column">
                            {loading && <Spinner />}
                            {contactUs.length === 0 ? (
                              <></>
                            ) : (
                              contactUs.map((contact) => (
                                <li class="product-item gap14">
                                  <div class="image no-bg">
                                    <img
                                      src="/assets/images/products/41.png"
                                      alt=""
                                    />
                                  </div>
                                  <div class="flex items-center justify-between gap20 flex-grow">
                                    <div class="name">
                                      <a
                                        href="product-list.html"
                                        class="body-title-2"
                                      >
                                        {contact.name}
                                      </a>
                                    </div>
                                    <div class="body-text">{contact.email}</div>
                                    <div class="body-text">
                                      {contact.message}
                                    </div>
                                    <div class="body-text">
                                      {new Date(
                                        contact.created_at
                                      ).toDateString()}
                                    </div>

                                    <div class="list-icon-function">
                                      <div class="item eye">
                                        <i class="icon-eye"></i>
                                      </div>
                                      <div class="item trash">
                                        <i class="icon-trash-2"></i>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                        <div class="divider"></div>
                        <div class="flex items-center justify-between flex-wrap gap10">
                          <div class="text-tiny">
                            Showing {contactUs.length} of {pagination.total}{" "}
                            entries
                          </div>

                          <ul class="wg-pagination">
                            <li>
                              <a href="#">
                                <i class="icon-chevron-left"></i>
                              </a>
                            </li>

                            {[...Array(pagination.last_page)].map((_, idx) => (
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
                            ))}

                            <li>
                              <a href="#">
                                <i class="icon-chevron-right"></i>
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
    </>
  );
}
