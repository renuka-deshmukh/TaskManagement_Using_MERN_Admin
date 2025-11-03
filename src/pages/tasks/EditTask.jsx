import React, { useEffect, useState } from 'react'
import { updateTask } from '../../apis/taskApis';
import { toast } from 'react-toastify';

const EditTask = ({ show, onClose, task, onUpdated }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
        startDate: task.startDate?.split("T")[0] || "",
        endDate: task.endDate?.split("T")[0] || "",
        priority: task.priority || "Low",
        status: task.status || "Planned",
      })
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Name"
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

            <div className="d-flex gap-3 mb-3">
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

export default EditTask;