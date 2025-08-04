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

// Centralized route configuration with metadata
export const ROUTE_CONFIG = {
  LOGIN: {
    path: "/",
    element: <Login />,
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
  //   NOT_FOUND: {
  //     path: "*",
  //     element: <NotFound />,
  //     name: "Not Found",
  //     isProtected: false,
  //   },
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
