import { ITask, ITasksConfig } from "@/components/Tasks/interfaces";
import axios from "axios";

export const getTaskList = (config: ITasksConfig): Promise<ITask[]> => {
//   console.log("filters", config);
  const response = axios.post("/api/tasks", {
    filters: config.filters,
  });
  return response.then((res) => res.data);
};
