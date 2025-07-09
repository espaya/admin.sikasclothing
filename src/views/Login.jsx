import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

      // Step 1: Get the CSRF cookie (Laravel will set it in cookies)
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      // Step 2: Get the token from cookies
      const csrfToken = Cookies.get("XSRF-TOKEN");

      // Step 2: Send login request
      const response = await fetch(`${apiBase}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken), // Laravel expects this
        },
        credentials: "include", // send cookies with request
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || "An error occurred" });
        }
      } else {
        // Clear form fields first
        setFormData({
          email: "",
          password: "",
        });

        // Then redirect
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else {
          setErrors({ general: "No redirect URL provided." });
        }
      }
    } catch (err) {
      setErrors({ general: err.message }); // show error message

      // clear error message after 3.5sec
      setTimeout(() => {
        document.getElementById("error-message").textContent = "";
      }, 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="body">
        <div id="wrapper">
          <div id="page" className="">
            <div className="wrap-login-page">
              <div className="flex-grow flex flex-column justify-center gap30">
                <a href="index.html" id="site-logo-inner"></a>
                <div className="login-box">
                  <div>
                    <h3>Login to account</h3>
                    <div className="body-text">
                      Enter your email & password to login
                    </div>
                  </div>
                  {errors.general && (
                    <p id="error-message" className="text-danger md-5">
                      {" "}
                      {errors.general}{" "}
                    </p>
                  )}
                  {successMessage && (
                    <p className="alert alert-success"> {successMessage} </p>
                  )}
                  <form
                    action="#"
                    onSubmit={handleSubmit}
                    method="POST"
                    className="form-login flex flex-column gap24"
                  >
                    <fieldset className="email">
                      <div className="body-title mb-10">
                        Email address <span className="tf-color-1">*</span>
                      </div>
                      <input
                        className={`flex-grow ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        type="text"
                        placeholder="Enter your email address"
                        name="email"
                        tabIndex="0"
                        value={formData.email}
                        aria-required="true"
                        autoComplete="off"
                        onChange={handleChange}
                      ></input>
                      {errors.email && (
                        <p className="text-danger mt-3"> {errors.email[0]} </p>
                      )}
                    </fieldset>
                    <fieldset className="password">
                      <div className="body-title mb-10">
                        Password <span className="tf-color-1">*</span>
                      </div>
                      <input
                        className="password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        tabIndex="0"
                        value={formData.password}
                        aria-required="true"
                        autoComplete="off"
                        onChange={handleChange}
                      ></input>
                      <span
                        className="show-pass cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <i className="icon-eye-off"></i>
                        ) : (
                          <i className="icon-eye"></i>
                        )}
                      </span>

                      {errors.password && (
                        <p className="text-danger mt-3">
                          {" "}
                          {errors.password[0]}{" "}
                        </p>
                      )}
                    </fieldset>
                    <div className="flex justify-between items-center">
                      <div className="flex gap10">
                        <input className="" type="checkbox" id="signed"></input>
                        <label className="body-text" htmlFor="signed">
                          Keep me signed in
                        </label>
                      </div>
                      <a href="#" className="body-text tf-color">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="tf-button w-full"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>
                  <div></div>
                </div>
              </div>
              <div className="text-tiny">
                Copyright © 2024 Sika's Clothing, All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
