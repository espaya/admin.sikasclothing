import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import General from "../components/settings/General";
import Payment from "../components/settings/Payment";
import Shipping from "../components/settings/Shipping";
import TaxRate from "../components/settings/TaxRate";
import SocialMedia from "../components/settings/SocialMedia";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general"); // Track active tab
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

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
                        <h3>Setting</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Setting</div>
                          </li>
                        </ul>
                      </div>
                      {errors?.general && (
                        <p className="alert alert-danger">{errors.general}</p>
                      )}
                      {successMsg && (
                        <p className="alert alert-success">{successMsg}</p>
                      )}
                      <div className="form-setting form-style-2">
                        <div className="wg-box h-full">
                          <div>
                            <div className="widget-tabs">
                              <ul className="widget-menu-tab">
                                <li
                                  className={`item-title ${
                                    activeTab === "general" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("general")}
                                >
                                  <span className="inner">
                                    <span className="h6">General</span>
                                  </span>
                                </li>
                                <li
                                  className={`item-title ${
                                    activeTab === "payment" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("payment")}
                                >
                                  <span className="inner">
                                    <span className="h6">Payment</span>
                                  </span>
                                </li>
                                <li
                                  className={`item-title ${
                                    activeTab === "shipping" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("shipping")}
                                >
                                  <span className="inner">
                                    <span className="h6">Shipping</span>
                                  </span>
                                </li>
                                <li
                                  className={`item-title ${
                                    activeTab === "tax" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("tax")}
                                >
                                  <span className="inner">
                                    <span className="h6">Tax</span>
                                  </span>
                                </li>
                                <li
                                  className={`item-title ${
                                    activeTab === "social-media" ? "active" : ""
                                  }`}
                                  onClick={() => setActiveTab("social-media")}
                                >
                                  <span className="inner">
                                    <span className="h6">Social Media</span>
                                  </span>
                                </li>
                              </ul>
                              <div className="widget-content-tab">
                                <div
                                  className={`widget-content-inner ${
                                    activeTab === "general" ? "active" : ""
                                  }`}
                                  style={{
                                    display:
                                      activeTab === "general"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <General />
                                </div>
                                <div
                                  className={`widget-content-inner ${
                                    activeTab === "payment" ? "active" : ""
                                  }`}
                                  style={{
                                    display:
                                      activeTab === "payment"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <Payment />
                                </div>
                                <div
                                  className={`widget-content-inner ${
                                    activeTab === "shipping" ? "active" : ""
                                  }`}
                                  style={{
                                    display:
                                      activeTab === "shipping"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <Shipping
                                    errors={errors}
                                    setErrors={setErrors}
                                    setSuccessMsg={setSuccessMsg}
                                  />
                                </div>
                                <div
                                  className={`widget-content-inner ${
                                    activeTab === "tax" ? "active" : ""
                                  }`}
                                  style={{
                                    display:
                                      activeTab === "tax" ? "block" : "none",
                                  }}
                                >
                                  <TaxRate
                                    errors={errors}
                                    setErrors={setErrors}
                                    setSuccessMsg={setSuccessMsg}
                                  />
                                </div>
                                <div
                                  className={`widget-content-inner ${
                                    activeTab === "social-media" ? "active" : ""
                                  }`}
                                  style={{
                                    display:
                                      activeTab === "social-media" ? "block" : "none",
                                  }}
                                >
                                  <SocialMedia
                                    errors={errors}
                                    setErrors={setErrors}
                                    setSuccessMsg={setSuccessMsg}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
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
