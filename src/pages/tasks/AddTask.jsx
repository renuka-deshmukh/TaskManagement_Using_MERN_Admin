import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../apis/projectApis";
import { getAllUsers } from "../../apis/userApis"
import { toast } from "react-toastify";
import './AddTask.css'

const AddTask = ({ show, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [status, setStatus] = useState("Planned");
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedProject, setSelectedProject] = useState("");

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

    useEffect(() => {
        if (show) {
            setTitle("");
            setDescription("");
            setStartDate("");
            setEndDate("");
            setPriority("Low");
            setStatus("Planned");
            setSelectedUser("")
            setSelectedProject("");
        }
    }, [show]);

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!title.trim()) return alert("Please enter task title");
        if (!selectedProject) return alert("Please select a project");
        if (!selectedUser) return alert("Please select a user");
        if (!startDate) return alert("Please select start date");
        if (!endDate) return alert("Please select end date");
        if (!priority) return alert("Please select priority");


        const taskData = {
            title,
            description,
            projectId: selectedProject,
            assignTo: selectedUser,
            startDate,
            endDate,
            priority,
            status,
        };

        onSubmit(taskData);

        if (taskData.startDate && taskData.endDate) {
            const start = new Date(taskData.startDate);
            const end = new Date(taskData.endDate);

            if (end < start) {
                toast.error("End date cannot be before start date");
                return; // Stop form submission
            }
        }
    };

    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg rounded-3 border-0">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">➕ Add New Task</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body p-4">

                            {/* Task Name */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Task Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task name"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter description"
                                    rows="3"
                                />
                            </div>

                            {/* Project Dropdown */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Select Project</label>
                                <select
                                    className="form-control"
                                    value={selectedProject}
                                    onChange={(e) => setSelectedProject(e.target.value)}
                                >
                                    <option value="">-- Select Project --</option>
                                    {projects.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* User Dropdown */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Assign To User</label>
                                <select
                                    className="form-control"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                >
                                    <option value="">-- Select User --</option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
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

                            {/* Priority Dropdown */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Priority</label>
                                <select
                                    className="form-control"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            {/* Status Dropdown */}
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
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
