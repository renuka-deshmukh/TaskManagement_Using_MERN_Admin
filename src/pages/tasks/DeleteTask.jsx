import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteTask } from '../../apis/taskApis';

const DeleteTask = ({ taskID, onDelete }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this Task?")) return;
        try {
            const response = await deleteTask(taskID);
            if (response.data.success) {
                toast.success("Task deleted successfully");
                onDelete();
            }
        } catch (error) {
            toast.error("Error deleting Task:", error);
        }
    };
    return (
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            <FaTrash />
        </button>
    
    )
}

export default DeleteTask