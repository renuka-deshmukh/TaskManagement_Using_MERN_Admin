import React, { useEffect, useState } from 'react'
import { updateTask } from '../../apis/taskApis';
import { getAllProjects } from "../../apis/projectApis";
import { getAllUsers } from "../../apis/userApis"
import { toast } from 'react-toastify';

const EditTask = ({ show, onClose, task, onUpdated }) => {

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignTo: "",
    startDate: "",
    endDate: "",
    priority: "",
    status: ""
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        projectId: task.projectId?._id || task.projectId || "",
        assignTo: task.assignTo?._id || task.assignTo || "",
        startDate: task.startDate?.split("T")[0] || "",
        endDate: task.endDate?.split("T")[0] || "",
        priority: task.priority || "Low",
        status: task.status || "Planned",
      })
    }
  }, [task]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proRes = await getAllProjects();
        const userRes = await getAllUsers();
        if (proRes.data.success) setProjects(proRes.data.projects);
        if (userRes.data.success) setUsers(userRes.data.users);

      } catch (error) {
        toast.error("Failed to load projects");
      }
    };
    fetchData();
  }, []);

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
      const response = await updateTask(task._id, formData)
      if (response.data.success) {
        toast.success("Task updated successfully")
        onUpdated();
        onClose();
      } else {
        toast.error("Failed to update task")
      }

    } catch (error) {
      toast.error("Error updating task");
    }
  }

  if (!show) return null;


  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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
            <h5 className="m-0">Edit Task</h5>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Task Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Task Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task name"
                className="form-control"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="form-control"
                rows="3"
              />
            </div>

            {/* Project + Assign User */}
            <div className="d-flex gap-3 mb-3">

              <div className="w-100">
                <label className="form-label fw-semibold">Select Project</label>
                <select
                  name="projectId"
                  className="form-control"
                  value={formData.projectId}
                  onChange={handleChange}
                >
                  <option value="">-- Select Project --</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-100">
                <label className="form-label fw-semibold">Assign To User</label>
                <select
                  name="assignTo"
                  className="form-control"
                  value={formData.assignTo}
                  onChange={handleChange}
                >
                  <option value="">-- Select User --</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Dates Row */}
            <div className="d-flex gap-3 mb-3">

              <div className="w-100">
                <label className="form-label fw-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="w-100">
                <label className="form-label fw-semibold">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

            </div>

            {/* Priority + Status */}
            <div className="d-flex gap-3 mb-3">

              <div className="w-100">
                <label className="form-label fw-semibold">Priority</label>
                <select
                  name="priority"
                  className="form-control"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="w-100">
                <label className="form-label fw-semibold">Status</label>
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

export default EditTask;