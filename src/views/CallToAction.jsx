import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CallToAction() {
  const [callToActions, setCallToAction] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCallToActions = async () => {
      setLoading(true);
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const response = await fetch(`${apiBase}/api/get-call-to-actions`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken || ""),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message || "Failed to load" });
        } else {
          setCallToAction(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchCallToActions(); // ✅ Call the function
  }, [apiBase]);
  return (
    <>
      <title>Call to action - Sika's Clothing</title>

      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>Call to action</h3>
                      <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                        <li>
                          <a href="#">
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
                          <div className="text-tiny">Call to action</div>
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
                            <div className="body-title">Title</div>
                          </li>
                          <li>
                            <div className="body-title">Subtitle</div>
                          </li>
                          <li>
                            <div className="body-title">Button Text</div>
                          </li>
                          <li>
                            <div className="body-title">Actions</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          {callToActions.length > 0 ? (
                            callToActions.map((cta) => (
                              <li className="product-item gap14" key={cta.id}>
                                <div className="image no-bg">
                                  <img
                                    src={`${apiBase}/storage/call_to_action/${cta.bg_image}`}
                                    alt={cta.title}
                                  />
                                </div>
                                <div className="flex items-center justify-between gap20 flex-grow">
                                  <div className="name">
                                    <span className="body-title-2">
                                      <a href={cta.btn_url}>{cta.title}</a>
                                    </span>
                                  </div>
                                  <div className="body-text">
                                    {cta.subtitle}
                                  </div>
                                  <div className="body-text">
                                    {cta.btn_text}
                                  </div>
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
                            ))
                          ) : (
                            <li>No call to actions found</li>
                          )}
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
