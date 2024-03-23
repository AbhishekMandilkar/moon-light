"use client";
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function TaskCell({ children, isLoading }: { children: React.ReactNode, isLoading: boolean}) {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2 py-2">
          <Skeleton className="w-24 h-4" />
        </div>
      );
    }
  return <div className="cursor-pointer">{children}</div>;
}

export default TaskCell;