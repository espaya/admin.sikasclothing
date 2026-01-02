import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../router";

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Helper function to check if any child path is active (for dropdowns)
  const hasActiveChild = (paths) => {
    return paths.some((path) => location.pathname === path);
  };

  // Auto-open dropdown when a child route is active
  useEffect(() => {
    const dropdownMap = {
      [PATHS.ADDPRODUCT]: "ecommerce",
      [PATHS.PRODUCTLIST]: "ecommerce",
      [PATHS.CATEGORY]: "category",
      [PATHS.ADDCATEGORY]: "category",
      [PATHS.DISCOUNT]: "discount",
      [PATHS.ADDDISCOUNT]: "discount",
      [PATHS.BRANDS]: "brands",
      [PATHS.ADDBRAND]: "brands",
      [PATHS.ORDERLIST]: "order",
      [PATHS.ORDERDETAIL]: "order",
      [PATHS.CUSTOMERS]: "customer",
      [PATHS.BANNEDCUSTOMERS]: "customer",
      [PATHS.MENU]: "menu",
      [PATHS.ADDMENU]: "menu",
      [PATHS.HERO]: "hero",
      [PATHS.ADD_HERO]: "hero",
      [PATHS.SPOTLIGHT]: "spotlight",
      [PATHS.ADD_SPOTLIGHT]: "spotlight",
      [PATHS.CALLTOACTION]: "call-to-action",
      [PATHS.ADD_CALLTOACTION]: "call-to-action",
      [PATHS.BLOG]: "blog",
      [PATHS.CREATE_POST]: "blog",
      [PATHS.POST_CATEGORY]: "blog",
      [PATHS.CREATE_POST_CATEGORY]: "blog",
      [PATHS.POST_COMMENTS]: "blog",
    };

    const activeDropdown = dropdownMap[location.pathname];
    if (activeDropdown) {
      setOpenDropdown(activeDropdown);
    }
  }, [location.pathname]); // Remove openDropdown from dependencies

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

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
            style={{ width: "150px" }}
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
              <li
                className={`menu-item ${isActive(PATHS.ADMIN) ? "active" : ""}`}
              >
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
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.ADDPRODUCT, PATHS.PRODUCTLIST])
                    ? "active"
                    : ""
                }`}
              >
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
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADDPRODUCT) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADDPRODUCT }} className="">
                      <div className="text">Add Product</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.PRODUCTLIST) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.PRODUCTLIST }} className="">
                      <div className="text">Product List</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.CATEGORY, PATHS.ADDCATEGORY])
                    ? "active"
                    : ""
                }`}
              >
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
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.CATEGORY) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.CATEGORY }} className="">
                      <div className="text">Category list</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADDCATEGORY) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADDCATEGORY }} className="">
                      <div className="text">New category</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.DISCOUNT, PATHS.ADDDISCOUNT])
                    ? "active"
                    : ""
                }`}
              >
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
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.DISCOUNT) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.DISCOUNT }} className="">
                      <div className="text">All Discounts</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADDDISCOUNT) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADDDISCOUNT }} className="">
                      <div className="text">Add Discount</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.BRANDS, PATHS.ADDBRAND]) ? "active" : ""
                }`}
              >
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
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.BRANDS) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.BRANDS }} className="">
                      <div className="text">Brands</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADDBRAND) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADDBRAND }} className="">
                      <div className="text">Add Brand</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.ORDERLIST, PATHS.ORDERDETAIL])
                    ? "active"
                    : ""
                }`}
              >
                <a
                  href="#"
                  className="menu-item-button"
                  onClick={() => toggleDropdown("order")}
                >
                  <div className="icon">
                    <i className="icon-file-plus"></i>
                  </div>
                  <div className="text">Orders</div>
                </a>
                <ul
                  className="sub-menu"
                  style={{
                    display: openDropdown === "order" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ORDERLIST) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ORDERLIST }} className="">
                      <div className="text">Order List</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.CUSTOMERS, PATHS.BANNEDCUSTOMERS])
                    ? "active"
                    : ""
                }`}
              >
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
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.CUSTOMERS) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.CUSTOMERS }} className="">
                      <div className="text">All Customers</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.BANNEDCUSTOMERS) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.BANNEDCUSTOMERS }} className="">
                      <div className="text">Banned Customers</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.MENU, PATHS.ADDMENU]) ? "active" : ""
                }`}
              >
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
                  style={{
                    display: openDropdown === "menu" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.MENU) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.MENU }} className="">
                      <div className="text">All Menus</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADDMENU) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADDMENU }} className="">
                      <div className="text">Create menu</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.HERO, PATHS.ADD_HERO]) ? "active" : ""
                }`}
              >
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
                  style={{
                    display: openDropdown === "hero" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.HERO) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.HERO }} className="">
                      <div className="text">All hero</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADD_HERO) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADD_HERO }} className="">
                      <div className="text">Create hero</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.SPOTLIGHT, PATHS.ADD_SPOTLIGHT])
                    ? "active"
                    : ""
                }`}
              >
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
                    display: openDropdown === "spotlight" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.SPOTLIGHT) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.SPOTLIGHT }} className="">
                      <div className="text">All spotlight</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADD_SPOTLIGHT) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.ADD_SPOTLIGHT }} className="">
                      <div className="text">Create spotlight</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([PATHS.CALLTOACTION, PATHS.ADD_CALLTOACTION])
                    ? "active"
                    : ""
                }`}
              >
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
                    display:
                      openDropdown === "call-to-action" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.CALLTOACTION) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.CALLTOACTION }} className="">
                      <div className="text">All Call to Actions</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.ADD_CALLTOACTION) ? "active" : ""
                    }`}
                  >
                    <Link
                      to={{ pathname: PATHS.ADD_CALLTOACTION }}
                      className=""
                    >
                      <div className="text">Create Call to Action</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item has-children ${
                  hasActiveChild([
                    PATHS.BLOG,
                    PATHS.CREATE_POST,
                    PATHS.POST_CATEGORY,
                    PATHS.CREATE_POST_CATEGORY,
                    PATHS.POST_COMMENTS,
                  ])
                    ? "active"
                    : ""
                }`}
              >
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
                    display: openDropdown === "blog" ? "block" : "none",
                  }}
                >
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.BLOG) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.BLOG }} className="">
                      <div className="text">All Posts</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.CREATE_POST) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.CREATE_POST }} className="">
                      <div className="text">Create New</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.POST_CATEGORY) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.POST_CATEGORY }} className="">
                      <div className="text">All Category</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.CREATE_POST_CATEGORY) ? "active" : ""
                    }`}
                  >
                    <Link
                      to={{ pathname: PATHS.CREATE_POST_CATEGORY }}
                      className=""
                    >
                      <div className="text">Create Category</div>
                    </Link>
                  </li>
                  <li
                    className={`sub-menu-item ${
                      isActive(PATHS.POST_COMMENTS) ? "active" : ""
                    }`}
                  >
                    <Link to={{ pathname: PATHS.POST_COMMENTS }} className="">
                      <div className="text">Comments</div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className={`menu-item ${
                  isActive(PATHS.CONTACTS) ? "active" : ""
                }`}
              >
                <Link
                  to={{ pathname: PATHS.CONTACTS }}
                  className="menu-item-button"
                >
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
