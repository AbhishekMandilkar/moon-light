import {
  ArrowDownIcon,
  ArrowRight,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CircleIcon,
  LucideIcon,
  Timer,
  XCircle,
} from "lucide-react";
import { TaskPriority, TaskStatus } from "./interfaces";

export const TaskStatusMap: {
  [key in TaskStatus]: {
    label: string;
    icon: LucideIcon;
  };
} = {
  [TaskStatus.backlog]: {
    label: "Backlog",
    icon: Timer,
  },
  [TaskStatus.todo]: {
    label: "Todo",
    icon: CircleIcon,
  },
  [TaskStatus.inprogress]: {
    label: "In Progress",
    icon: ArrowRight,
  },
  [TaskStatus.done]: {
    label: "Done",
    icon: CheckCircleIcon,
  },
  [TaskStatus.canceled]: {
    label: "Canceled",
    icon: XCircle,
  },
};

export const TaskStatusList = [
  {
    label: "Backlog",
    icon: Timer,
    value: TaskStatus.backlog,
  },
  {
    label: "Todo",
    icon: CircleIcon,
    value: TaskStatus.todo,
  },
  {
    label: "In Progress",
    icon: ArrowRight,
    value: TaskStatus.inprogress,
  },
  {
    label: "Done",
    icon: CheckCircleIcon,
    value: TaskStatus.done,
  },
  {
    label: "Canceled",
    icon: XCircle,
    value: TaskStatus.canceled,
  },
];

export const TaskPriorityMap: {
  [key in TaskPriority]: {
    label: string;
    icon: LucideIcon;
  };
} = {
  [TaskPriority.low]: {
    label: "Low",
    icon: ArrowDownIcon,
  },
  [TaskPriority.medium]: {
    label: "Medium",
    icon: ArrowRightIcon,
  },
  [TaskPriority.high]: {
    label: "High",
    icon: ArrowUpIcon,
  },
};

export const TaskPriorityList = [
  {
    label: "Low",
    icon: ArrowDownIcon,
    value: TaskPriority.low,
  },
  {
    label: "Medium",
    icon: ArrowRightIcon,
    value: TaskPriority.medium,
  },
  {
    label: "High",
    icon: ArrowUpIcon,
    value: TaskPriority.high,
  },
];


export const getTaskStatusClassNames = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.backlog:
        return "text-gray-500 ";
        case TaskStatus.todo:
        return "text-gray-500";
        case TaskStatus.inprogress:
        return "text-blue-500";
        case TaskStatus.done:
        return "text-green-500";
        case TaskStatus.canceled:
        return "text-red-500";
    }
}

export const getTaskPriorityClassNames = (priority: TaskPriority) => {
    switch (priority) {
        case TaskPriority.low:
        return "bg-gray-500 ";
        case TaskPriority.medium:
        return "bg-blue-500";
        case TaskPriority.high:
        return "bg-red-500";
    }
}