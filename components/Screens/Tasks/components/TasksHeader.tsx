import { motion } from "framer-motion";
import React, { useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import { ITaskDashboardContext } from "../useTaskDashboard";
import { Input } from "@/components/ui/input";
import { TaskFilterItem } from "./TaskFilterItem";
import { TaskPriorityList, TaskStatusList } from "../TaskHelpers";
import { Button } from "@/components/ui/button";
import { CrossIcon, PlusIcon, XIcon } from "lucide-react";
import { TaskTablePagination } from "./TaskTablePagination";

function TaskHeader() {
  const { taskConfig, dispatch, taskList, isError, isLoading, tableConfig, handleToggleAddTask, showAddTask } =
    useContext(TasksContext);
  const isFiltered = tableConfig.getState().columnFilters.length > 0;
  const [value, setValue] = React.useState(
    (tableConfig.getColumn("title")?.getFilterValue() as string) ?? ""
  );


  React.useEffect(() => {
    const timeout = setTimeout(() => {
      tableConfig.getColumn("title")?.setFilterValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

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
      className="flex items-center justify-between p-2 shadow-lg rounded-full m-2"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search tasks..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-[150px] lg:w-[250px] rounded-full "
          />
          {tableConfig.getColumn("status") && (
            <TaskFilterItem
              column={tableConfig.getColumn("status")}
              title="Status"
              options={TaskStatusList}
            />
          )}
          {tableConfig.getColumn("priority") && (
            <TaskFilterItem
              column={tableConfig.getColumn("priority")}
              title="Priority"
              options={TaskPriorityList}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => tableConfig.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <CrossIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button onClick={() => handleToggleAddTask(!showAddTask)} className="rounded-full">
          {showAddTask ? (
            <XIcon className="h-4 w-4" />
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              <span className="hidden lg:block">Add Task</span>
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

export default TaskHeader;
