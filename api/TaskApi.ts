import { ITask, ITasksConfig } from "@/components/Screens/Tasks/interfaces";
import { ColumnFiltersState, PaginationState } from "@tanstack/react-table";
import axios from "axios";

export const getTaskList = (params:{
  filters: ColumnFiltersState
  pagination: PaginationState
}): Promise<{
  tasks: ITask[],
  totalCount: number
}> => {
//   console.log("filters", config);
  const response = axios.post("/api/tasks", {
    filters: params.filters,
    pagination: params.pagination,
  });
  return response.then((res) => res.data);
};


export const seedTasks = () => {
  const response = axios.get("/api/tasks");
  return response.then((res) => res.data);
}

export const getTaskById = (id: number) => {
  const response = axios.get(`/api/tasks/${id}`);
  return response.then((res) => res.data);
}