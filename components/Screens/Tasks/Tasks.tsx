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
import { AnimatePresence, motion } from "framer-motion";
import AddOrUpdateTask from "../../AddOrUpdateTask/AddOrUpdateTask";
import {  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup, } from "../../ui/resizable";


function Tasks() {
  const taskDasboardConfig = useTaskDashboard();

  return (
    <motion.div layout className="h-full flex-1 flex-col md:flex">
      <TasksContext.Provider value={taskDasboardConfig}>
        <TasksDispatchContext.Provider value={taskDasboardConfig.dispatch}>
          <div className="flex m-w-screen h-full">
            <div className="flex flex-col flex-1 mr-2 min-w-1/2 overflow-y-auto">
              <TaskHeader />
              <TaskList />
              <TaskTablePagination />
            </div>
              {taskDasboardConfig.showAddTask && (
                <motion.div
                  layout
                  className="max-w-1/2 w-full bg-background p-4 flex-1"
                >
                  <AddOrUpdateTask
                    onClose={() =>
                      taskDasboardConfig.handleToggleAddTask(false)
                    }
                  />
                </motion.div>
              )}
          </div>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </motion.div>
  );
}

export default Tasks;
