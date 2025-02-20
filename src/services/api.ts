import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { message } from "antd";

// axios instance with base configuration
const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GoRest API token
const API_TOKEN =
  "c562abe2763b27f5a1c16b169ae19f5c1eac98b2b97764039612ce3e2d749be3";

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  // Add authorization header to each request
  config.headers.Authorization = `Bearer ${API_TOKEN}`;
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;

    if (response) {
      const status = response.status;

      // Handle common error cases
      if (status === 401) {
        message.error("Unauthorized. Please check your API token.");
      } else if (status === 404) {
        message.error("Resource not found.");
      } else if (status === 422) {
        // Validation errors
        const errorData = response.data as any;
        if (Array.isArray(errorData)) {
          errorData.forEach((err) => {
            message.error(`${err.field}: ${err.message}`);
          });
        } else {
          message.error("Validation error occurred.");
        }
      } else if (status >= 500) {
        message.error("Server error. Please try again later.");
      } else {
        message.error("An error occurred.");
      }
    } else {
      message.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Generic GET request function with pagination
export const fetchData = async <T>(
  endpoint: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(endpoint, { params, ...config });
  return response.data;
};

// Generic POST request function
export const createData = async <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(endpoint, data, config);
  return response.data;
};

// Generic PUT request function
export const updateData = async <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(endpoint, data, config);
  return response.data;
};

// Generic DELETE request function
export const deleteData = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(endpoint, config);
  return response.data;
};

export default api;
