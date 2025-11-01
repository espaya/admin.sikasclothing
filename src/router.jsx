import { createBrowserRouter } from "react-router-dom";
import GuestRoute from "./auth/GuestRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import AddProduct from "./views/AddProduct.jsx";
import AddCateogry from "./views/AddCategory.jsx";
import Category from "./views/Category.jsx";
import Discount from "./views/Discount.jsx";
import AddDiscount from "./views/AddDiscount.jsx";
import Brand from "./views/Brand.jsx";
import AddBrand from "./views/AddBrand.jsx";
import OrderList from "./views/OrderList.jsx";
import OrderDetail from "./views/OrderDetail.jsx";
import Customers from "./views/Customers.jsx";
import BannedCustomers from "./views/BannedCustomers.jsx";
import ProductList from "./views/ProductList.jsx";
import Menu from "./views/Menu.jsx";
import AddMenu from "./views/Addmenu.jsx";
import Settings from "./views/Settings.jsx";
import AddHero from "./views/AddHero.jsx";
import Hero from "./views/Hero.jsx";
import Spotlight from "./views/Spotlight.jsx";
import AddSpotlight from "./views/AddSpotlight.jsx";
import CallToAction from "./views/CallToAction.jsx";
import AddCallToAction from "./views/AddCallToAction.jsx";
import ShippingMethodLists from "./views/ShippingMethodLists.jsx";
import TaxLists from "./views/Taxlists.jsx";
import NotFound from "./views/NotFound.jsx";
import AllPosts from "./views/AllPosts.jsx";
import CreatePost from "./views/CreatePost.jsx";
import PostCategory from "./views/PostCategory.jsx";
import CreatePostCategory from "./views/CreatePostCategory.jsx";
import Comments from "./views/Comments.jsx";
import Contacts from "./views/Contacts.jsx";
import EditProduct from "./views/Editproduct.jsx";
import AddCategoryForm from "./components/AddCategoryForm.jsx";

