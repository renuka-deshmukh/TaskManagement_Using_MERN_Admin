import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteProject } from '../../apis/projectApis';

const DeleteProject = ({ projectID, onDelete }) => {

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this Project?")) return;
        try {
            const response = await deleteProject(projectID);
            if (response.data.success) {
                toast.success("Project deleted successfully");
                onDelete();
            }
        } catch (error) {
            toast.error("Error deleting Project:", error);
        }
    };
    return (
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            <FaTrash />
        </button>
    
    )
}

export default DeleteProject