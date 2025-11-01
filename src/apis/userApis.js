import axiosInstance from "./axiosInstance";

// Register
export const registerUser = (adminData) =>
  axiosInstance.post("/user/register", adminData);

// Login
export const loginUser = (credentials) =>
  axiosInstance.post("/user/login", credentials);

// Get User Info by ID
export const getUserInfoById = (userId) =>
  axiosInstance.get(`/user/getUserInfo/${userId}`);
