import { User, UserListResponse, PaginationParams } from "@/types";
import { fetchData, createData, updateData, deleteData } from "./api";

// Get paginated list of users
export const getUsers = async (params: PaginationParams) => {
  return fetchData<UserListResponse>("/users", params);
};

// Get a single user by ID
export const getUserById = async (id: number) => {
  return fetchData<User>(`/users/${id}`);
};

// Create a new user
export const createUser = async (userData: Partial<User>) => {
  return createData<User>("/users", userData);
};

// Update an existing user
export const updateUser = async (id: number, userData: Partial<User>) => {
  return updateData<User>(`/users/${id}`, userData);
};

// Delete a user
export const deleteUser = async (id: number) => {
  return deleteData(`/users/${id}`);
};

export const getPaginatedUsers = async (page: number, pageSize: number) => {
  return fetchData<UserListResponse>("/users", {
    page,
    per_page: pageSize,
  });
};
