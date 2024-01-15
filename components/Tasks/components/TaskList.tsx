"use client";
import React, { useContext } from 'react'
import { TasksContext } from '../context/TasksContext'
import { getTasks } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';

function TaskList() {
  const taskConfig = useContext(TasksContext);
  const {data} = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  console.log(data);
  return <div>TaskList</div>;
}

export default TaskList