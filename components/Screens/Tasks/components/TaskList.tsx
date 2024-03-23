"use client";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { getTaskTableColumns } from "../columns";
import { motion } from "framer-motion";
import { TaskTablePagination } from "./TaskTablePagination";
import { usePathname, useRouter } from "next/navigation";
function TaskList() {
  const { isLoading, tableConfig } = useContext(TasksContext);
  const taskTableColumns = getTaskTableColumns(isLoading);
  const router = useRouter();
  const pathname = usePathname()
  const onRowClick = (taskId: number) => {
    router.push(pathname + '?' + new URLSearchParams({ task: taskId.toString() }).toString())
  }

  const renderTableBody = () => {
    if (tableConfig.getRowModel().rows?.length) {
      return tableConfig.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && "selected"}
          className="border-0 my-0"
          onClick={() => onRowClick(row?.original?.id)}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} className="p-3">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell
            colSpan={taskTableColumns.length}
            className="h-24 text-center"
          >
            No results.
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <motion.div className="max-h-full overflow-auto scrollbar">
      <Table>
        <TableHeader>
          {tableConfig.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="" >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="max-h-full">{renderTableBody()}</TableBody>
      </Table>
    </motion.div>
  );
}

export default TaskList;
