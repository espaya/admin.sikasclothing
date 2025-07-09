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
