import React, { useEffect, useState } from "react";
import { createTask, getAllTasks } from "../../apis/taskApis";
import { toast } from "react-toastify";
import { FaEdit, FaPlus } from "react-icons/fa";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import "./Tasks.css";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // ✅ Fetch all data
    const fetchData = async () => {
        try {
            const response = await getAllTasks();
            if (response.data.success) {
                setTasks(response.data.tasks)
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

    // ✅ Add task handler
    const handleAddTask = async (formData) => {
        try {
            const response = await createTask(formData);
            toast.success(response.data.msg || "task added successfully!");
            setShowModal(false);
            fetchData();
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Error adding task");
        }
    };

    return (
        <div className="card shadow-sm p-3 bg-white rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">All task List</h4>
                <button
                    className="btn btn-primary d-flex align-items-center"
                    style={{
                        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                        borderRadius: "10px",
                        padding: "8px 16px",
                    }}
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-2" /> Add task
                </button>
            </div>

            {/* ✅ Table */}
            <table className="table align-middle custom-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th style={{width: "200px"}}>Description</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task, i) => (
                            <tr key={task._id || i}>
                                <td className="fw-semibold">
                                    {task.title}
                                    {/* <div className="text-muted small">{task.description}</div> */}
                                </td>
                                <td>{task.description}</td>
                                <td>{task.projectId?.name}</td>
                                <td>{task.assignTo?.name}</td>
                                <td>{task.startDate ? new Date(task.startDate).toLocaleDateString('en-GB') : '-'}</td>
                                <td>{task.endDate ? new Date(task.endDate).toLocaleDateString('en-GB') : '-'}</td>

                                <td>{task.priority}</td>
                                <td>{task.status}</td>
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
                            <td colSpan="6" className="text-center text-muted">
                                No tasks available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ✅ Add task Modal */}
            <AddTask
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddTask}
            />

            {/* ✅ Edit Modal */}
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
