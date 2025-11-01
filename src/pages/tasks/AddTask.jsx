import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../apis/projectApis";
import { getAllUsers } from "../../apis/userApis"
import { toast } from "react-toastify";

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
        if (!setSelectedUser) return alert("Please select a user");
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
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Task Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="form-control mb-3"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            {/* ✅ Project Dropdown */}
                            <select
                                className="form-control mb-3"
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

                            <select
                            className="form-control mb-3"
                                value={selectedUser}
                             onChange={(e) => setSelectedUser(e.target.value)}>
                                <option value="">Select user</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                className="form-control mb-3"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />

                            <input
                                type="date"
                                className="form-control mb-3"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />

                            {/* Priority Dropdown */}
                            <select
                                className="form-control mb-3"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)} // ✅ fixed
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                            {/* Status Dropdown */}
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
