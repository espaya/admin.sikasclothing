import AddDiscountForm from "../components/AddDiscountForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AddDiscount() {
  return (
    <>
      <meta charSet="utf-8" />

      <title>Add Discount - Sika's Clothing</title>
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
            <Sidebar></Sidebar>
            <div className="section-content-right">
              <Header></Header>
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>Add Discount</h3>
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
                          <div className="text-tiny">Add discount</div>
                        </li>
                      </ul>
                    </div>
                    {/* form-add-product */}
                    <AddDiscountForm></AddDiscountForm>
                  </div>
                </div>
                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
