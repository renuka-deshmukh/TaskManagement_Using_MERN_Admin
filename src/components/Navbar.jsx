import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

function Navbar() {
//   const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <Link className="navbar-brand fw-bold text-primary" to="/">
         Admin Panel
      </Link>

      <div className="ms-auto">
        {/* {user ? (
          <>
            <span className="me-3">Hello, <b>{user.name}</b></span>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary btn-sm me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )} */}
      </div>
    </nav>
  );
}

export default Navbar;
