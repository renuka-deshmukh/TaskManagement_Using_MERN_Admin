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
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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

  return (
    <>
      <Navbar />
      <div className="d-flex">
        {loggedUser && <Sidebar />}
        <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            {loggedUser ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/task" element={<TaskList />} />
                <Route path="/project" element={<ProjectList />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/task" element={<Navigate to="/login" replace />} />
                <Route path="/project" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
