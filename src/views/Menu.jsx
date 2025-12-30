import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMenus = async (e) => {
      setLoading(true);

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");

        const response = await fetch(`${apiBase}/api/get-menus`, {
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
          setErors({ general: data.message });
          return;
        }
        setMenus(data.data || []);
      } catch (err) {
        setErors({ general: err });
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  return (
    <>
      <title>Menus - Sika's Clothing</title>

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
                        <h3>List Menu</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
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
                              <div className="text-tiny">Menu</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">List Menu</div>
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
                            <div className="flex gap10">
                              <div className="select w200">
                                <select className="">
                                  <option>Bulk Action</option>
                                  <option>Action 1</option>
                                  <option>Action 2</option>
                                </select>
                              </div>
                              <button className="tf-button style-1 w128">
                                Filters
                              </button>
                            </div>
                            <form className="form-search">
                              <fieldset className="name">
                                <input
                                  type="text"
                                  placeholder="Search here..."
                                  className=""
                                  name="name"
                                  tabindex="2"
                                  value=""
                                  aria-required="true"
                                  required=""
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
                            to={PATHS.ADDMENU}
                            className="tf-button style-1 w208"
                          >
                            <i className="icon-plus"></i>New
                          </Link>
                        </div>
                        <div className="wg-table table-countries wrap-checkbox">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <input
                                className="total-checkbox"
                                type="checkbox"
                              />
                            </li>
                            <li>
                              <div className="body-title">Order</div>
                            </li>
                            <li>
                              <div className="body-title">Title</div>
                            </li>
                            <li>
                              <div className="body-title">Source Type</div>
                            </li>
                            <li>
                              <div className="body-title">Source ID</div>
                            </li>
                            <li>
                              <div className="body-title">Custom Url</div>
                            </li>
                            <li>
                              <div className="body-title">Location</div>
                            </li>
                            <li>
                              <div className="body-title">Parent</div>
                            </li>
                            <li>
                              <div className="body-title">Active</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <ul className="flex flex-column">
                              {menus.length > 0 ? (
                                menus.map((menu) => (
                                  <li className="countries-item" key={menu.id}>
                                    <div>
                                      <input
                                        className="checkbox-item"
                                        type="checkbox"
                                      />
                                    </div>
                                    <div className="body-text">
                                      #{menu.order}
                                    </div>
                                    <div className="body-text">
                                      {menu.title}
                                    </div>
                                    <div className="body-text">
                                      {menu.source_type}
                                    </div>
                                    <div className="body-text">
                                      {menu.source_id ?? "-"}
                                    </div>
                                    <div className="body-text">
                                      {menu.custom_url ?? "-"}
                                    </div>
                                    <div className="body-text">
                                      {menu.location}
                                    </div>
                                    <div className="body-text">
                                      {menu.parent_id ?? "-"}
                                    </div>
                                    <div>
                                      <div
                                        className={
                                          menu.is_active
                                            ? "block-published"
                                            : "block-unpublished"
                                        }
                                      >
                                        {menu.is_active
                                          ? "Published"
                                          : "Unpublished"}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="list-icon-function">
                                        <Link to={`/sc-dashboard/menu/edit/${menu.id}`}>
                                          <div className="item edit">
                                            <i className="icon-edit-3"></i>
                                          </div>
                                        </Link>
                                        <div className="item trash">
                                          <i className="icon-trash-2"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <li className="body-text">No menus found</li>
                              )}
                            </ul>
                          )}
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">
                            Showing 10 to 16 in 16 records
                          </div>
                          <ul className="wg-pagination">
                            <li>
                              <a href="#">
                                <i className="icon-chevron-left"></i>
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
      </div>
    </>
  );
}
