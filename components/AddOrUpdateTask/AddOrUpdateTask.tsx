"use client";
import React from "react";
import ModalView from "../ModalView/ModalView";
import { DrawerContent } from "../ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { DialogContent } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { ITask } from "../Tasks/interfaces";
import { getTaskById } from "@/api/TaskApi";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface IAddOrUpdateTaskProps {
  onClose: () => void;
  taskId?: string;
}

function AddOrUpdateTask(props: IAddOrUpdateTaskProps) {
  const { onClose } = props;
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const searchParams = useSearchParams();
  const taskId = searchParams.get("task");
  console.log("taskId", taskId);

  const { isLoading, data } = useQuery<ITask>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(parseInt(props?.taskId ?? taskId ?? "")),
    // enabled: !!props.taskId,
  });

  const renderMainContent = () => {
    if (isLoading) {
      return <Skeleton  />;
    }

    return (
      <div className="flex flex-col h-full">
        <span contentEditable className="text-2xl font-semibold">
          {data?.title}
        </span>
      </div>
    )
  }

  return (
      <div className="max-w-full h-full p-2">
        {renderMainContent()}
      </div>
  );
}

export default AddOrUpdateTask;
