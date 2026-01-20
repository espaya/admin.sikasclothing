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

  // State variables
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [draftTimer, setDraftTimer] = useState(null);
  const [draftStatus, setDraftStatus] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false); // New state for showing reply box

  // Constants
  const MAX_CHARS = 5000;

  // Initialize reply fields when contact is selected
  useEffect(() => {
    if (selectedContact) {
      // Pre-fill reply fields
      setReplyTo(selectedContact.email);
      setReplySubject(`Re: ${selectedContact.subject || "No Subject"}`);

      // Hide reply box when switching to a new contact
      setShowReplyBox(false);

      // Check for existing draft
      loadDraft(selectedContact.id);
    }
  }, [selectedContact]);

  // Save draft to localStorage
  const saveDraft = () => {
    if (!selectedContact || !replyText.trim()) return;

    const draft = {
      text: replyText,
      to: replyTo,
      subject: replySubject,
      timestamp: new Date().toISOString(),
    };

    const drafts = JSON.parse(localStorage.getItem("emailDrafts") || "{}");
    drafts[selectedContact.id] = draft;
    localStorage.setItem("emailDrafts", JSON.stringify(drafts));

    return true;
  };

  // Load draft from localStorage
  const loadDraft = (contactId) => {
    const drafts = JSON.parse(localStorage.getItem("emailDrafts") || "{}");
    const draft = drafts[contactId];

    if (draft) {
      setReplyText(draft.text || "");
      setReplyTo(draft.to || "");
      setReplySubject(draft.subject || "");
      setDraftStatus(
        "Draft loaded from " + new Date(draft.timestamp).toLocaleTimeString()
      );
      setTimeout(() => setDraftStatus(null), 3000);
    }
  };

  // Check if draft exists
  const hasDraft = (contactId) => {
    const drafts = JSON.parse(localStorage.getItem("emailDrafts") || "{}");
    return !!drafts[contactId];
  };

  // Delete draft
  const deleteDraft = (contactId) => {
    const drafts = JSON.parse(localStorage.getItem("emailDrafts") || "{}");
    delete drafts[contactId];
    localStorage.setItem("emailDrafts", JSON.stringify(drafts));
  };

  // Handle send reply
  const handleSendReply = async () => {
    if (!replyText.trim() || replyText.length > MAX_CHARS) return;

    try {
      // Send to your API
      
      // const response = await fetch('/api/send-reply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: replyTo,
      //     subject: replySubject,
      //     message: replyText,
      //     originalMessageId: selectedContact.id
      //   })
      // });

      console.log("Sending reply to:", replyTo);
      console.log("Subject:", replySubject);
      console.log("Message:", replyText);

      // Clear form on success
      setReplyText("");
      setDraftStatus("Sent successfully!");

      // Hide reply box after sending
      setShowReplyBox(false);

      // Delete the draft after sending
      deleteDraft(selectedContact.id);

      setTimeout(() => setDraftStatus(null), 3000);
    } catch (error) {
      console.error("Error sending reply:", error);
      setDraftStatus("Error sending reply");
    }
  };

  // Toggle reply box visibility
  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  // Confirm clear
  const confirmClearReply = () => {
    if (replyText.trim()) {
      if (
        window.confirm(
          "Are you sure you want to clear the reply? Any unsaved changes will be lost."
        )
      ) {
        setReplyText("");
        setDraftStatus("Cleared");
        setTimeout(() => setDraftStatus(null), 2000);
      }
    }
  };

  // Handle reply button click
  const handleReplyButtonClick = () => {
    if (!showReplyBox) {
      setShowReplyBox(true);
    }
  };

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
    min-width: 0;
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
    display: flex;
    flex-direction: column;
  }

  .message-content-container {
    flex: 1;
    overflow-y: auto;
  }

  .message-content-container .message-body {
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

  .reply-btn {
    background: #3b82f6;
    border: 1px solid #3b82f6;
    border-radius: 4px;
    padding: 4px 12px;
    font-size: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .reply-btn:hover {
    background: #2563eb;
    border-color: #2563eb;
  }

  .close-reply-btn {
    background: #6b7280;
    border: 1px solid #6b7280;
    border-radius: 4px;
    padding: 4px 12px;
    font-size: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .close-reply-btn:hover {
    background: #4b5563;
    border-color: #4b5563;
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

  /* Enhanced Reply Box Styles */
  .reply-section {
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .reply-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .reply-header h4 {
    margin: 0;
    font-size: 16px;
    color: #111827;
  }

  .draft-status {
    font-size: 12px;
  }

  .draft-badge {
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  /* Reply To and Subject Fields */
  .reply-to-field,
  .subject-field {
    margin-bottom: 12px;
  }

  .reply-to-field label,
  .subject-field label {
    display: block;
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 4px;
    font-weight: 500;
  }

  .reply-to-input,
  .subject-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
    background: white;
  }

  .reply-to-input:focus,
  .subject-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Textarea */
  .reply-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 8px;
    background: white;
  }

  .reply-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Character Counter */
  .character-counter {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 15px;
    padding: 0 4px;
  }

  .char-warning {
    color: #ef4444;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Reply Actions */
  .reply-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
  }

  .draft-actions {
    font-size: 13px;
  }

  .reply-actions .btn {
    padding: 6px 15px;
    font-size: 13px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .reply-actions .btn-primary {
    background-color: #3b82f6;
    color: white;
    border: 1px solid #3b82f6;
  }

  .reply-actions .btn-primary:hover {
    background-color: #2563eb;
    border-color: #2563eb;
  }

  .reply-actions .btn-primary:disabled {
    background-color: #93c5fd;
    border-color: #93c5fd;
    cursor: not-allowed;
  }

  .reply-actions .btn-outline-secondary {
    background-color: white;
    color: #6b7280;
    border: 1px solid #d1d5db;
  }

  .reply-actions .btn-outline-secondary:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  .reply-actions .btn-link {
    background: none;
    border: none;
    color: #3b82f6;
    text-decoration: none;
    padding: 0;
    font-size: 13px;
  }

  .reply-actions .btn-link:hover {
    text-decoration: underline;
  }

  /* Utility Classes */
  .text-danger {
    color: #ef4444 !important;
  }

  .text-success {
    color: #10b981 !important;
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
                                  <div className="message-actions">
                                    <button
                                      className="reply-btn"
                                      onClick={handleReplyButtonClick}
                                    >
                                      <i
                                        className="icon-mail"
                                        style={{ fontSize: "12px" }}
                                      ></i>
                                      Reply
                                    </button>
                                    <button
                                      className="mark-unread-btn"
                                      onClick={(e) =>
                                        handleMarkAsUnread(
                                          e,
                                          selectedContact.id
                                        )
                                      }
                                    >
                                      <i
                                        className="icon-mail"
                                        style={{ fontSize: "12px" }}
                                      ></i>
                                      Mark as unread
                                    </button>
                                  </div>
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
                                <div className="message-content-container">
                                  <div className="message-body">
                                    {selectedContact.message}
                                  </div>
                                </div>

                                {/* Reply Box - Conditionally Rendered */}
                                {showReplyBox && (
                                  <div className="reply-section">
                                    <div className="reply-header">
                                      <h4>Reply</h4>
                                      <div className="draft-status">
                                        {draftStatus && (
                                          <span className="draft-badge">
                                            <i
                                              className="icon-save"
                                              style={{
                                                fontSize: "12px",
                                                marginRight: "5px",
                                              }}
                                            ></i>
                                            {draftStatus}
                                          </span>
                                        )}
                                        <button
                                          className="close-reply-btn"
                                          onClick={toggleReplyBox}
                                          style={{ marginLeft: "10px" }}
                                        >
                                          <i
                                            className="icon-x"
                                            style={{ fontSize: "12px" }}
                                          ></i>
                                          Close
                                        </button>
                                      </div>
                                    </div>

                                    {/* Reply To Field */}
                                    <div className="reply-to-field">
                                      <label htmlFor="replyTo">Reply to:</label>
                                      <input
                                        type="email"
                                        id="replyTo"
                                        className="reply-to-input"
                                        value={replyTo}
                                        onChange={(e) =>
                                          setReplyTo(e.target.value)
                                        }
                                        placeholder="Recipient email"
                                      />
                                    </div>

                                    {/* Subject Field */}
                                    <div className="subject-field">
                                      <label htmlFor="replySubject">
                                        Subject:
                                      </label>
                                      <input
                                        type="text"
                                        id="replySubject"
                                        className="subject-input"
                                        value={replySubject}
                                        onChange={(e) =>
                                          setReplySubject(e.target.value)
                                        }
                                        placeholder="Re: {selectedContact.subject}"
                                      />
                                    </div>

                                    <textarea
                                      className="reply-textarea"
                                      placeholder="Type your reply here..."
                                      rows="6"
                                      value={replyText}
                                      onChange={(e) => {
                                        setReplyText(e.target.value);
                                        // Auto-save draft after 2 seconds of inactivity
                                        clearTimeout(draftTimer);
                                        setDraftTimer(
                                          setTimeout(saveDraft, 2000)
                                        );
                                      }}
                                    />

                                    {/* Character Counter */}
                                    <div className="character-counter">
                                      <span
                                        className={
                                          replyText.length > MAX_CHARS
                                            ? "text-danger"
                                            : "text-muted"
                                        }
                                      >
                                        {replyText.length} / {MAX_CHARS}{" "}
                                        characters
                                      </span>
                                      {replyText.length > MAX_CHARS && (
                                        <span className="char-warning">
                                          <i
                                            className="icon-alert-circle"
                                            style={{
                                              fontSize: "12px",
                                              marginRight: "5px",
                                            }}
                                          ></i>
                                          Exceeded character limit
                                        </span>
                                      )}
                                    </div>

                                    {/* Reply Actions */}
                                    <div className="reply-actions">
                                      <div className="action-buttons">
                                        <button
                                          className="btn btn-primary btn-sm"
                                          onClick={handleSendReply}
                                          disabled={
                                            !replyText.trim() ||
                                            replyText.length > MAX_CHARS
                                          }
                                        >
                                          <i
                                            className="icon-send"
                                            style={{
                                              fontSize: "12px",
                                              marginRight: "5px",
                                            }}
                                          ></i>
                                          Send Reply
                                        </button>
                                        <button
                                          className="btn btn-outline-secondary btn-sm"
                                          onClick={() => {
                                            saveDraft();
                                            setDraftStatus("Draft saved");
                                            setTimeout(
                                              () => setDraftStatus(null),
                                              3000
                                            );
                                          }}
                                        >
                                          <i
                                            className="icon-save"
                                            style={{
                                              fontSize: "12px",
                                              marginRight: "5px",
                                            }}
                                          ></i>
                                          Save Draft
                                        </button>
                                        <button
                                          className="btn btn-outline-secondary btn-sm"
                                          onClick={confirmClearReply}
                                        >
                                          Clear
                                        </button>
                                      </div>
                                      <div className="draft-actions">
                                        {hasDraft(selectedContact.id) && (
                                          <button
                                            className="btn btn-link btn-sm"
                                            onClick={() =>
                                              loadDraft(selectedContact.id)
                                            }
                                          >
                                            <i
                                              className="icon-download"
                                              style={{
                                                fontSize: "12px",
                                                marginRight: "5px",
                                              }}
                                            ></i>
                                            Load Draft
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
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
                                    className="reply-btn"
                                    onClick={handleReplyButtonClick}
                                  >
                                    <i
                                      className="icon-mail"
                                      style={{ fontSize: "12px" }}
                                    ></i>
                                    Reply
                                  </button>
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
