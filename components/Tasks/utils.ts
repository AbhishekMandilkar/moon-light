import { TaskPriority, TaskStatus } from "./interfaces";

enum enableTaskFilterFields {
  status = "status",
  priority = "priority",
}

export const getTaskFilterFields = () => {
  const fields: {
    label: string;
    key: enableTaskFilterFields;
    options: TaskPriority[] | TaskStatus[] | [];
  }[] = [];

  fields.push({
    label: "Status",
    key: enableTaskFilterFields.status,
    options: Object.values(TaskStatus),
  });

  fields.push({
    label: "Priority",
    key: enableTaskFilterFields.priority,
    options: Object.values(TaskPriority).map((priority) => priority),
  });

  return fields;
};
