import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function Brand() {
  const [brandOptions, setBrandOptions] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBrands = async (page = 1) => {
      try {
        setLoading(true);

        const response = await fetch(`${apiBase}/api/get-brands?=${page}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        // console.log(data);

        setBrandOptions(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
        });
      } catch (err) {
        console.log("error fetching brands");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <title>Brands - Sika's Clothing</title>
      <meta name="author" content="themesflat.com" />
      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar/>
            <div className="section-content-right">
              <Header/>
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>Brand List</h3>
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
                            <div className="text-tiny">Brand</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Brand List</div>
                        </li>
                      </ul>
                    </div>
                    {/* order-list */}
                    <div className="wg-box">
                      <div className="flex items-center justify-between gap10 flex-wrap">
                        <div className="wg-filter flex-grow">
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
                          href="/sc-dashboard/product/add-brand"
                        >
                          <i className="icon-plus" />
                          Add New
                        </a>
                      </div>
                      <div className="wg-table table-all-category">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Logo</div>
                          </li>
                          <li>
                            <div className="body-title">Name</div>
                          </li>
                          <li>
                            <div className="body-title">Description</div>
                          </li>
                          <li>
                            <div className="body-title">status</div>
                          </li>
                          <li>
                            <div className="body-title">Featured</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          {brandOptions.length > 0 ? (
                            brandOptions.map((brand, index) => (
                              <li key={index} className="product-item gap14">
                                {/* Brand Item Structure */}
                                <div className="image no-bg">
                                  <img
                                    src={`${apiBase}/storage/${brand.logo}`}
                                    alt={brand.name}
                                  />
                                </div>
                                <div className="flex items-center justify-between gap20 flex-grow">
                                  <div className="body-text">
                                    <a
                                      target="_blank"
                                      href={brand.website || "#"}
                                      rel="noopener noreferrer"
                                    >
                                      {brand.name}
                                    </a>
                                  </div>
                                  <div className="body-text">
                                    {brand.description || ""}
                                  </div>
                                  <div className="body-text">20</div>
                                  <div>
                                    <div className="block-available">
                                      {brand.status}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="block-tracking">
                                      {brand.is_featured === "1" ? "Yes" : "No"}
                                    </div>
                                  </div>
                                  <div className="list-icon-function">
                                    <div className="item eye">
                                      <i className="icon-eye" />
                                    </div>
                                    <Link
                                      to={`/sc-dashboard/product/edit-brand/${brand.slug}`}
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
                          ) : (
                            <p className="alert alert-info">
                              No brands available.
                            </p>
                          )}
                        </ul>
                      </div>
                      <div className="divider" />
                      <div className="flex items-center justify-between flex-wrap gap10 mt-4">
                        <div className="text-tiny">
                          Page {pagination.current_page} of{" "}
                          {pagination.last_page}
                        </div>
                        <ul className="wg-pagination">
                          <li>
                            <a
                              onClick={() =>
                                fetchBrands(pagination.current_page - 1)
                              }
                              disabled={pagination.current_page === 1}
                            >
                              <i className="icon-chevron-left" />
                            </a>
                          </li>
                          {Array.from(
                            { length: pagination.last_page },
                            (_, i) => i + 1
                          ).map((page) => (
                            <li
                              key={page}
                              className={
                                page === pagination.current_page ? "active" : ""
                              }
                            >
                              <a onClick={() => fetchBrands(page)}>{page}</a>
                            </li>
                          ))}
                          <li>
                            <a
                              onClick={() =>
                                fetchBrands(pagination.current_page + 1)
                              }
                              disabled={
                                pagination.current_page === pagination.last_page
                              }
                            >
                              <i className="icon-chevron-right" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /order-list */}
                  </div>
                  {/* /main-content-wrap */}
                </div>
                {/* /main-content-wrap */}
                {/* bottom-page */}
                <Footer></Footer>
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
