import { useReducer } from "react";
import { ITask, ITasksConfig, TaskDueBy, TaskViewType } from "./interfaces";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getTaskList } from "@/api/TaskApi";

export interface ITaskDashboardContext {
  taskConfig: ITasksConfig;
  dispatch: any;
  taskList: ITask[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export enum TaskDispatchAction {
  SET_VIEW_TYPE = "SET_VIEW_TYPE",
  UPDATE_FILTERS = "UPDATE_FILTERS",
}

const useTaskDashboard = (): ITaskDashboardContext => {
  const intialState: ITasksConfig = {
    viewType: TaskViewType.LIST,
    filters: {
      dueBy: TaskDueBy.today,
    },
  };

  const [taskConfig, dispatch] = useReducer(tasksReducer, intialState);
  const filters = Object.values(taskConfig.filters);
  console.log("filters", filters);
  const { data, isLoading, isError, error } = useQuery<ITask[]>({
    queryFn: () => getTaskList(taskConfig),
    queryKey: filters,
  });

  console.log("data", taskConfig);

  return {
    taskConfig,
    dispatch,
    taskList: data || [],
    isLoading,
    isError,
    error,
  };
};

export default useTaskDashboard;

export function tasksReducer(
  data: ITasksConfig,
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case TaskDispatchAction.SET_VIEW_TYPE:
      return {
        ...data,
        viewType: action.payload,
      };
    case TaskDispatchAction.UPDATE_FILTERS:
      return {
        ...data,
        filters: {
          ...data.filters,
          ...action.payload,
        },
      };
    default:
      return {
        ...data,
        ...action.payload,
      };
  }

}
