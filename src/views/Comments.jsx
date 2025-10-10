import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import approveComment from "../controllers/ApproveComment";
import Swal from "sweetalert2";

export default function Comments() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Accept commentID as parameter
  const handleCommentApproval = async (commentID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this comment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await approveComment(
          setLoading,
          setErrors,
          commentID,
          apiBase,
          setSuccessMsg
        );
        // Refresh comments after approving
        fetchComments(pagination.current_page || 1);

        // Swal.fire({
        //   title: "Approved!",
        //   text: "The comment has been approved.",
        //   icon: "success",
        //   timer: 1500,
        //   showConfirmButton: false,
        // });
      }
    });
  };

  const fetchComments = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiBase}/api/blog/comments?page=${page}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }

      setComments(data.data); // API returns data inside `data`
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        links: data.links,
        total: data.total,
        from: data.from,
        to: data.to,
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <title>Comments - Sika's Clothing</title>

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
                        <h3>Comments</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="/">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div className="text-tiny">Blog</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Comments</div>
                          </li>
                        </ul>
                      </div>

                      {successMsg && (
                        <p className="alert alert-success"> {successMsg} </p>
                      )}

                      {errors.general && (
                        <p className="alert alert-danger">{errors.general}</p>
                      )}

                      <div className="wg-box">
                        <div className="wg-table table-product-list">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">Name</div>
                            </li>
                            <li>
                              <div className="body-title">Email</div>
                            </li>
                            <li>
                              <div className="body-title">Comment</div>
                            </li>
                            <li>
                              <div className="body-title">Status</div>
                            </li>
                            <li>
                              <div className="body-title">Date</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>

                          {loading ? (
                            <Spinner />
                          ) : comments.length > 0 ? (
                            comments.map((comment) => (
                              <ul key={comment.id} className="flex flex-column">
                                <li className="product-item gap14">
                                  <div className="image no-bg">
                                    <img
                                      src="/assets/images/avatar/user-1.png"
                                      alt="avatar"
                                    />
                                  </div>
                                  <div className="flex items-center justify-between gap20 flex-grow">
                                    <div className="name">
                                      <span className="body-title-2">
                                        {comment.comment_name}
                                      </span>
                                    </div>
                                    <div className="body-text">
                                      {comment.comment_email}
                                    </div>
                                    <div className="body-text">
                                      {comment.comment}
                                    </div>
                                    <div>
                                      <div
                                        className={
                                          comment.status === "approved"
                                            ? "block-available"
                                            : "block-not-available"
                                        }
                                      >
                                        {comment.status}
                                      </div>
                                    </div>
                                    <div className="body-text">
                                      {new Date(
                                        comment.created_at
                                      ).toLocaleString()}
                                    </div>
                                    <div className="list-icon-function">
                                      {comment.status === "unapproved" && (
                                        <div
                                          className="item eye"
                                          onClick={() =>
                                            handleCommentApproval(comment.id)
                                          }
                                        >
                                          <i
                                            title="Approve"
                                            className="icon-check-circle"
                                          ></i>
                                        </div>
                                      )}

                                      <div className="item trash">
                                        <i
                                          title="Delete"
                                          className="icon-trash-2"
                                        ></i>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            ))
                          ) : (
                            <p className="p-3">No comments found</p>
                          )}
                        </div>

                        {/* Pagination */}
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">
                            Showing {pagination.from || 0} to{" "}
                            {pagination.to || 0} of {pagination.total || 0}{" "}
                            entries
                          </div>
                          <ul className="wg-pagination flex gap-2">
                            {pagination.links?.map((link, index) => {
                              // Replace text labels
                              let label = link.label;
                              if (label.toLowerCase().includes("previous"))
                                label = "&laquo;";
                              if (label.toLowerCase().includes("next"))
                                label = "&raquo;";

                              return (
                                <li
                                  key={index}
                                  className={link.active ? "active" : ""}
                                >
                                  <a
                                    onClick={() =>
                                      link.url &&
                                      fetchComments(
                                        new URL(link.url).searchParams.get(
                                          "page"
                                        )
                                      )
                                    }
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                  />
                                </li>
                              );
                            })}
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
