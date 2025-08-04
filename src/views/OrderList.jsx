import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function OrderList() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <title>Orders - Sika's Clothing</title>

      {/* <meta name="author" content="themesflat.com" />

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
      <link rel="apple-touch-icon-precomposed" href="images/favicon.png" /> */}

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
                        <h3>Order List</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div className="text-tiny">Order</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Order List</div>
                          </li>
                        </ul>
                      </div>

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
                                  tabIndex="2"
                                  value=""
                                  aria-required="true"
                                  onChange={() => null}
                                />
                              </fieldset>
                              <div className="button-submit">
                                <button className="" type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <a
                            className="tf-button style-1 w208"
                            href="oder-detail.html"
                          >
                            <i className="icon-file-text"></i>Export all order
                          </a>
                        </div>
                        <div className="wg-table table-all-category">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Product</div>
                            </li>
                            <li>
                              <div className="body-title">Order ID</div>
                            </li>
                            <li>
                              <div className="body-title">Price</div>
                            </li>
                            <li>
                              <div className="body-title">Quantity</div>
                            </li>
                            <li>
                              <div className="body-title">Payment</div>
                            </li>
                            <li>
                              <div className="body-title">Status</div>
                            </li>
                            <li>
                              <div className="body-title">Tracking</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>
                          <ul className="flex flex-column">
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/51.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/52.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-pending">Pending</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/53.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/54.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/55.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-not-available">
                                    Cancel
                                  </div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/56.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-not-available">
                                    Cancel
                                  </div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/57.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/58.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/59.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                            <li className="product-item gap14">
                              <div className="image no-bg">
                                <img src="/assets/images/products/60.png" alt="" />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a
                                    href="product-list.html"
                                    className="body-title-2"
                                  >
                                    Kristin Watson
                                  </a>
                                </div>
                                <div className="body-text">#7712309</div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="body-text">20</div>
                                <div>
                                  <div className="block-available">Success</div>
                                </div>
                                <div>
                                  <div className="block-tracking">Tracking</div>
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
                          </ul>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">Showing 10 entries</div>
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

        {/* <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-select.min.js"></script>
        <script src="js/zoom.js"></script>
        <script src="js/switcher.js"></script>
        <script src="js/theme-settings.js"></script>
        <script src="js/main.js"></script> */}
      </div>
    </>
  );
}
