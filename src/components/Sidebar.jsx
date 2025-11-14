import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { FaHome, FaTags, FaBox, FaUsers, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

function Sidebar({ isOpen, closeSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
    closeSidebar();
  };

  useEffect(() => {
    // close on ESC
    const onKey = (e) => { if (e.key === "Escape") closeSidebar(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSidebar]);

  const links = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/project", label: "Projects", icon: <FaTags /> },
    { path: "/task", label: "Tasks", icon: <FaBox /> },
    { path: "/user", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <>
      {/* Desktop sidebar (visible on lg+) */}
      <aside className="sidebar d-none d-lg-flex">
        <SidebarContent links={links} loggedUser={loggedUser} handleLogout={handleLogout} />
      </aside>

      {/* Overlay (only shown when mobile sidebar open) */}
      <div
        className={`mobile-overlay ${isOpen ? "visible" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!isOpen}
      />

      {/* Mobile sidebar */}
      <aside className={`mobile-sidebar ${isOpen ? "open" : ""}`} role="dialog" aria-hidden={!isOpen}>
        <div className="mobile-sidebar-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={loggedUser?.avatar} alt="avatar" width="48" height="48" className="rounded-circle me-2" />
            <div>
              <div className="fw-bold">{loggedUser?.name}</div>
              <small className="text-muted">{loggedUser?.email}</small>
            </div>
          </div>
          <button className="btn btn-light" onClick={closeSidebar} aria-label="Close menu">✖</button>
        </div>

        <div className="mobile-sidebar-body">
          <SidebarContent links={links} loggedUser={loggedUser} handleLogout={handleLogout} />
        </div>
      </aside>
    </>
  );
}

function SidebarContent({ links, loggedUser, handleLogout }) {
  return (
    <div className="p-3">
      <div className="text-center mb-4 mt-2">
        <img src={loggedUser?.avatar} alt="avatar" className="rounded-circle mb-2 shadow-sm" width="80" height="80" />
        <h6 className="fw-bold mb-0">{loggedUser?.name || "Admin User"}</h6>
        <small className="text-muted">{loggedUser?.email || "Administrator"}</small>
      </div>

      <ul className="nav flex-column mb-3">
        {links.map(link => (
          <li className="nav-item mb-1" key={link.path}>
            <Link to={link.path} className={`nav-link d-flex align-items-center ${locationPathMatch(link.path)}`} >
              <span className="me-2">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </div>
  );
}

// helper for active link class (optional)
function locationPathMatch(path) {
  // This is a simple helper. In SidebarContent the location isn't available
  // so you may adapt to pass location prop if needed.
  return "";
}

export default Sidebar;
