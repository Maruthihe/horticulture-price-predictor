import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // ✅ Trigger state update across tabs
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return (
    <nav
      className="bg-green-600 px-6 py-4 flex justify-between items-center shadow-md"
      style={{
        backgroundColor: "#059669",
        padding: "1rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="flex items-center gap-2" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          className="text-yellow-400 text-2xl"
          style={{ color: "#fbbf24", fontSize: "1.5rem" }}
        >
          🌾
        </span>
        <h1
          className="text-white text-xl font-bold"
          style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: "bold" }}
        >
          Crop Price Predictor
        </h1>
      </div>

      <div
        className="space-x-8 flex items-center"
        style={{ display: "flex", alignItems: "center", gap: "2rem" }}
      >
        <Link
          className="text-white hover:text-yellow-200 transition-colors font-medium"
          style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-white hover:text-yellow-200 transition-colors font-medium"
          style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
          to="/lookup"
        >
          Price Lookup
        </Link>
        <Link
          className="text-white hover:text-yellow-200 transition-colors font-medium"
          style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
          to="/predict"
        >
          Prediction
        </Link>
        <Link
          className="text-white hover:text-yellow-200 transition-colors font-medium"
          style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
          to="/about"
        >
          About
        </Link>

        {username ? (
          <>
            <span
              className="text-white font-medium"
              style={{ color: "#ffffff", fontWeight: "500" }}
            >
              Hi, {username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors"
              style={{
                backgroundColor: "#ef4444",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="text-white hover:text-yellow-200 transition-colors font-medium"
              style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-white hover:text-yellow-200 transition-colors font-medium"
              style={{ color: "#ffffff", fontWeight: "500", textDecoration: "none" }}
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;