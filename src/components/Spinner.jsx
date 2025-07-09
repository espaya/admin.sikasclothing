export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="spinner"></div>
      <style>
        {`
                        .spinner {
                            width: 40px;
                            height: 40px;
                            border: 4px solid rgba(0, 0, 0, 0.1);
                            border-left-color: #000;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                        }

                        @keyframes spin {
                            to {
                                transform: rotate(360deg);
                            }
                        }
                    `}
      </style>
    </div>
  );
}
