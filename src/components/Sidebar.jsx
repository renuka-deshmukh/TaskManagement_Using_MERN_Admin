import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

import {
  FaHome,
  FaTags,
  FaBox,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ FIX: added useNavigate

  const { loggedUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/project", label: "Projects", icon: <FaTags /> },
    { path: "/task", label: "Tasks", icon: <FaBox /> },
    { path: "/user", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        minHeight: "100vh",
        width: "240px",
        background: "#f4f6f9",
        borderRight: "1px solid #dee2e6",
      }}
    >
      {/* Profile Section */}
      <div className="text-center mb-4 mt-5">
        <img
          src={loggedUser?.avatar}
          alt="avatar"
          className="rounded-circle mb-2 shadow-sm"
          width="80"
          height="80"
        />

        <h6 className="fw-bold mb-0">{loggedUser?.name || "Admin User"}</h6>
        <small className="text-muted">
          {loggedUser?.email || "Administrator"}
        </small>
      </div>

      {/* Navigation Links */}
      <ul className="nav nav-pills flex-column mb-auto">
        {links.map((link) => (
          <li className="nav-item mb-1" key={link.path}>
            <Link
              to={link.path}
              className={`nav-link d-flex align-items-center ${location.pathname === link.path ? "active-link" : "text-dark"
                }`}
              style={{
                borderRadius: "8px",
                padding: "10px 14px",
                fontWeight: 500,
                transition: "0.3s",
              }}
            >
              <span className="me-2">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout / Login at Bottom */}
      {loggedUser ? (
        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center rounded-3"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>
      ) : (
        <button
          className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center rounded-3"
          onClick={() => navigate("/login")}
        >
          <FaUserCircle className="me-2" />
          Login
        </button>
      )}

      {/* Footer */}
      <div className="text-center mt-3 text-muted" style={{ fontSize: "12px" }}>
        © 2025 E-commerce Admin
      </div>
    </div>
  );
}

export default Sidebar;
