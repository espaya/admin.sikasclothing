import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AddProduct() {
  return (
    <>
      <meta charSet="utf-8"></meta>
      <title>Add Product - Sika's Clothing</title>

      <meta name="author" content="themesflat.com"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <link rel="stylesheet" type="text/css" href="css/animate.min.css"></link>
      <link rel="stylesheet" type="text/css" href="css/animation.css"></link>
      <link rel="stylesheet" type="text/css" href="css/bootstrap.css"></link>
      <link
        rel="stylesheet"
        type="text/css"
        href="css/bootstrap-select.min.css"
      ></link>
      <link rel="stylesheet" type="text/css" href="css/style.css"></link>
      <link rel="stylesheet" href="font/fonts.css"></link>
      <link rel="stylesheet" href="icon/style.css"></link>
      <link rel="shortcut icon" href="images/favicon.png"></link>
      <link rel="apple-touch-icon-precomposed" href="images/favicon.png"></link>

      <div className="body">
        <div id="wrapper">
          <div id="page" className="">
            <div className="layout-wrap">
              <div id="preload" className="preload-container">
                <div className="preloading">
                  <span></span>
                </div>
              </div>
              <Sidebar></Sidebar>
              <div className="section-content-right">
                <Header></Header>
                <div className="main-content">
                  <div className="main-content-inner">
                    <div className="main-content-wrap">
                      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Add Product</h3>
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
                              <div className="text-tiny">Ecommerce</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Add product</div>
                          </li>
                        </ul>
                      </div>
                      <AddProductForm></AddProductForm>
                    </div>
                  </div>
                  <Footer></Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-select.min.js"></script>
        <script src="js/zoom.js"></script>
        <script src="js/switcher.js"></script>
        <script src="js/theme-settings.js"></script>
        <script src="js/main.js"></script>
      </div>
    </>
  );
}
