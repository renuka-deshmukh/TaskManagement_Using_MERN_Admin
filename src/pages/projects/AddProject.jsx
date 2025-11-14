import React, { useEffect, useState } from "react";
import './AddProject.css'

const AddProject = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Planned");

  // ✅ Get logged-in admin ID from localStorage (saved during login)
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const addedBy = loggedInUser?.user_id;

  useEffect(() => {
    if (show) {
      setName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setStatus("Planned");
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter project name");
    if (!startDate) return alert("Please enter start date");
    if (!endDate) return alert("Please select end date");

    if (!addedBy) return alert("Admin info not found! Please log in again.");

    const projectData = { name, description, startDate, endDate, status, addedBy };
    onSubmit(projectData);

    if (projectData.startDate && projectData.endDate) {
      const start = new Date(projectData.startDate);
      const end = new Date(projectData.endDate);

      if (end < start) {
        toast.error("End date cannot be before start date");
        return; // Stop form submission
      }
    };

  };


  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-3 border-0">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">➕ Add New Project</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <div className="modal-body p-4">

              {/* Project Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                />
              </div>

              {/* Start Date */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* End Date */}
              <div className="mb-3">
                <label className="form-label fw-semibold">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Created By (read-only) */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Created By</label>
                <input
                  type="text"
                  className="form-control"
                  value={loggedInUser?.name || ""}
                  readOnly
                />
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

            </div>


            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Add Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
