import React, { useEffect, useState } from "react";
import { createTask, getAllTasks } from "../../apis/taskApis";
import { toast } from "react-toastify";
import { FaEdit, FaPlus } from "react-icons/fa";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import "./Tasks.css";
import { getAllUsers } from "../../apis/userApis";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    // ✅ Fetch user data 
    const fetchUserData = async () => {
        try {
            const response = await getAllUsers();
            if (response.data.success) {
                setUsers(response.data.users);

            }
            else {
                toast.error("Failed to load users");

            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error fetching users");
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);


    // ✅ Fetch all data
    const fetchData = async () => {
        try {
            const response = await getAllTasks();
            if (response.data.success) {
                setTasks(response.data.tasks);
            } else {
                toast.error("Failed to load tasks");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Error fetching tasks");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) console.log("TASK DATA:", tasks[0]);
    }, [tasks]);


    // ✅ Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    // ✅ Add task handler
    const handleAddTask = async (formData) => {
        try {
            const response = await createTask(formData);
            toast.success(response.data.msg || "Task added successfully!");
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Error adding task");
        }
    };

    // Priority badge color
    const getPriorityText = (priority) => {
        switch (priority) {
            case "High":
                return <span style={{ color: "red", fontWeight: "600" }}>High</span>;
            case "Medium":
                return <span style={{ color: "orange", fontWeight: "600" }}>Medium</span>;
            case "Low":
                return <span style={{ color: "green", fontWeight: "600" }}>Low</span>;
            default:
                return <span style={{ color: "gray" }}>{priority}</span>;
        }
    };


    const getStatusText = (status) => {
        switch (status) {
            case "Planned":
                return <span style={{ color: "gray", fontWeight: "600" }}>Planned</span>;
            case "In Progress":
                return <span style={{ color: "#0d6efd", fontWeight: "600" }}>In Progress</span>; // blue
            case "Completed":
                return <span style={{ color: "green", fontWeight: "600" }}>Completed</span>;
            default:
                return <span style={{ color: "black" }}>{status}</span>;
        }
    };


    return (
        <div className="card shadow-sm p-4 bg-white rounded" style={{ overflow: "hidden" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0">All Task List</h4>
                <button
                    className="btn btn-primary d-flex align-items-center"
                    style={{
                        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                        borderRadius: "10px",
                        padding: "8px 16px",
                    }}
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add Task
                </button>
            </div>

            {/* ✅ Scrollable responsive table */}
            <div className="table-responsive">
                <table className="table table-hover align-middle text-center custom-table mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Sr.No</th>
                            <th style={{ width: "170px" }}>Task</th>
                            <th style={{ width: "220px" }}>Description</th>
                            <th>Project</th>
                            <th>Assigned To</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th style={{ width: "120px" }}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentTasks.length > 0 ? (
                            currentTasks.map((task, i) => (
                                <tr key={task._id || i}>
                                    <td>{indexOfFirstTask + i + 1}</td>
                                    <td className="fw-semibold text-start ps-3">{task.title}</td>
                                    <td className="text-muted small text-start">{task.description}</td>
                                    <td>{task.projectId?.name || "-"}</td>
                                    <td>
                                        {(() => {
                                            const assignedUser = users.find(u => u._id === task.assignTo?._id);

                                            return (
                                                <div className="d-flex align-items-center justify-content-center gap-2">

                                                    {/* ✅ Avatar */}
                                                    {assignedUser?.avatar ? (
                                                        <img
                                                            src={assignedUser.avatar}
                                                            alt="avatar"
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: "40px",
                                                                height: "40px",
                                                                borderRadius: "50%",
                                                                background: "#ddd",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "11px",
                                                                color: "#555"
                                                            }}
                                                        >
                                                            NO
                                                        </div>
                                                    )}

                                                    {/* ✅ User Name */}
                                                    <span className="fw-semibold">
                                                        {assignedUser?.name || task.assignTo?.name || "-"}
                                                    </span>

                                                </div>
                                            );
                                        })()}
                                    </td>

                                    <td>
                                        {task.startDate
                                            ? new Date(task.startDate).toLocaleDateString("en-GB")
                                            : "-"}
                                    </td>
                                    <td>
                                        {task.endDate
                                            ? new Date(task.endDate).toLocaleDateString("en-GB")
                                            : "-"}
                                    </td>
                                    <td>{getPriorityText(task.priority)}</td>
                                    <td>{getStatusText(task.status)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => {
                                                setSelectedTask(task);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <DeleteTask taskID={task._id} onDelete={fetchData} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-muted py-3">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <nav>
                        <ul className="pagination mb-0">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <span className="page-link">{i + 1}</span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            {/* Add Task Modal */}
            <AddTask
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddTask}
            />

            {/* Edit Task Modal */}
            <EditTask
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={selectedTask}
                onUpdated={fetchData}
            />
        </div>
    );
};

export default TaskList;
