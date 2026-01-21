import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { PATHS } from "../router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getAllPosts from "../controllers/GetAllPosts";

export default function AllPosts() {
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
        const response = await fetch(`${apiBase}/api/blog/delete/${postID}`, {
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
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  useEffect(() => {
    getAllPosts(setErrors, setAllPost, setLoading, apiBase, currentPage);
  }, [currentPage]);

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
                            {loading && (
                              <li className="user-item">
                                <div className="body-text">
                                  Loading posts...
                                </div>
                              </li>
                            )}

                            {!loading && allPost?.data?.length === 0 && (
                              <li className="user-item">
                                <div className="body-text">No posts found</div>
                              </li>
                            )}

                            {!loading &&
                              allPost?.data?.map((post) => (
                                <li key={post.id} className="user-item gap14">
                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    {/* Title + Category */}
                                    <div className="name">
                                      <Link
                                        to={`/sc-dashboard/blog/create/${post.slug}`}
                                        className="body-title-2"
                                      >
                                        {post.title}
                                      </Link>
                                      <div className="text-tiny mt-3">
                                        {post?.category?.category_name}
                                      </div>
                                    </div>

                                    {/* Excerpt */}
                                    <div className="body-text">
                                      {post.content.substring(0, 50)}...
                                    </div>

                                    {/* Date */}
                                    <div className="body-text">
                                      {new Date(post.created_at).toDateString()}
                                    </div>

                                    {/* Status */}
                                    <div className="body-text">
                                      {post.status === "published"
                                        ? "Published"
                                        : "Draft"}
                                    </div>

                                    {/* Actions */}
                                    <div className="list-icon-function">
                                      {/* <Link
                                        to={`${PATHS.VIEW_POST}/${post.slug}`}
                                        className="item eye"
                                      >
                                        <i className="icon-eye"></i>
                                      </Link> */}

                                      <Link
                                        to={`/sc-dashboard/blog/create/${post.slug}`}
                                        className="item edit"
                                      >
                                        <i className="icon-edit-3"></i>
                                      </Link>

                                      <div className="item trash">
                                        <i
                                          onClick={() => deletePost(post.id)}
                                          className="icon-trash-2"
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">
                            Showing {allPost.from}–{allPost.to} of{" "}
                            {allPost.total} entries
                          </div>

                          <ul className="wg-pagination">
                            {/* Previous */}
                            <li
                              className={
                                allPost.prev_page_url ? "" : "disabled"
                              }
                            >
                              <a
                                disabled={!allPost.prev_page_url}
                                onClick={() => setCurrentPage(currentPage - 1)}
                              >
                                <i className="icon-chevron-left"></i>
                              </a>
                            </li>

                            {/* Page Numbers */}
                            {allPost?.links
                              ?.filter((link) => !isNaN(link.label))
                              .map((link) => (
                                <li
                                  key={link.label}
                                  className={link.active ? "active" : ""}
                                >
                                  <a
                                    onClick={() =>
                                      setCurrentPage(Number(link.label))
                                    }
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}

                            {/* Next */}
                            <li
                              className={
                                allPost.next_page_url ? "" : "disabled"
                              }
                            >
                              <a
                                disabled={!allPost.next_page_url}
                                onClick={() => setCurrentPage(currentPage + 1)}
                              >
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