// Centralized route configuration with metadata
export const ROUTE_CONFIG = {
  LOGIN: {
    path: "/",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
    name: "Login",
    isProtected: false,
  },

  // Admin route
  ADMIN: {
    path: "/sc-dashboard",
    element: <Dashboard />,
    name: "Dashboard",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADDPRODUCT: {
    path: "/sc-dashboard/product/add-product",
    element: <AddProduct />,
    name: "Add Product",
    isProtected: true,
    roles: ["ADMIN"],
  },

  EDIT_PRODUCT: {
    path: "/sc-dashboard/product/edit-product/:slug",
    element: <AddProduct />,
    name: "Edit Product",
    isProtected: true,
    roles: ["ADMIN"],
  },

  PRODUCTLIST: {
    path: "/sc-dashboard/products",
    element: <ProductList />,
    name: "Add Product",
    isProtected: true,
    roles: ["ADMIN"],
  },
  CATEGORY: {
    path: "/sc-dashboard/product/category",
    element: <Category />,
    name: " Category",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADDCATEGORY: {
    path: "/sc-dashboard/product/add-category",
    element: <AddCateogry />,
    name: "Add Category",
    isProtected: true,
    roles: ["ADMIN"],
  },
  EDITCATEGORY: {
    path: "/sc-dashboard/product/edit-category/:slug",
    element: <AddCateogry />,
    name: "Edit Category",
    isProtected: true,
    roles: ["ADMIN"],
  },
  DISCOUNT: {
    path: "/sc-dashboard/product/discount",
    element: <Discount />,
    name: "Discount",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADDDISCOUNT: {
    path: "/sc-dashboard/product/add-discount",
    element: <AddDiscount />,
    name: "Add Discount",
    isProtected: true,
    roles: ["ADMIN"],
  },
  BRANDS: {
    path: "/sc-dashboard/product/brands",
    element: <Brand />,
    name: "Brands",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADDBRAND: {
    path: "/sc-dashboard/product/add-brand",
    element: <AddBrand />,
    name: "Add Brand",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ORDERLIST: {
    path: "/sc-dashboard/orderlist",
    element: <OrderList />,
    name: "Order List",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ORDERDETAIL: {
    path: "/sc-dashboard/order-detail",
    element: <OrderDetail />,
    name: "Order Detail",
    isProtected: true,
    roles: ["ADMIN"],
  },
  CUSTOMERS: {
    path: "/sc-dashboard/customers",
    element: <Customers />,
    name: "Customers",
    isProtected: true,
    roles: ["ADMIN"],
  },
  BANNEDCUSTOMERS: {
    path: "/sc-dashboard/customers/banned",
    element: <BannedCustomers />,
    name: "Banned Customers",
    isProtected: true,
    roles: ["ADMIN"],
  },
  MENU: {
    path: "/sc-dashboard/menu",
    element: <Menu />,
    name: "Menu",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADDMENU: {
    path: "/sc-dashboard/menu/add",
    element: <AddMenu />,
    name: "Add Menu",
    isProtected: true,
    roles: ["ADMIN"],
  },
  HERO: {
    path: "/sc-dashboard/hero",
    element: <Hero />,
    name: "All Hero",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADD_HERO: {
    path: "/sc-dashboard/hero/add",
    element: <AddHero />,
    name: "Add Hero",
    isProtected: true,
    roles: ["ADMIN"],
  },

  CALLTOACTION: {
    path: "/sc-dashboard/call-to-action",
    element: <CallToAction />,
    name: "Call to Action",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADD_CALLTOACTION: {
    path: "/sc-dashboard/call-to-action/add",
    element: <AddCallToAction />,
    name: "Add Call to Action",
    isProtected: true,
    roles: ["ADMIN"],
  },

  SPOTLIGHT: {
    path: "/sc-dashboard/spotlight",
    element: <Spotlight />,
    name: "All Spotlight",
    isProtected: true,
    roles: ["ADMIN"],
  },
  ADD_SPOTLIGHT: {
    path: "/sc-dashboard/spotlight/add",
    element: <AddSpotlight />,
    name: "All Spotlight",
    isProtected: true,
    roles: ["ADMIN"],
  },

  SETTINGS: {
    path: "/sc-dashboard/settings",
    element: <Settings />,
    name: "Settings",
    isProtected: true,
    roles: ["ADMIN"],
  },

  SHIPPING_METHODS: {
    path: "/sc-dashboard/settings/shipping-methods",
    element: <ShippingMethodLists />,
    name: "Settings",
    isProtected: true,
    roles: ["ADMIN"],
  },

  TAX_RATES: {
    path: "/sc-dashboard/settings/tax-rates",
    element: <TaxLists />,
    name: "Settings",
    isProtected: true,
    roles: ["ADMIN"],
  },

  // Blog section
  BLOG: {
    path: "/sc-dashboard/blog",
    element: <AllPosts />,
    name: "All Posts",
    isProtected: true,
    roles: ["ADMIN"],
  },

  CREATE_POST: {
    path: "/sc-dashboard/blog/create",
    element: <CreatePost />,
    name: "Create Post",
    isProtected: true,
    roles: ["ADMIN"],
  },

  POST_CATEGORY: {
    path: "/sc-dashboard/blog/category",
    element: <PostCategory />,
    name: "Post Category",
    isProtected: true,
    roles: ["ADMIN"],
  },

  CREATE_POST_CATEGORY: {
    path: "/sc-dashboard/blog/category/create",
    element: <CreatePostCategory />,
    name: "Create Post Category",
    isProtected: true,
    roles: ["ADMIN"],
  },

  POST_COMMENTS: {
    path: "/sc-dashboard/blog/comments",
    element: <Comments />,
    name: "Comments",
    isProtected: true,
    roles: ["ADMIN"],
  },

  CONTACTS: {
    path: "/sc-dashboard/contacts",
    element: <Contacts />,
    name: "Contacts",
    isProtected: true,
    roles: ["ADMIN"],
  },

  NOT_FOUND: {
    path: "*",
    element: <NotFound />,
    name: "Not Found",
    isProtected: false,
  },
};

// Helper functions for route access
export const getRoutePath = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.path : "/";
};

export const getRouteElement = (routeName) => {
  const route = Object.values(ROUTE_CONFIG).find((r) => r.name === routeName);
  return route ? route.element : <NotFound />;
};

// Create the router
const router = createBrowserRouter(
  Object.values(ROUTE_CONFIG).map(
    ({ path, element, isProtected, isGuestOnly, roles = [] }) => ({
      path,
      element: isProtected ? (
        <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
      ) : isGuestOnly ? (
        <GuestRoute>{element}</GuestRoute>
      ) : (
        element
      ),
    })
  )
);

export default router;

// Path constants for direct usage
export const PATHS = Object.fromEntries(
  Object.entries(ROUTE_CONFIG).map(([key, value]) => [key, value.path])
);
