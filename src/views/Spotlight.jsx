import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Spotlight() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [spotlights, setSpotlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Utility to validate CSS color formats
  const isValidColor = (color) => {
    if (!color) return false;
    const hexPattern = /^#([A-Fa-f0-9]{3}){1,2}$/;
    const rgbPattern = /^rgb\(\s*(\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*\)$/;
    const hslPattern = /^hsl\(\s*(\d{1,3}%?\s*,\s*){2}\d{1,3}%?\s*\)$/;
    return (
      hexPattern.test(color) || rgbPattern.test(color) || hslPattern.test(color)
    );
  };

  useEffect(() => {
    const fetchSpotlight = async () => {
      setLoading(true);

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(`${apiBase}/api/get-spotlight`, {
          credentials: "include",
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setSpotlights(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchSpotlight();
  }, []);

  return (
    <>
      <title>All Spotlight - Sika's Clothing</title>

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
                      <h3>Spotlight List</h3>
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
                          <div className="text-tiny">Spotlight List</div>
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
                            <div className="body-title">Title</div>
                          </li>
                          <li>
                            <div className="body-title">Link Text </div>
                          </li>
                          <li>
                            <div className="body-title">Link Url</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>

                        <ul className="flex flex-column">
                          {loading ? (
                            <li className="flex justify-center py-5">
                              Loading...
                            </li>
                          ) : spotlights.length === 0 ? (
                            <li className="flex justify-center py-5 text-gray-500">
                              No Spotlights found
                            </li>
                          ) : (
                            spotlights.map((spotlight) => (
                              <li
                                key={spotlight.id}
                                className="product-item gap14"
                              >
                                <div className="image no-bg">
                                  {spotlight.bg_image ? (
                                    <img
                                      src={`${apiBase}/storage/spotlight/${spotlight.bg_image}`}
                                      alt={spotlight.title}
                                    />
                                  ) : (
                                    <div
                                      style={{
                                        width: "100px",
                                        height: "50px",
                                        backgroundColor: isValidColor(
                                          spotlight.bg_color
                                        )
                                          ? spotlight.bg_color
                                          : "#ccc",
                                      }}
                                    />
                                  )}
                                </div>

                                <div className="flex items-center justify-between gap20 flex-grow">
                                  <div className="name">
                                    <a
                                      href={spotlight.link_url}
                                      className="body-title-2"
                                    >
                                      {spotlight.title}
                                    </a>
                                  </div>
                                  <div className="body-text">
                                    {spotlight.link_text}
                                  </div>
                                  <div className="body-text">
                                    <a
                                      target="_blank"
                                      href={spotlight.link_url}
                                    >
                                      {spotlight.link_url}
                                    </a>
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
                    {/* /product-list */}
                  </div>
                  {/* /main-content-wrap */}
                </div>
                {/* /main-content-wrap */}
                {/* bottom-page */}
                <Footer />
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
