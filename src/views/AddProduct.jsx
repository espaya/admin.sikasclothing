import AddProductForm from "../components/AddProductForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditProductForm from "../components/product/EditProductForm";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function AddProduct() {
  const { slug } = useParams();
  return (
    <>
      <title>Add Product - Sika's Clothing</title>

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
                        {slug ? <h3>Edit Product</h3> : <h3>Add Product</h3>}
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <Link to={PATHS.ADMIN}>
                              <div className="text-tiny">Dashboard</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <Link to={PATHS.PRODUCTLIST}>
                              <div className="text-tiny">Product List</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            {slug ? (
                              <div className="text-tiny">Edit product</div>
                            ) : (
                              <div className="text-tiny">Add product</div>
                            )}
                          </li>
                        </ul>
                      </div>
                      {slug ? <EditProductForm /> : <AddProductForm />}
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
