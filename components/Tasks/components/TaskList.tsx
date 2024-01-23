"use client";
import React, { useContext, useEffect } from "react";
import { TasksContext } from "../context/TasksContext";

import supabase from "@/services/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { ITaskDashboardContext } from "../useTaskDashboard";

function TaskList() {
  const { taskConfig, dispatch, taskList, isError, isLoading } =
    useContext(TasksContext);

  return <div>{isLoading && <Skeleton className="h-20" />}</div>;
}

export default TaskList;
