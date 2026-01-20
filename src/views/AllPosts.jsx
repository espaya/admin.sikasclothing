import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { PATHS } from "../router";
import Swal from "sweetalert2";
import { useState } from "react";
import Cookies from "js-cookie";

export default function AllPosts() {
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");

  const deletePost = async (postID) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this post?",
        confirmButtonText: "Yes, delete",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Cancel",
        icon: "warning",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        // delete post
        const response = await fetch(`${apiBase}/api/`, {
          credentials: "include",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors(data.message);
          return;
        }

        setSuccessMsg(data.message);

        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      }
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <>
      <div className="body">
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
                        <h3>All Posts</h3>
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
                            <Link to={PATHS.BLOG}>
                              <div className="text-tiny">Blog</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">All Posts</div>
                          </li>
                        </ul>
                      </div>
                      {successMsg && (
                        <p className="alert alert-success">{successMsg}</p>
                      )}
                      {errors.general && (
                        <p className="alert alert-danger"> {errors.general} </p>
                      )}
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
                                  tabindex="2"
                                  value=""
                                  aria-required="true"
                                  required=""
                                />
                              </fieldset>
                              <div className="button-submit">
                                <button className="" type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <Link
                            className="tf-button style-1 w208"
                            to={PATHS.CREATE_POST}
                          >
                            <i className="icon-plus"></i>Add new
                          </Link>
                        </div>
                        <div className="wg-table table-all-user">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Title</div>
                            </li>
                            <li>
                              <div className="body-title">Excerpt</div>
                            </li>

                            <li>
                              <div className="body-title">Date</div>
                            </li>
                            <li>
                              <div className="body-title">Status</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>
                          <ul className="flex flex-column">
                            <li className="user-item gap14">
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Category name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>

                                <div className="body-text">Jan 1, 2026</div>
                                <div className="body-text">Active</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i
                                      onClick={() => deletePost(1)}
                                      className="icon-trash-2"
                                    ></i>
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
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
