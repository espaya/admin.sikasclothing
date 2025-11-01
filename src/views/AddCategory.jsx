import { useParams } from "react-router-dom";
import AddCategoryForm from "../components/AddCategoryForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EditCategoryForm from "../components/EditCategoryForm";

export default function AddCateogry() {
  const { slug } = useParams();

  return (
    <>
      <meta charSet="utf-8"></meta>

      <title>Add Category - Sika's Clothing</title>
      <div id="wrapper">
        <div id="page" className="">
          <div className="layout-wrap">
            <Sidebar />
            <div className="section-content-right">
              <Header />
              <div className="main-content">
                <div className="main-content-inner">
                  <div className="main-content-wrap">
                    <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                      <h3>{slug ? "Edit Category" : "New Category"}</h3>
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
                            <div className="text-tiny">Category</div>
                          </a>
                        </li>
                        <li>
                          <i className="icon-chevron-right" />
                        </li>
                        <li>
                          <div className="text-tiny">
                            {slug ? "Edit Category" : "New category"}
                          </div>
                        </li>
                      </ul>
                    </div>
                    {slug ? <EditCategoryForm /> : <AddCategoryForm />}
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
