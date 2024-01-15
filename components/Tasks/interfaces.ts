export type ITasksDispatchContext = React.Dispatch<{
  type: string;
  payload: any;
}> | null;


export interface ITasksContext {
  taskList: any[];
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
  inprogress = "inprogress",
  done = "done",
}

export enum TaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
}



export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}