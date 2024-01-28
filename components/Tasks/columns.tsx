"use client";

import { tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { DeleteIcon } from "lucide-react";
import { TaskTableColumnHeader } from "./components/TaskTableColumnHeader";
import {
  TaskPriorityMap,
  TaskStatusMap,
  getTaskPriorityClassNames,
  getTaskStatusClassNames,
} from "./TaskHelpers";
import { TaskPriority, TaskStatus } from "./interfaces";
import { Skeleton } from "../ui/skeleton";

export const getTaskTableColumns = (isLoading: boolean): ColumnDef<tasks>[] => [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //         <></>
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <TaskTableColumnHeader column={column} title="key" />
    ),
    cell: ({ row }) => {
      if (isLoading) return <Skeleton className="h-5 max-w-[25px]" />;

      return (
        <div className="flex items-center max-w-[25px] ">
          <span>{row.getValue("id")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TaskTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      if (isLoading) return <Skeleton className="h-4 w-[400px]" />;

      const isCompleted = row.getValue("status") === TaskStatus.done;
      return (
        <div className="flex space-x-2">
          <span
            className={`max-w-[500px] truncate font-medium ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TaskTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      if (isLoading) return <Skeleton className="h-4 w-[100px]"/>;

      const statusValue: TaskStatus = row.getValue("status");
      const status = TaskStatusMap[statusValue];
      return (
        <div
          className={` flex items-center ${getTaskStatusClassNames(
            statusValue
          )}`}
        >
          <>
            {status?.icon && (
              <status.icon
                className={`mr-2 h-4 w-4 text-muted-foreground ${getTaskStatusClassNames(
                  statusValue
                )}`}
              />
            )}
            <span>{status?.label}</span>
          </>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <TaskTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      if (isLoading) return <Skeleton className="h-4 w-[100px]"/>;

      const priorityValue: TaskPriority = row.getValue("priority");
      const priority = TaskPriorityMap[priorityValue];

      return (
        <div className="flex items-center">
          <div
            className={`mr-2 w-2 h-2 rounded-full bg-slate-400 ${getTaskPriorityClassNames(
              priorityValue
            )}`}
          />
          <span>{priority?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DeleteIcon />,
  // },
];
