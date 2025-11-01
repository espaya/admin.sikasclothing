import { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const [collapsed, setCollapsed] = useState(false);


  return (
    <div className={`section-menu-left ${collapsed ? "collapsed" : ""}`}>
      <div className="box-logo">
        <Link to={PATHS.ADMIN} href="#" id="site-logo-inner">
          <img
            className=""
            id="logo_header"
            alt=""
            src="/assets/images/logo.png"
            data-light="/assets/images/logo.png"
            data-dark="/assets/images/logo.png"
            style={{width: "150px"}}
          ></img>
        </Link>
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
                <Link
                  to={{ pathname: PATHS.ADMIN }}
                  className="menu-item-button"
                >
                  <div className="icon">
                    <i className="icon-grid"></i>
                  </div>
                  <div className="text">Dashboard</div>
                </Link>
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
                    <Link to={{ pathname: PATHS.ADDPRODUCT }} className="">
                      <div className="text">Add Product</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.PRODUCTLIST }} className="">
                      <div className="text">Product List</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.CATEGORY }} className="">
                      <div className="text">Category list</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADDCATEGORY }} className="">
                      <div className="text">New category</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.DISCOUNT }} className="">
                      <div className="text">All Discounts</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADDDISCOUNT }} className="">
                      <div className="text">Add Discount</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.BRANDS }} className="">
                      <div className="text">Brands</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADDBRAND }} className="">
                      <div className="text">Add Brand</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.ORDERLIST }} className="">
                      <div className="text">Order List</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link href="" className="">
                      <div className="text">Order Tracking</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ORDERDETAIL }} className="">
                      <div className="text">Details</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.CUSTOMERS }} className="">
                      <div className="text">All Customers</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.BANNEDCUSTOMERS }} className="">
                      <div className="text">Banned Customers</div>
                    </Link>
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
                    <Link to={{ pathname: PATHS.MENU }} className="">
                      <div className="text">All Menus</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADDMENU }} className="">
                      <div className="text">Create menu</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("hero")}
                >
                  <div className="icon">
                    <i className="icon-image"></i>
                  </div>
                  <div className="text">Hero Slider</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{ display: openDropdown === "hero" ? "block" : "" }}
                >
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.HERO }} className="">
                      <div className="text">All hero</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADD_HERO }} className="">
                      <div className="text">Create hero</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("spotlight")}
                >
                  <div className="icon">
                    <i className="icon-star"></i>
                  </div>
                  <div className="text">Spotlight</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "spotlight" ? "block" : "",
                  }}
                >
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.SPOTLIGHT }} className="">
                      <div className="text">All spotlight</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.ADD_SPOTLIGHT }} className="">
                      <div className="text">Create spotlight</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("call-to-action")}
                >
                  <div className="icon">
                    <i className="icon-arrow-right"></i>
                  </div>
                  <div className="text">Call to action</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "call-to-action" ? "block" : "",
                  }}
                >
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.CALLTOACTION }} className="">
                      <div className="text">All Call to Actions</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link
                      to={{ pathname: PATHS.ADD_CALLTOACTION }}
                      className=""
                    >
                      <div className="text">Create Call to Action</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item has-children">
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("blog")}
                >
                  <div className="icon">
                    <i className="icon-book-open"></i>
                  </div>
                  <div className="text">Blog</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "blog" ? "block" : "",
                  }}
                >
                  <li className="sub-menu-item">
                    <Link to={{ pathname: PATHS.BLOG }} href="#" className="">
                      <div className="text">All Posts</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link
                      to={{ pathname: PATHS.CREATE_POST }}
                      href="#"
                      className=""
                    >
                      <div className="text">Create New</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link
                      to={{ pathname: PATHS.POST_CATEGORY }}
                      href="#"
                      className=""
                    >
                      <div className="text">All Category</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link
                      to={{ pathname: PATHS.CREATE_POST_CATEGORY }}
                      href="#"
                      className=""
                    >
                      <div className="text">Create Category</div>
                    </Link>
                  </li>
                  <li className="sub-menu-item">
                    <Link
                      to={{ pathname: PATHS.POST_COMMENTS }}
                      href="#"
                      className=""
                    >
                      <div className="text">Comments</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <Link to={{ pathname: PATHS.CONTACTS }} href="#" className="">
                  <div className="icon">
                    <i className="icon-mail"></i>
                  </div>
                  <div className="text">Contacts</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
