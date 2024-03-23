"use client";
import { createContext } from "react";
import {
  ITask,
  ITasksDispatchContext,
  TaskDueBy,
  TaskViewType,
} from "../interfaces";
import { ITaskDashboardContext } from "../useTaskDashboard";
import { Table } from "@tanstack/react-table";
export const TasksContext = createContext<ITaskDashboardContext>({
  tableConfig: {} as Table<ITask>,
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
