import React, { useEffect, useState } from 'react'
import { updateProject } from '../../apis/projectApis';
import { toast } from 'react-toastify';

const UpdateProject = ({ show, onClose, project, onUpdated }) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: ""
  });
  
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        startDate: project.startDate?.split("T")[0] || "",
        endDate: project.endDate?.split("T")[0] || "",
        status: project.status || "Planned",
      })
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      toast.error("End date cannot be before start date");
      return; // stop form submission
    }
  }

    try {
      const response = await updateProject(project._id, formData)
      if (response.data.success) {
        toast.success("Project updated successfully")
        onUpdated();
        onClose();
      } else {
        toast.error("Failed to update project")
      }

    } catch (error) {
      toast.error("Error updating project");
    }
  }

  if (!show) return null;


  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // ✅ dark background overlay
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content p-4 shadow-lg"
          style={{ borderRadius: "16px", border: "none" }}
        >
          {/* Header */}
          <div
            className="mb-3 p-3 text-white"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(90deg, #8dace2ff, #6a11cb)",
            }}
          >
            <h5 className="m-0">Edit Project</h5>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Project Name"
              className="form-control mb-3"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control mb-3"
              rows="3"
            />

            <div className="d-flex gap-3 mb-3">
              <input
                type="Date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start Date"
                className="form-control"
              />
              <input
                type="Date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="End Date"
                className="form-control"
              />
            </div>

            <div  className="d-flex gap-3 mb-3">
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  background: "linear-gradient(90deg, #2575fc, #6a11cb)",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default UpdateProject;