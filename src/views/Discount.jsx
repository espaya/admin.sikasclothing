import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Discount() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>Discount - Sika's Clothing</title>
      <meta name="author" content="themesflat.com" />
   
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
    
      <link rel="stylesheet" type="text/css" href="css/animate.min.css" />
      <link rel="stylesheet" type="text/css" href="css/animation.css" />
      <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="css/bootstrap-select.min.css"
      />
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link rel="stylesheet" href="font/fonts.css" />
      <link rel="stylesheet" href="icon/style.css" />
      <link rel="shortcut icon" href="images/favicon.png" />
      <link rel="apple-touch-icon-precomposed" href="images/favicon.png" />
     
      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <div id="preload" className="preload-container">
              <div className="preloading">
                <span />
              </div>
            </div>
            <Sidebar></Sidebar>
            <div className="section-content-right">
              <Header></Header>
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>All Discounts</h3>
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
                            <div className="text-tiny">Discounts</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">All Discounts</div>
                        </li>
                      </ul>
                    </div>
                    {/* all-attribute */}
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
                          href="add-attributes.html"
                        >
                          <i className="icon-plus" />
                          Add new
                        </a>
                      </div>
                      <div className="wg-table table-all-attribute">
                        <ul className="table-title flex gap20 mb-14">
                          <li>
                            <div className="body-title">Category</div>
                          </li>
                          <li>
                            <div className="body-title">Value</div>
                          </li>
                          <li>
                            <div className="body-title">Action</div>
                          </li>
                        </ul>
                        <ul className="flex flex-column">
                          <li className="attribute-item flex items-center justify-between gap20">
                            <div className="name">
                              <a
                                href="add-attributes.html"
                                className="body-title-2"
                              >
                                Color
                              </a>
                            </div>
                            <div className="body-text">Blue, green, white</div>
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
                          </li>
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
                    {/* /all-attribute */}
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
