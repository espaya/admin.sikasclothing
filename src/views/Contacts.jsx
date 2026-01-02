import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import fetchContactUs from "../controllers/ContactUsController";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import destroyContact from "../controllers/DeleteContact";
import { Link } from "react-router-dom";
import { PATHS } from "../router";
import getExcerpt from "../utils/Excerpt";
import { formatDate } from "../utils/DateFormatter";
import markAsRead from "../controllers/MarkAsRead";

export default function Contacts() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [contactUs, setContactUs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(new Set());

  useEffect(() => {
    fetchContactUs(setLoading, apiBase, setErrors, setContactUs, setPagination);
  }, []);

  // Initialize unread messages when contactUs loads
  useEffect(() => {
    if (contactUs.length > 0) {
      const initialUnread = new Set();
      contactUs.forEach((contact) => {
        if (!contact.is_read) {
          // Assuming your API returns is_read field
          initialUnread.add(contact.id);
        }
      });
      setUnreadMessages(initialUnread);
    }
  }, [contactUs]);

  const deleteContact = async (contactID) => {
    setErrors({});
    setSuccessMsg("");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    try {
      if (result.isConfirmed) {
        destroyContact(setErrors, setSuccessMsg, apiBase, contactID);
      }
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);

    // Mark as read when selected
    if (unreadMessages.has(contact.id)) {
      const updatedUnread = new Set(unreadMessages);
      updatedUnread.delete(contact.id);
      setUnreadMessages(updatedUnread);

      // Optional: You could also update the backend here
      // markAsRead(contact.id);
      markAsRead(contact.id, setErrors, apiBase);
    }
  };

  const handleMarkAsUnread = (e, contactId) => {
    e.stopPropagation();
    const updatedUnread = new Set(unreadMessages);
    updatedUnread.add(contactId);
    setUnreadMessages(updatedUnread);

    // If this contact is currently selected, mark it as unread but keep it selected
    if (selectedContact?.id === contactId) {
      // Optional: You could also update the backend here
      markAsRead(contactId, setErrors, apiBase);
    }
  };

  return (
    <>
      <style>{`
        .inbox-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        .inbox-left {
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .inbox-search {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .inbox-search input {
          width: 100%;
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }

        .inbox-list {
          overflow-y: auto;
          flex: 1;
        }

        .inbox-item {
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.2s ease;
          position: relative;
        }

        .inbox-item:hover {
          background: #f9fafb;
        }

        .inbox-item.unread {
          background: #f8fafc;
        }

        .inbox-item.active {
          background: #f0f9ff;
          border-left: 3px solid #3b82f6;
        }

        .inbox-item.active.unread {
          background: #f0f9ff;
        }

        .inbox-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .inbox-sender-info {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .sender-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        .sender-details {
          flex: 1;
          min-width: 0; /* Allows text truncation */
        }

        .sender-details h4 {
          font-weight: 600;
          font-size: 14px;
          color: #111827;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sender-details .sender-email {
          font-size: 12px;
          color: #6b7280;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .inbox-time {
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: 8px;
        }

        .inbox-preview {
          margin-top: 8px;
        }

        .inbox-preview h5 {
          font-weight: 600;
          font-size: 14px;
          color: #111827;
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .inbox-preview p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .inbox-right {
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .inbox-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inbox-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .inbox-header .sender-info {
          font-size: 14px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .inbox-header .sender-info .time {
          color: #9ca3af;
          font-size: 13px;
        }

        .inbox-content {
          padding: 24px;
          flex: 1;
          overflow-y: auto;
        }

        .inbox-content .message-body {
          font-size: 14px;
          line-height: 1.6;
          color: #374151;
          white-space: pre-wrap;
        }

        .inbox-actions {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f9fafb;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #6b7280;
          font-size: 14px;
        }

        .pagination-container {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .unread-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #3b82f6;
          border-radius: 50%;
          margin-right: 4px;
          flex-shrink: 0;
        }

        .unread-badge {
          background: #3b82f6;
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 500;
        }

        .old-conversation-link {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          color: #3b82f6;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          background: #f9fafb;
        }

        .old-conversation-link:hover {
          text-decoration: underline;
        }

        .mark-unread-btn {
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 4px 12px;
          font-size: 12px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .mark-unread-btn:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .message-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .trash-icon {
          cursor: pointer;
          font-size: 18px;
          color: #ef4444;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .trash-icon:hover {
          background: #fee2e2;
        }

        .font-weight-bold {
          font-weight: 600 !important;
        }

        .text-dark {
          color: #111827 !important;
        }

        .text-muted {
          color: #6b7280 !important;
        }
      `}</style>

      <title>Contacts - Sika's Clothing</title>

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
                        <h3>Contacts</h3>
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
                            <div className="text-tiny">Contacts</div>
                          </li>
                        </ul>
                      </div>

                      {successMsg && (
                        <p className="alert alert-success"> {successMsg} </p>
                      )}

                      {errors.general && (
                        <p className="alert alert-danger"> {errors.general} </p>
                      )}

                      <div className="wg-box inbox-layout">
                        {/* LEFT: Inbox list */}
                        <div className="inbox-left">
                          <div className="inbox-search">
                            <input
                              type="text"
                              placeholder="Search"
                              disabled
                              value="Library nothing"
                            />
                          </div>

                          {loading && <Spinner />}

                          {contactUs.length === 0 ? (
                            <p className="empty-state">No messages found.</p>
                          ) : (
                            <div className="inbox-list">
                              {contactUs.map((contact) => {
                                const initials = contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .substring(0, 2);

                                const timeAgo = formatDate(contact.created_at);
                                const isUnread = unreadMessages.has(contact.id);

                                return (
                                  <div
                                    key={contact.id}
                                    className={`inbox-item ${
                                      selectedContact?.id === contact.id
                                        ? "active"
                                        : ""
                                    } ${isUnread ? "unread" : ""}`}
                                    onClick={() => handleSelectContact(contact)}
                                  >
                                    <div className="inbox-item-header">
                                      <div className="inbox-sender-info">
                                        <div className="sender-avatar">
                                          {initials}
                                        </div>
                                        <div className="sender-details">
                                          <h4
                                            className={
                                              isUnread
                                                ? "font-weight-bold text-dark"
                                                : ""
                                            }
                                          >
                                            {isUnread && (
                                              <span className="unread-indicator"></span>
                                            )}
                                            {contact.name}
                                          </h4>
                                          <div
                                            className={`sender-email ${
                                              isUnread ? "font-weight-bold" : ""
                                            }`}
                                          >
                                            {contact.email}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="inbox-time">
                                        {timeAgo}
                                      </div>
                                    </div>

                                    <div className="inbox-preview">
                                      <h5
                                        className={
                                          isUnread
                                            ? "font-weight-bold text-dark"
                                            : ""
                                        }
                                      >
                                        {getExcerpt(
                                          contact.subject || "No Subject",
                                          30
                                        )}
                                        {isUnread && (
                                          <span className="unread-badge">
                                            New
                                          </span>
                                        )}
                                      </h5>
                                      <p
                                        className={
                                          isUnread
                                            ? "font-weight-bold"
                                            : "text-muted"
                                        }
                                      >
                                        {getExcerpt(contact.message, 60)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}

                              {/* Old conversation link - like in the image */}
                              <div className="old-conversation-link">
                                Old Conversation &gt;
                              </div>
                            </div>
                          )}
                        </div>

                        {/* RIGHT: Message view */}
                        <div className="inbox-right">
                          {selectedContact ? (
                            <>
                              <div className="inbox-header">
                                <h3>
                                  {selectedContact.subject || "No Subject"}
                                  <button
                                    className="mark-unread-btn"
                                    onClick={(e) =>
                                      handleMarkAsUnread(e, selectedContact.id)
                                    }
                                  >
                                    <i
                                      className="icon-mail"
                                      style={{ fontSize: "12px" }}
                                    ></i>
                                    Mark as unread
                                  </button>
                                </h3>
                                <div className="sender-info">
                                  <span className="font-weight-bold">
                                    {selectedContact.name}
                                  </span>
                                  <span>
                                    &lt;
                                    <a href={`mailto:${selectedContact.email}`}>
                                      {selectedContact.email}
                                    </a>
                                    &gt;
                                  </span>
                                  <span className="time">
                                    | {formatDate(selectedContact.created_at)}
                                  </span>
                                </div>
                              </div>

                              <div className="inbox-content">
                                <div className="message-body">
                                  {selectedContact.message}
                                </div>
                              </div>

                              <div className="inbox-actions">
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "13px" }}
                                >
                                  {unreadMessages.has(selectedContact.id) ? (
                                    <span className="unread-badge">Unread</span>
                                  ) : (
                                    <span>Read</span>
                                  )}
                                </div>
                                <div className="message-actions">
                                  <button
                                    className="mark-unread-btn"
                                    onClick={(e) =>
                                      handleMarkAsUnread(e, selectedContact.id)
                                    }
                                  >
                                    <i
                                      className="icon-mail"
                                      style={{ fontSize: "12px" }}
                                    ></i>
                                    Mark as unread
                                  </button>
                                  <i
                                    onClick={() =>
                                      deleteContact(selectedContact.id)
                                    }
                                    className="icon-trash-2 trash-icon"
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="empty-state">
                              Select a message to read
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pagination */}
                      {contactUs.length > 0 && (
                        <div className="pagination-container">
                          <div className="text-tiny">
                            Showing {contactUs.length} of{" "}
                            {pagination.total || 0} entries
                          </div>

                          <ul className="wg-pagination">
                            <li>
                              <a href="#">
                                <i className="icon-chevron-left"></i>
                              </a>
                            </li>

                            {pagination.last_page &&
                              [...Array(pagination.last_page)].map((_, idx) => (
                                <li
                                  key={idx + 1}
                                  className={
                                    pagination.current_page === idx + 1
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <a href="#">{idx + 1}</a>
                                </li>
                              ))}

                            <li>
                              <a href="#">
                                <i className="icon-chevron-right"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
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
