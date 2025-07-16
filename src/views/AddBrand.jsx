import AddBrandForm from "../components/AddBrandForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AddBrand() {
  return (
    <>
      <meta charSet="utf-8" />
      {/*[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]*/}
      <title>Add Brand - Sika's Clothing</title>
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
                      <h3>Add Brand</h3>
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
                            <div className="text-tiny">Brands</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">Add brand</div>
                        </li>
                      </ul>
                    </div>
                    {/* form-add-product */}
                    <AddBrandForm></AddBrandForm>
                    {/* /form-add-product */}
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
