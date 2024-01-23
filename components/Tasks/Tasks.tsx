"use client";
import { Skeleton } from "@/components/ui/skeleton";
// import { getTasks } from "@/services/TaskService";
import React, { useReducer } from "react";
import TodosHeader from "./components/TasksHeader";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";
import TaskList from "./components/TaskList";
import useTaskDashboard from "./useTaskDashboard";

function Tasks() {
  const taskDasboardConfig = useTaskDashboard();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-1 md:flex">
      <TasksContext.Provider value={taskDasboardConfig}>
        <TasksDispatchContext.Provider value={taskDasboardConfig.dispatch}>
          <TodosHeader />
          <TaskList />
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}

export default Tasks;
