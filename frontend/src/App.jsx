import React from "react";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoutes from "./protectRoutes/ProtectedRoutes.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminUser from "./Admin/AdminUser.jsx";
import AdminTask from "./Admin/AdminTask.jsx";
import { Settings } from "lucide-react";
import AdminSettings from "./Admin/AdminSettings.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="admin">
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin-tasks"
          element={
            <ProtectedRoutes role="admin">
              <AdminTask />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin-users"
          element={
            <ProtectedRoutes role="admin">
              <AdminUser />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin-settings"
          element={
            <ProtectedRoutes role="admin">
              <AdminSettings />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
