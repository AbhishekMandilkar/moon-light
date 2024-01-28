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
  todo = "todo",
  inprogress = "in progress",
  done = "done",
  backlog = "backlog",
  canceled = "canceled"
}

export enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}

export type ITask = tasks;
