import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Image } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import "./Login.css"; 
import { toast } from "react-toastify";

const Register = () => {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const message = await register(name, email, password, avatar);

      if (message?.includes("success")) {
        toast("Registration successful! Please login.");
        navigate("/login");
      } else {
        toast(message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong. Try again later.");
    }
  }

  return (
  
  <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
    <div className="login-card p-4 rounded-4 shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>

      <h2 className="text-center mb-2 login-title">
        <UserPlus size={26} className="me-2" />
        Create Account
      </h2>

      <p className="text-center login-subtitle mb-3">
        Join us today. It only takes a moment!
      </p>

      <form onSubmit={handleRegister}>

        <div className="mb-2">
          <label className="form-label fw-semibold small">
            <User size={16} className="me-1" />
            User Name
          </label>
          <input
            ref={inputRef}
            type="text"
            className="form-control rounded-3 py-2"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-semibold small">
            <Mail size={16} className="me-1" />
            Email Address
          </label>
          <input
            type="email"
            className="form-control rounded-3 py-2"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-semibold small">
            <Lock size={16} className="me-1" />
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-3 py-2"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label fw-semibold small">
            <Image size={16} className="me-1" />
            Profile Image
          </label>
          <input
            type="file"
            className="form-control rounded-3 py-2"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {avatar && (
          <div className="text-center mb-2">
            <img
              src={URL.createObjectURL(avatar)}
              alt="Preview"
              width="80"
              height="80"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input" id="terms" required />
          <label className="form-check-label small" htmlFor="terms">
            I agree to the{" "}
            <a href="#" className="register-link">Terms & Conditions</a>
          </label>
        </div>

        <button type="submit" className="btn login-btn w-100 rounded-3 fw-semibold py-2">
          Register
        </button>
      </form>

      <div className="text-center my-2 login-or small">or</div>

      <div className="text-center small">
        Already have an account?{" "}
        <Link to="/login" className="fw-semibold register-link">
          Login
        </Link>
      </div>

    </div>
  </div>
);

};

export default Register;