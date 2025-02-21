import {
  User,
  UserListResponse,
  PaginationParams,
  IPaginatedResponse,
} from "@/types";
import { fetchData, createData, updateData, deleteData } from "./api";
import { IUser } from "@/types/users";
import api from "./api";

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

export const getPaginatedUsers = async (
  page: number,
  perPage: number
): Promise<IPaginatedResponse<IUser>> => {
  const response = await api.get(`/users?page=${page}&per_page=${perPage}`);

  console.log("API Response:", response.data); // 🔍 Debugging

  return {
    data: response.data,
    meta: {
      pagination: {
        total: parseInt(response.headers["x-pagination-total"] || "0"),
        pages: parseInt(response.headers["x-pagination-pages"] || "0"),
        page,
        limit: perPage,
      },
    },
  };
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return fetchData<IUser[]>("/users");
};
