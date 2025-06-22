import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";

const navStyle = {
  background: "#1976d2",
  padding: "10px 0",
  marginBottom: 20
};
const linkStyle = {
  color: "#fff",
  margin: "0 15px",
  textDecoration: "none",
  fontWeight: "bold"
};
const activeLinkStyle = {
  ...linkStyle,
  textDecoration: "underline",
  fontWeight: "bolder"
};

function Layout({ children, user, onLogout }) {
  const location = useLocation();

  return (
    <div>
      <header
        style={{
          background: "#1565c0 url('/header-bg.jpg') no-repeat center/cover",
          color: "#fff",
          padding: 20,
          position: "relative",
          minHeight: 90,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src={logo} alt="Logo" style={{ height: 48, marginRight: 16 }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 24, color: "#fff" }}>School Healthcare Management System</h1>
            <p style={{ margin: 0, fontSize: 16, color: "#e3eafc" }}>
              Manage student health records, visits, medications, and more.
            </p>
          </div>
        </Link>
        {user && (
          <div style={{ position: "absolute", top: 20, right: 30, textAlign: "right" }}>
            <div style={{ fontWeight: "bold" }}>{user.username} ({user.role})</div>
            <button
              onClick={onLogout}
              style={{
                marginTop: 5,
                background: "#fff",
                color: "#1565c0",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <nav style={navStyle}>
  <Link
    to="/students"
    style={location.pathname.startsWith("/students") ? activeLinkStyle : linkStyle}
  >
    Student Management
  </Link>
  {user?.role === "admin" && (
    <>
      <Link
        to="/visits"
        style={location.pathname.startsWith("/visits") ? activeLinkStyle : linkStyle}
      >
        Medical Visit Recording
      </Link>
      <Link
        to="/medications"
        style={location.pathname.startsWith("/medications") ? activeLinkStyle : linkStyle}
      >
        Medication Inventory
      </Link>
      <Link
        to="/reports"
        style={location.pathname.startsWith("/reports") ? activeLinkStyle : linkStyle}
      >
        Reports & Dashboard
      </Link>
      <Link
        to="/users"
        style={location.pathname.startsWith("/users") ? activeLinkStyle : linkStyle}
      >
        User Management
      </Link>
    </>
  )}
</nav>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
        {children}
      </div>
      <footer style={{ textAlign: "center", margin: 30, color: "#888" }}>
        &copy; 2025 School Healthcare Management System
      </footer>
    </div>
  );
}

export default Layout;