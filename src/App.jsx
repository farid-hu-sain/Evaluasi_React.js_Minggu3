import React from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const linkStyle = {
    marginRight: 12,
    textDecoration: "none",
    color: "#333",
  };

  const activeStyle = {
    fontWeight: "bold",
    color: "#00cc99",
  };

  return (
    <div>
      <nav style={{ padding: 12, borderBottom: "1px solid #ddd", marginBottom: 16 }}>
        <NavLink to="/products" style={linkStyle} activeStyle={activeStyle}>Products</NavLink>
        <NavLink to="/cart" style={linkStyle} activeStyle={activeStyle}>Cart</NavLink>
        <NavLink to="/checkout" style={linkStyle} activeStyle={activeStyle}>Checkout</NavLink>
        <NavLink to="/login" style={linkStyle} activeStyle={activeStyle}>Login</NavLink>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </div>
  );
}
