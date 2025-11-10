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
    </nav>
  );
}

export default Navbar;
