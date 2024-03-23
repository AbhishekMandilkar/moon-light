"use client";

import { tasks } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import { DeleteIcon } from "lucide-react";
import { TaskTableColumnHeader } from "./components/TaskTableColumnHeader";
import {
  TaskPriorityMap,
  TaskStatusMap,
  getTaskPriorityClassNames,
  getTaskStatusClassNames,
} from "./TaskHelpers";
import { TaskPriority, TaskStatus } from "./interfaces";
import { Skeleton } from "../../ui/skeleton";
import TaskCell from "./components/TaskCell";

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
      return (
        <TaskCell isLoading={isLoading}>
          <div className="flex items-center w-[10px] ">
            <span>{row.getValue("id")}</span>
          </div>
        </TaskCell>
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
      return (
        <TaskCell isLoading={isLoading}>
          <div className="flex space-x-2">
            <span className={`truncate font-medium `}>
              {row.getValue("title")}
            </span>
          </div>
        </TaskCell>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TaskTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {

      const statusValue: TaskStatus = row.getValue("status");
      const status = TaskStatusMap[statusValue];

      return (
        <TaskCell isLoading={isLoading}>
          <div className="flex items-center">
            <Badge
              className={`${getTaskStatusClassNames(statusValue)} text-xs truncate`}
            >
              {status?.label}
            </Badge>
          </div>
        </TaskCell>
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
      const priorityValue: TaskPriority = row.getValue("priority");
      const priority = TaskPriorityMap[priorityValue];
      return (
        <TaskCell isLoading={isLoading}>
          <div className="flex items-center">
            <div
              className={`mr-2 w-2 h-2 rounded-full ${getTaskPriorityClassNames(
                priorityValue
              )}`}
            />
            <span>{priority?.label}</span>
          </div>
        </TaskCell>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

];
