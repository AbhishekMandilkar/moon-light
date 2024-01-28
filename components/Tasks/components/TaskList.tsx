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
function TaskList() {
  const { isLoading, tableConfig } = useContext(TasksContext);
  const taskTableColumns = getTaskTableColumns(isLoading);

  const renderTableBody = () => {
    if (tableConfig.getRowModel().rows?.length) {
      return tableConfig.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
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
            No results 123.
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <motion.div layout>
      <Table>
        <TableHeader>
          {tableConfig.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </motion.div>
  );
}

export default TaskList;
