import React, { useState } from "react";
import logo from "../assets/logo.png"; // Đảm bảo đúng đường dẫn
import { login } from "../api";

const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "student", password: "student123", role: "user" }
];

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await login(form.username.trim(), form.password.trim());
    if (res.code === 1000 && res.fiel?.token) {
      onLogin({
        username: form.username.trim(),
        role: res.fiel.roles?.[0] === "role_admin" ? "admin" : "user",
        token: res.fiel.token
      });
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  } catch {
    setError("Sai tài khoản hoặc mật khẩu!");
  }
};
  return (
    <div
      style={{
        maxWidth: 370,
        margin: "80px auto",
        background: "#fff",
        padding: "36px 28px 28px 28px",
        borderRadius: 14,
        boxShadow: "0 2px 16px #e3eafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: 60,
          marginBottom: 14,
          borderRadius: 10,
          boxShadow: "0 2px 8px #1976d2",
          background: "#fff"
        }}
      />
      <h2 style={{ color: "#1565c0", marginBottom: 22, fontWeight: 700, fontSize: 24, letterSpacing: 0.5 }}>Đăng nhập</h2>
      {error && (
        <div style={{ color: "red", marginBottom: 12, textAlign: "center", width: "100%" }}>{error}</div>
      )}
<form onSubmit={handleSubmit} style={{ width: "100%" }}>
  <input
    name="username"
    placeholder="Tên đăng nhập"
    value={form.username}
    onChange={handleChange}
    style={{
      width: "100%",
      marginBottom: 16,
      fontSize: 16,
      padding: "12px 14px",
      borderRadius: 8,
      border: "1.5px solid #bcd",
      outline: "none",
      transition: "border 0.2s",
      boxSizing: "border-box",
      height: 48,
      lineHeight: "48px",
      background: "#fafdff",
      textAlign: "left"
    }}
    autoFocus
    required
  />
  <input
    name="password"
    type="password"
    placeholder="Mật khẩu"
    value={form.password}
    onChange={handleChange}
    style={{
      width: "100%",
      marginBottom: 20,
      fontSize: 16,
      padding: "12px 14px",
      borderRadius: 8,
      border: "1.5px solid #bcd",
      outline: "none",
      transition: "border 0.2s",
      boxSizing: "border-box",
      height: 48,
      lineHeight: "48px",
      background: "#fafdff",
      textAlign: "left"
    }}
    required
  />
  <button
    type="submit"
    style={{
      width: "100%",
      background: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "12px 0",
      fontWeight: 600,
      fontSize: 17,
      cursor: "pointer",
      transition: "background 0.2s"
    }}
    onMouseOver={e => (e.target.style.background = "#1565c0")}
    onMouseOut={e => (e.target.style.background = "#1976d2")}
  >
    Đăng nhập
  </button>
</form>
      <div style={{ marginTop: 28, color: "#888", fontSize: 13, textAlign: "center", width: "100%" }}>
        <b>Tài khoản mẫu:</b><br />
        Admin: <span style={{ color: "#1976d2" }}>admin / admin123</span><br />
        Học sinh: <span style={{ color: "#1976d2" }}>student / student123</span>
      </div>
    </div>
  );
}

export default LoginPage;