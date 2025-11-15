import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import { useContext } from "react";

import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/tasks/TaskList";
import ProjectList from "./pages/projects/ProjectList";
import Users from "./pages/users/Users";

import Layout from "./components/Layout"; // ✔ USE LAYOUT

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainApp() {
  const { loggedUser } = useContext(AuthContext);
  const isAdmin = loggedUser?.role === "admin";

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        {isAdmin ? (
          <>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/task" element={<Layout><TaskList /></Layout>} />
            <Route path="/project" element={<Layout><ProjectList /></Layout>} />
            <Route path="/user" element={<Layout><Users /></Layout>} />
          </>
        ) : (
          <>
            {/* Redirect non-admins */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/task" element={<Navigate to="/login" replace />} />
            <Route path="/project" element={<Navigate to="/login" replace />} />
            <Route path="/user" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
