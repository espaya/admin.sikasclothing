import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default function Hero() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [heros, setHeros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchHeros = async () => {
      setLoading({});

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(`${apiBase}/api/get-hero`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setHeros(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchHeros();
  }, []);

  return (
    <>
      <title>Hero - Sika's Clothing</title>
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
                      <h3>Hero List</h3>
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
                          <div className="text-tiny">Hero List</div>
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
                            <div className="body-title">Subtitle</div>
                          </li>
                          <li>
                            <div className="body-title">Text</div>
                          </li>
                          <li>
                            <div className="body-title">Button Text</div>
                          </li>
                          <li>
                            <div className="body-title">Created At</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          <ul className="list-products">
                            {loading ? (
                              <div className="flex justify-center items-center py-10">
                                <div className="loader" />
                              </div>
                            ) : (
                              heros.map((hero) => (
                                <li
                                  key={hero.id}
                                  className="product-item gap14"
                                >
                                  <div className="image no-bg">
                                    <img
                                      src={`${apiBase}/storage/heros/${hero.img}`}
                                      alt={hero.title}
                                    />
                                  </div>

                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    <div className="name">
                                      <a
                                        href={hero.btn_link}
                                        className="body-title-2"
                                      >
                                        {hero.title}
                                      </a>
                                    </div>
                                    <div className="body-text">
                                      {hero.subtitle}
                                    </div>
                                    <div className="body-text">{hero.text}</div>
                                    <div className="body-text">
                                      {hero.btn_text}
                                    </div>
                                    <div className="body-text">
                                      {new Date(
                                        hero.created_at
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </div>
                                    <div className="list-icon-function">
                                      <div className="item eye">
                                        <i className="icon-eye" />
                                      </div>

                                      <Link
                                        to={`/sc-dashboard/hero/edit-hero/${hero?.id}`}
                                      >
                                        <div className="item edit">
                                          <i className="icon-edit-3" />
                                        </div>
                                      </Link>

                                      <div className="item trash">
                                        <i className="icon-trash-2" />
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
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
