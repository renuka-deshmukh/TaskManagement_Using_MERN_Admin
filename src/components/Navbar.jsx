import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import './Navbar.css'

function Navbar({ toggleSidebar }) {
  const { loggedUser } = useContext(AuthContext);

  return (
    <nav className="navbar bg-white shadow-sm px-3 d-flex justify-content-between align-items-center">

      {/* Hamburger only on small screens */}
      <button
        type="button"
        className="btn btn-light d-lg-none"
        onClick={() => {
          // optional debug:
          // console.log("hamburger clicked");
          toggleSidebar();
        }}
        aria-label="Open menu"
      >
        ☰
      </button>

      <h5 className="fw-bold text-primary m-0">Admin Panel</h5>

      {/* User info on mobile only (keeps navbar height) */}
      {loggedUser && (
        <div className="d-lg-none d-flex align-items-center">
          <img
            src={loggedUser.avatar}
            width="35"
            height="35"
            className="rounded-circle me-2"
            alt="avatar"
          />
          <span className="fw-semibold">{loggedUser.name}</span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
