// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCubes, FaProjectDiagram } from "react-icons/fa";
import { getAllProjects } from "../apis/projectApis"; 
import { getAllTasks } from "../apis/taskApis";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0); 

  // ✅ Fetch counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const projectRes = await getAllProjects();
        const taskRes = await getAllTasks();
        if (projectRes.data.success) setProjectCount(projectRes.data.projects.length);
        if (taskRes.data.success) setTaskCount(taskRes.data.tasks.length);
        
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="p-4" style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* ✅ Top Banner */}
      <div className="dashboard-banner text-center mb-5 p-4 rounded shadow-sm">
        <h2 className="fw-bold text-white mb-2">Welcome Back, Admin!</h2>
        <p className="text-light mb-0">
          Manage your <strong>Projects</strong> and <strong>Tasks</strong> efficiently 🚀
        </p>
      </div>

      {/* ✅ Horizontal Dashboard Summary */}
      <div className="container">
        <div
          className="list-group shadow-sm rounded overflow-hidden"
          style={{ background: "white" }}
        >
          {/* Tasks */}
          <Link
            to="/task"
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
          >
            <div className="d-flex align-items-center">
              <FaCubes className="text-success me-3" size={35} />
              <div>
                <h5 className="mb-1 fw-bold">Tasks</h5>
                <p className="mb-0 text-muted small">
                  Organize and manage task details
                </p>
              </div>
            </div>
            <span className="badge bg-success rounded-pill fs-6 px-3 py-2">
              {taskCount}
            </span>
          </Link>

          {/* Projects */}
          <Link
            to="/project"
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-4"
          >
            <div className="d-flex align-items-center">
              <FaProjectDiagram className="text-primary me-3" size={35} />
              <div>
                <h5 className="mb-1 fw-bold">Projects</h5>
                <p className="mb-0 text-muted small">
                  View and manage all ongoing projects
                </p>
              </div>
            </div>
            <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
              {projectCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
