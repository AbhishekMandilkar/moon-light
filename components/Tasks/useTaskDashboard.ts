import { useMemo, useReducer, useState } from "react";
import { ITask, ITasksConfig, TaskDueBy, TaskViewType } from "./interfaces";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getTaskList } from "@/api/TaskApi";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { tasks } from "@prisma/client";
import { getTaskTableColumns } from "./columns";

export interface ITaskDashboardContext {
  taskConfig: ITasksConfig;
  dispatch: any;
  taskList: ITask[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  tableConfig: Table<ITask>;
}

export enum TaskDispatchAction {
  SET_VIEW_TYPE = "SET_VIEW_TYPE",
  UPDATE_FILTERS = "UPDATE_FILTERS",
}

const useTaskDashboard = (): ITaskDashboardContext => {
  const intialState: ITasksConfig = {
    viewType: TaskViewType.LIST,
    filters: {
      dueBy: TaskDueBy.today,
    },
  };

  const [taskConfig, dispatch] = useReducer(tasksReducer, intialState);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading, isError, error, isRefetching } = useQuery<{
    tasks: ITask[];
    totalCount: number;
  }>({
    queryFn: () =>
      getTaskList({
        filters: columnFilters,
        pagination: {
          pageIndex,
          pageSize,
        },
      }),
    queryKey: [columnFilters, pageIndex, pageSize],
  });

  const emptyArray = useMemo(() => [], []);

  const dummyArray = useMemo(() => {
    return new Array(pageSize).fill({
      id: "",
      title: "",
      description: "",
      status: "",
      priority: "",
      dueDate: "",
      createdAt: "",
      updatedAt: "",
    });
  }
  , [pageSize]);

  const getData = () => {
    if (isLoading || isRefetching) {
      return dummyArray;
    };
    return data?.tasks && data?.tasks?.length > 0 ? data?.tasks  : dummyArray;
  }

  const tableConfig = useReactTable({
    data: getData(),
    columns: getTaskTableColumns(isLoading || isRefetching),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      }
    },
    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    pageCount: Math.ceil((data?.totalCount || 0) / pageSize),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
  });

  return {
    tableConfig,
    taskConfig,
    dispatch,
    taskList: data?.tasks || [],
    isLoading: isLoading || isRefetching,
    isError,
    error,
  };
};

export default useTaskDashboard;

export function tasksReducer(
  data: ITasksConfig,
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case TaskDispatchAction.SET_VIEW_TYPE:
      return {
        ...data,
        viewType: action.payload,
      };
    case TaskDispatchAction.UPDATE_FILTERS:
      return {
        ...data,
        filters: {
          ...data.filters,
          ...action.payload,
        },
      };
    default:
      return {
        ...data,
        ...action.payload,
      };
  }
}
