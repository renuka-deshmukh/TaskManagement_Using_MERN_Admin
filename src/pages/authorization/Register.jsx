import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Phone } from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import "./Login.css"; 
import { toast } from "react-toastify";

const Register = () => {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const message = await register(name, email, password);

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
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card p-5 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 login-title">
          <UserPlus size={28} className="me-2" />
          Create Account
        </h2>
        <p className="text-center login-subtitle mb-4">
          Join us today.. It only takes a minute!
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <User size={18} className="me-2" />
              User Name
            </label>
            <input
              ref={inputRef}
              type="text"
              className="form-control rounded-3"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <Mail size={18} className="me-2" />
              Email Address
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <Lock size={18} className="me-2" />
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label small" htmlFor="terms">
              I agree to the{" "}
              <a href="#" className="register-link">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="btn login-btn w-100 rounded-3 fw-semibold">
            Register
          </button>
        </form>

        <div className="text-center my-3 login-or">or</div>
        <div className="text-center">
          <span className="small">Already have an account? </span>
          <Link to="/login" className="fw-semibold register-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;