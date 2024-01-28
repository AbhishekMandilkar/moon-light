export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PrismaClient, tasks } from "@prisma/client";
import { ITask, TaskStatus } from "@/components/Tasks/interfaces";
import {
  Column,
  ColumnFiltersState,
  PaginationState,
  ResolvedColumnFilter,
} from "@tanstack/react-table";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

export async function POST(request: Request) {
  const body: {
    filters: ColumnFiltersState;
    pagination: PaginationState;
  } = await request.json();

  const { filters, pagination } = body;

  const where = filters.reduce((acc, filter) => {
    const { id, value } = filter as {
      id: keyof tasks;
      value: ResolvedColumnFilter<ITask>;
    };
    if (value) {
      switch (id) {
        case "status":
          acc.status = value
            ? {
                in: value,
              }
            : undefined;
          break;
        case "priority":
          acc.priority = value
            ? {
                in: value,
              }
            : undefined;
          break;
        case "title":
          acc.title = value
            ? {
                contains: value,
              }
            : undefined;
          break;
        default:
          break;
      }
    }
    return acc;
  }, {} as any);
  console.log(where);
  try {

   const data = await prisma.$transaction([
       prisma.tasks.findMany({
        where: where,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          created_at: true,
          updated_at: true,
          uuid: true,
          label: true,
        },
        skip: pagination.pageIndex * pagination.pageSize,
        take: pagination.pageSize,
      }),
      prisma.tasks.count({
        where: where,
      }),
    ])

    // const data = await prisma.tasks.findMany({
    //   where: where,
    //   select: {
    //     id: true,
    //     title: true,
    //     description: true,
    //     status: true,
    //     priority: true,
    //     created_at: true,
    //     updated_at: true,
    //     uuid: true,
    //     label: true,
    //   },
    //   skip: pagination.pageIndex * pagination.pageSize,
    //   take: pagination.pageSize,
    // });
    return NextResponse.json({
      tasks: data[0],
      totalCount: data[1],
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
  
}
