import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import StudentManagement from "./components/StudentManagement";
import MedicalVisitRecording from "./components/MedicalVisitRecording";
import MedicationInventory from "./components/MedicationInventory";
import ReportsDashboard from "./components/ReportsDashboard";
import UserManagement from "./components/UserManagement";
import LoginPage from "./components/LoginPage";

function PrivateRoute({ children, user, role }) {
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  const [user, setUser] = useState(() => {
    // Lưu login vào localStorage để giữ trạng thái khi reload
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      {user && <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/students" />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/visits" element={
            <PrivateRoute user={user} role="admin">
              <MedicalVisitRecording />
            </PrivateRoute>
          } />
          <Route path="/medications" element={
            <PrivateRoute user={user} role="admin">
              <MedicationInventory />
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute user={user} role="admin">
              <ReportsDashboard />
            </PrivateRoute>
          } />
          <Route path="/users" element={
            <PrivateRoute user={user} role="admin">
              <UserManagement />
            </PrivateRoute>
          } />
        </Routes>
      </Layout>}
      {!user && (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;