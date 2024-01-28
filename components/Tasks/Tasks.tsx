"use client";
import { Skeleton } from "@/components/ui/skeleton";
// import { getTasks } from "@/services/TaskService";
import React, { useReducer } from "react";
import TodosHeader from "./components/TasksHeader";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";
import TaskList from "./components/TaskList";
import useTaskDashboard from "./useTaskDashboard";
import TaskHeader from "./components/TasksHeader";
import { TaskTablePagination } from "./components/TaskTablePagination";
import { motion } from "framer-motion";
function Tasks() {
  const taskDasboardConfig = useTaskDashboard();


  

  return (
    <motion.div layout className="h-full flex-1 flex-col space-y-8 p-1 md:flex">
      <TasksContext.Provider value={taskDasboardConfig}>
        <TasksDispatchContext.Provider value={taskDasboardConfig.dispatch}>
          <TaskHeader />
          <TaskList />
          <TaskTablePagination />
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </motion.div>
  );
}

export default Tasks;
