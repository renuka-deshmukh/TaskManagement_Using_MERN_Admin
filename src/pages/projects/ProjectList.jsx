import React, { useEffect, useState } from "react";
import { createProject, getAllProjects } from "../../apis/projectApis";
import { toast } from "react-toastify";
import { FaEdit, FaPlus } from "react-icons/fa";
import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
      const projectsPerPage = 5;
  


  // ✅ Fetch all data
  const fetchData = async () => {
    try {
      const response = await getAllProjects();
      if (response.data.success) {
        setProjects(response.data.projects);
      } else {
        toast.error("Failed to load projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Error fetching projects");
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);


  // ✅ Add project handler
  const handleAddProject = async (formData) => {
    try {
      const response = await createProject(formData);
      toast.success(response.data.msg || "Project added successfully!");
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project");
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
    <div className="card shadow-sm p-3 bg-white rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">All Project List</h4>
        <button
          className="btn btn-primary d-flex align-items-center"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            borderRadius: "10px",
            padding: "8px 16px",
          }}
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" /> Add Project
        </button>
      </div>

      {/* ✅ Table */}
      <table className="table align-middle custom-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th style={{ width: "220px" }}>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Added By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.length > 0 ? (
            currentProjects.map((project, i) => (
              <tr key={project._id || i}>
                <td>{indexOfFirstProject + i + 1}</td>
                <td className="fw-semibold">
                  {project.name}
                  {/* <div className="text-muted small">{project.description}</div> */}
                </td>
                <td>{project.description}</td>
                <td>{project.startDate ? new Date(project.startDate).toLocaleDateString('en-GB') : '-'}</td>
                <td>{project.endDate ? new Date(project.endDate).toLocaleDateString('en-GB') : '-'}</td>
                <td>{project.addedBy?.name}</td>
                <td>{getStatusText(project.status)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      setSelectedProject(project);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <DeleteProject projectID={project._id} onDelete={fetchData} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No projects available
              </td>
            </tr>
          )}
        </tbody>
      </table>

        {/* ✅ Pagination */}
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



      {/* ✅ Add Project Modal */}
      <AddProject
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProject}
      />

      {/* ✅ Edit Modal */}
      <EditProject
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={selectedProject}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default ProjectList;
