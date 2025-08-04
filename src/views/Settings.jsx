import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import General from "../components/settings/General";
import Payment from "../components/settings/Payment";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general"); // Track active tab

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="assets/css/animate.min.css"
      />
      <link rel="stylesheet" type="text/css" href="assets/css/animation.css" />
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
                                    <span className="h6">
                                      General Information
                                    </span>
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
