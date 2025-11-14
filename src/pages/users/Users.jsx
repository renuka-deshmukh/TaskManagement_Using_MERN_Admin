import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../apis/userApis";
import { toast } from "react-toastify";
import './Users.css'


const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;



  // ✅ Fetch all data
  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastUser = currentPage * tasksPerPage;
  const indexOfFirstUser = indexOfLastUser - tasksPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / tasksPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="card shadow-sm p-3 bg-white rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">All User List</h4>
      </div>

      {/* ✅ Table */}
      <table className="table align-middle custom-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
  {currentUsers.length > 0 ? (
    currentUsers.map((user, i) => (
      <tr key={user._id || i}>

        <td data-label="Sr.No">{indexOfFirstUser + i + 1}</td>

        <td data-label="Avatar">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="user-avatar-mobile"
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <span>No Avatar</span>
          )}
        </td>

        <td data-label="Name" className="fw-semibold">
          {user.name}
        </td>

        <td data-label="Email">{user.email}</td>

        <td data-label="Role">{user.role}</td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center text-muted">
        No Users available
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

    </div>
  );
};

export default Users;
