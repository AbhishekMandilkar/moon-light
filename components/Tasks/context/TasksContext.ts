"use client";
import { createContext } from 'react';
import { ITasksContext, ITasksDispatchContext } from '../interfaces';

export const TasksContext = createContext<ITasksContext | null>(null);
export const TasksDispatchContext = createContext<ITasksDispatchContext>(null);
