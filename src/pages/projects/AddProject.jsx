import React, { useEffect, useState } from "react";

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
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                className="form-control mb-3"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="form-control mb-3"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              {/* ✅ Show who is adding (read-only field) */}
              <input
                type="text"
                className="form-control mb-3"
                value={loggedInUser?.name || ""}
                readOnly
              />

              <select
                className="form-control mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
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
