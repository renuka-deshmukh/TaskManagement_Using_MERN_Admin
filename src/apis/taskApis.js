import axiosInstance from "./axiosInstance";

export const getAllTasks = () => axiosInstance.get('/Task/getAllTasks');

export const createTask = (data) =>
  axiosInstance.post("/task/createTask", data, {
    headers: { "Content-Type": "application/json" },
  });

export const deleteTask = (_id) => axiosInstance.delete(`/task/deleteTask/${_id}`);

export const updateTask = (_id, formData) => axiosInstance.put(`/task/updateTask/${_id}`, formData)