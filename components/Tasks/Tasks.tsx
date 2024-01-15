"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getTasks } from "@/services/TaskService";
import React, { useReducer } from "react";
import TodosHeader from "./components/TasksHeader";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";
import { ITasksContext, TaskDueBy, TaskViewType } from "./interfaces";
import TaskList from "./components/TaskList";

function Tasks() {
  const intialState: ITasksContext = {
    taskList: [],
    viewType: TaskViewType.LIST,
    filters: {
      dueBy: TaskDueBy.today,
    },
  };

  const [taskConfig, dispatch] = useReducer(tasksReducer, intialState);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-1 md:flex">
      <TasksContext.Provider value={taskConfig}>
        <TasksDispatchContext.Provider value={dispatch}>
          <TodosHeader />
          <TaskList />
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </div>
  );
}

export default Tasks;

function tasksReducer(
  data: ITasksContext,
  action: {
    type: string;
    payload: any;
  }
) {
  return {
    ...data,
    ...action.payload,
  };
}
