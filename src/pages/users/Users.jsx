import React, { useEffect, useState } from "react";
import {getAllUsers } from "../../apis/userApis";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);


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
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user._id || i}>
                <td>{i + 1}</td>
                <td>{user.avatar}</td>
                <td className="fw-semibold">
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
               
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

    </div>
  );
};

export default Users;
