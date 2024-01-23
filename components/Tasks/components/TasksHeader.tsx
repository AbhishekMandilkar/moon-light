import { motion } from "framer-motion";
import React, { useContext } from "react";
import { ITask } from "../interfaces";
import { Badge } from "@/components/ui/badge";
import { TasksContext } from "../context/TasksContext";
import { AuthContext } from "@/contexts/AuthContext";
import TaskFilters from "./TaskFilters";
import { ITaskDashboardContext } from "../useTaskDashboard";

interface ITaskHeaderProps {
  taskDashboardConfig: ITaskDashboardContext;
}

function TaskHeader() {
  const { taskConfig, dispatch, taskList, isError, isLoading } =
    useContext(TasksContext);

  const contextData = useContext(AuthContext);

  const {
    authData: { name, uuid },
  } = contextData;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex items-center justify-between border-b-2 pb-2"
    >
      <div className="flex flex-col">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Hi {name}!
        </h2>

        <span className="flex">
          <p className="text-muted-foreground mr-2">
            Here&apos;s a list of your tasks for today.
          </p>
          {!(isLoading || isError) && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Badge variant="outline" className="self-center">
                {taskList.length}
              </Badge>
            </motion.div>
          )}
        </span>
      </div>
      <div className="flex space-x-2">
        <TaskFilters />
      </div>
    </motion.div>
  );
}

export default TaskHeader;
