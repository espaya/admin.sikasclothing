import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Brand() {
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    const fetchBrandOptions = async (e) => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiBase}/api/get-brands`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setBrandOptions(data.data);
        }
      } catch (err) {
        console.log("error fetching brands");
      }
    };
    fetchBrandOptions();
  }, []);

  return (
    <>
      <meta charSet="utf-8" />
      <title>Brands - Sika's Clothing</title>
      <meta name="author" content="themesflat.com" />
      {/* Mobile Specific Metas */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      {/* Theme Style */}
      <link rel="stylesheet" type="text/css" href="css/animate.min.css" />
      <link rel="stylesheet" type="text/css" href="css/animation.css" />
      <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="css/bootstrap-select.min.css"
      />
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      {/* Font */}
      <link rel="stylesheet" href="font/fonts.css" />
      {/* Icon */}
      <link rel="stylesheet" href="icon/style.css" />
      {/* Favicon and Touch Icons  */}
      <link rel="shortcut icon" href="images/favicon.png" />
      <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
      {/* #wrapper */}
      <div id="wrapper">
        {/* #page */}
        <div id="page" className="">
          {/* layout-wrap */}
          <div className="layout-wrap">
            {/* section-menu-left */}
            <Sidebar></Sidebar>
            {/* /section-menu-left */}
            {/* section-content-right */}
            <div className="section-content-right">
              {/* header-dashboard */}
              <Header></Header>
              {/* /header-dashboard */}
              {/* main-content */}
              <div className="main-content">
                {/* main-content-wrap */}
                <div className="main-content-inner">
                  {/* main-content-wrap */}
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
                          {brandOptions && brandOptions.length > 0 ? (
                            brandOptions.map((brand, index) => (
                              <li key={index} className="product-item gap14">
                                <div className="image no-bg">
                                  <img src="images/products/51.png" alt="" />
                                </div>
                                <div className="flex items-center justify-between gap20 flex-grow">
                                  <div className="name">
                                    <a
                                      href="product-list.html"
                                      className="body-title-2"
                                    >
                                      {brand.logo}
                                    </a>
                                  </div>
                                  <div className="body-text">
                                    <a
                                      target="_blank"
                                      href={brand.website ? brand.website : "#"}
                                      rel="noopener noreferrer"
                                    >
                                      {brand.name}
                                    </a>
                                  </div>
                                  <div className="body-text">
                                    {brand.description}
                                  </div>
                                  <div className="body-text">20</div>
                                  <div>
                                    <div className="block-available">
                                      {brand.status}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="block-tracking">
                                      {brand.is_featured}
                                    </div>
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
                            <p className="alert alert-info">No brands available.</p>
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
