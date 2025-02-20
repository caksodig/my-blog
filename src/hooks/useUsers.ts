import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "@/services/users";
import { PaginationParams } from "@/types";

// Hook for fetching users with pagination
export const useUserList = (params: PaginationParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (prevData) => prevData,
  });
};

// Hook for fetching a single user
export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
