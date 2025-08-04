import { useState } from "react";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`section-menu-left ${collapsed ? "collapsed" : ""}`}>
      <div className="box-logo">
        <a href="index.html" id="site-logo-inner">
          <img
            className=""
            id="logo_header"
            alt=""
            src="/assets/images/logo/logo.png"
            data-light="/assets/images/logo/logo.png"
            data-dark="/assets/images/logo/logo-dark.png"
          ></img>
        </a>
        <div
          className="button-show-hide"
          onClick={() => setCollapsed((prev) => !prev)}
        >
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
                    <a href="/sc-dashboard/products" className="">
                      <div className="text">Product List</div>
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
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("brands")}
                >
                  <div className="icon">
                    <i className="icon-briefcase"></i>
                  </div>
                  <div className="text">Brands</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "brands" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/brands" className="">
                      <div className="text">Brands</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/product/add-brand" className="">
                      <div className="text">Add Brand</div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("order")}
                >
                  <div className="icon">
                    <i className="icon-file-plus"></i>
                  </div>
                  <div className="text">Order</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "order" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/orderlist" className="">
                      <div className="text">Order List</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="" className="">
                      <div className="text">Order Tracking</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/order-detail" className="">
                      <div className="text">Details</div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("customer")}
                >
                  <div className="icon">
                    <i className="icon-user"></i>
                  </div>
                  <div className="text">Customers</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "customer" ? "block" : "none",
                  }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/customers" className="">
                      <div className="text">All Customers</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/customers/banned" className="">
                      <div className="text">Banned Customers</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("menu")}
                >
                  <div className="icon">
                    <i className="icon-menu"></i>
                  </div>
                  <div className="text">Menu</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{ display: openDropdown === "menu" ? "block" : "" }}
                >
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/menu" className="">
                      <div className="text">All Menus</div>
                    </a>
                  </li>
                  <li className="sub-menu-item">
                    <a href="/sc-dashboard/menu/add" className="">
                      <div className="text">Create menu</div>
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
