import axiosInstance from "./axiosInstance";

export const getAllProjects = () => axiosInstance.get('/project/getAllProjects');

export const createProject = (data) =>
  axiosInstance.post("/project/createProject", data, {
    headers: { "Content-Type": "application/json" },
  });

export const deleteProject = (_id) => axiosInstance.delete(`/project/deleteProject/${_id}`);

export const updateProject = (_id, formData) => axiosInstance.put(`/project/updateProject/${_id}`, formData)