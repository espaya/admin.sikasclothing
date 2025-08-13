import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Cookies from "js-cookie";
import MenuForms from "../components/MenuForms";

export default function AddMenu() {
  return (
    <>
      <div className="body">
        <div id="wrapper">
          <div id="page" className="">
            <div className="layout-wrap">
              <Sidebar></Sidebar>

              <div className="section-content-right">
                <Header></Header>

                <div className="main-content">
                  <div className="main-content-inner">
                    <div className="main-content-wrap">
                      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Add Menu</h3>
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
                            <a href="#">
                              <div className="text-tiny">All menus</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Add menu</div>
                          </li>
                        </ul>
                      </div>

                      <MenuForms></MenuForms>
                    </div>
                  </div>
                  <Footer></Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
