import { useState } from "react";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="section-menu-left">
      <div className="box-logo">
        <a href="index.html" id="site-logo-inner">
          <img
            className=""
            id="logo_header"
            alt=""
            src="images/logo/logo.png"
            data-light="images/logo/logo.png"
            data-dark="images/logo/logo-dark.png"
          ></img>
        </a>
        <div className="button-show-hide">
          <i className="icon-menu-left"></i>
        </div>
      </div>
      <div className="section-menu-left-wrap">
        <div className="center">
          <div className="center-item">
            <div className="center-heading">Main Home</div>
            <ul className="menu-list">
              <li className="menu-item active">
                <a href="/sc-dashboard" className="menu-item-button">
                  <div className="icon">
                    <i className="icon-grid"></i>
                  </div>
                  <div className="text">Dashboard</div>
                </a>
              </li>
            </ul>
          </div>
          <div className="center-item">
            <div className="center-heading">All page</div>
            <ul className="menu-list">
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("ecommerce")}
                >
                  <div className="icon">
                    <i className="icon-shopping-cart"></i>
                  </div>
                  <div className="text">Ecommerce</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "ecommerce" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/add-product" className="">
                      <div className="text">Add Product</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="product-list.html" className="">
                      <div className="text">Product List</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="product-detail-1.html" className="">
                      <div className="text">Product Detail 1</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="product-detail-2.html" className="">
                      <div className="text">Product Detail 2</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="product-detail-3.html" className="">
                      <div className="text">Product Detail 3</div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("category")}
                >
                  <div className="icon">
                    <i className="icon-layers"></i>
                  </div>
                  <div className="text">Category</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "category" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/category" className="">
                      <div className="text">Category list</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/add-category" className="">
                      <div className="text">New category</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("discount")}
                >
                  <div className="icon">
                    <i className="icon-tag"></i>
                  </div>
                  <div className="text">Discount</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "discount" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/discount" className="">
                      <div className="text">All Discounts</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/add-discount" className="">
                      <div className="text">Add Discount</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a href="#" className="menu-item-button">
                  <div className="icon">
                    <i className="icon-box"></i>
                  </div>
                  <div className="text">Attributes</div>
                </a>
                <ul className="sub-menu">
                  <li className="sub-menu-item">
                    <a href="attributes.html" className="">
                      <div className="text">Attributes</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="add-attributes.html" className="">
                      <div className="text">Add attributes</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a href="#" className="menu-item-button">
                  <div className="icon">
                    <i className="icon-file-plus"></i>
                  </div>
                  <div className="text">Order</div>
                </a>
                <ul className="sub-menu">
                  <li className="sub-menu-item">
                    <a href="oder-list.html" className="">
                      <div className="text">Order list</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="oder-detail.html" className="">
                      <div className="text">Order detail</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="oder-tracking.html" className="">
                      <div className="text">Order tracking</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a href="#" className="menu-item-button">
                  <div className="icon">
                    <i className="icon-user"></i>
                  </div>
                  <div className="text">User</div>
                </a>
                <ul className="sub-menu">
                  <li className="sub-menu-item">
                    <a href="all-user.html" className="">
                      <div className="text">All user</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="add-new-user.html" className="">
                      <div className="text">Add new user</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="login.html" className="">
                      <div className="text">Login</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="sign-up.html" className="">
                      <div className="text">Sign up</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a href="#" className="menu-item-button">
                  <div className="icon">
                    <i className="icon-user-plus"></i>
                  </div>
                  <div className="text">Roles</div>
                </a>
                <ul className="sub-menu">
                  <li className="sub-menu-item">
                    <a href="all-roles.html" className="">
                      <div className="text">All roles</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="create-role.html" className="">
                      <div className="text">Create role</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <a href="gallery.html" className="">
                  <div className="icon">
                    <i className="icon-image"></i>
                  </div>
                  <div className="text">Gallery</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="report.html" className="">
                  <div className="icon">
                    <i className="icon-pie-chart"></i>
                  </div>
                  <div className="text">Report</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
