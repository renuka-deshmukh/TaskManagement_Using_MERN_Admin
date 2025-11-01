import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { Mail, Lock, LogIn } from "lucide-react";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  const { loggedUser, login } = useContext(AuthContext);

  useEffect(() => {
    inputRef.current.focus();
    if (loggedUser) navigate("/");
  }, [loggedUser, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        toast(response.msg);
        navigate("/");
      } else {
        toast(response.msg);
      }
    } catch (error) {
      console.error(error);
      toast("Login failed ❌");
    }
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-card p-5 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 login-title">
          <LogIn size={28} className="me-2" />
          Welcome Back
        </h2>
        <p className="text-center login-subtitle mb-4">
          Login to continue 🧑‍💻
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <Mail size={18} className="me-2" />
              Email Address
            </label>
            <input
              ref={inputRef}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn login-btn w-100 rounded-3 fw-semibold">
            Login
          </button>
        </form>

        <div className="text-center my-3 login-or">or</div>
        <div className="text-center">
          <span className="small">Don't have an account? </span>
          <Link to="/register" className="fw-semibold register-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;