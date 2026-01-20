import Cookies from "js-cookie";

export default function MessageView(
  replyText,
  setReplyText,
  deleteContact,
  handleMarkAsUnread,
  selectedContact,
  unreadMessages
) {
  // Add this function to handle sending replies
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedContact) return;

    // Here you would implement your reply logic
    console.log("Sending reply to:", selectedContact.email);
    console.log("Reply content:", replyText);

    // Example: Send to API or update state
    // await sendReply(selectedContact.id, replyText);

    // Clear the reply box after sending
    setReplyText("");

    // Optional: Show success message
    alert("Reply sent successfully!");
  };
  return (
    <>
      <div className="inbox-right">
        {selectedContact ? (
          <>
            <div className="inbox-header">
              <h3>
                {selectedContact.subject || "No Subject"}
                <button
                  className="mark-unread-btn"
                  onClick={(e) => handleMarkAsUnread(e, selectedContact.id)}
                >
                  <i className="icon-mail" style={{ fontSize: "12px" }}></i>
                  Mark as unread
                </button>
              </h3>
              <div className="sender-info">
                <span className="font-weight-bold">{selectedContact.name}</span>
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
              <div className="message-body">{selectedContact.message}</div>
            </div>

            {/* Reply Box */}
            <div className="reply-section">
              <div className="reply-header">
                <h4>Reply</h4>
              </div>
              <textarea
                className="reply-textarea"
                placeholder="Type your reply here..."
                rows="5"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="reply-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
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
                  onClick={() => setReplyText("")}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="inbox-actions">
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {unreadMessages.has(selectedContact.id) ? (
                  <span className="unread-badge">Unread</span>
                ) : (
                  <span>Read</span>
                )}
              </div>
              <div className="message-actions">
                <button
                  className="mark-unread-btn"
                  onClick={(e) => handleMarkAsUnread(e, selectedContact.id)}
                >
                  <i className="icon-mail" style={{ fontSize: "12px" }}></i>
                  Mark as unread
                </button>
                <i
                  onClick={() => deleteContact(selectedContact.id)}
                  className="icon-trash-2 trash-icon"
                ></i>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">Select a message to read</div>
        )}
      </div>
    </>
  );
}
