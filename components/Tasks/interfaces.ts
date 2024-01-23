import { tasks } from "@prisma/client";

export type ITasksDispatchContext = React.Dispatch<{
  type: string;
  payload: any;
}> | null;

export interface ITasksConfig {
  viewType: TaskViewType;
  filters: {
    status?: string;
    priority?: string;
    dueBy: string;
  };
}

export enum TaskDueBy {
  today = "today",
  tomorrow = "tomorrow",
  thisWeek = "thisWeek",
  nextWeek = "nextWeek",
  thisMonth = "thisMonth",
  nextMonth = "nextMonth",
}

export enum TaskViewType {
  LIST = "list",
  BOARD = "grid",
}

export enum TaskStatus {
  none = "None",
  todo = "Todo",
  inprogress = "In Progress",
  done = "Done",
}

export enum TaskPriority {
  none = "None",
  low = "Low",
  medium = "Medium",
  high = "High",
}

export type ITask = tasks;
