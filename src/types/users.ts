export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  status: "active" | "inactive";
}

export interface UserListResponse {
  data: IUser[];
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      per_page: number;
    };
  };
}
