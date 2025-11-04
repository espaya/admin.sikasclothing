import { useParams } from "react-router-dom";
import AddDiscountForm from "../components/AddDiscountForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditDiscountForm from "../components/discount/EditDiscountForm";

export default function AddDiscount() {
  const { id } = useParams();
  return (
    <>
      <meta charSet="utf-8" />

      <title>Add Discount - Sika's Clothing</title>
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
                      <h3>{id ? "Edit Discount" : "Add Discount"}</h3>
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
                          <div className="text-tiny">
                            {id ? "Edit Discount" : "Add Discount"}
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* form-add-product */}
                    {id ? <EditDiscountForm /> : <AddDiscountForm />}
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
