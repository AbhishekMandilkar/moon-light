"use client";
import { createContext } from "react";
import { ITasksDispatchContext, TaskDueBy, TaskViewType } from "../interfaces";
import { ITaskDashboardContext } from "../useTaskDashboard";

export const TasksContext = createContext<ITaskDashboardContext>({
  taskConfig: {
    viewType: TaskViewType.LIST,
    filters: {
      dueBy: TaskDueBy.today,
    },
  },
  dispatch: null,
  taskList: [],
  isLoading: false,
  isError: false,
  error: null,
});
export const TasksDispatchContext = createContext<ITasksDispatchContext>(null);
