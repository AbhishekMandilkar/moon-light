export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

export async function GET(request: Request) {
  try {
    const data = await prisma.tasks.create({
      data: {
        title: 'New Task',
        description: 'New Task Description',
        status: 'todo',
        priority: 'low',
        createdAt: new Date(),
        updatedAt: new Date(),
        assigneeId: '1',
      }
    });
    return NextResponse.json({ todos: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: JSON.stringify(err) },{ status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await prisma.tasks.create({
      data: {
        title: 'New Task',
        description: 'New Task Description',
        status: 'todo',
        priority: 'low',
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    });
    return NextResponse.json({ todo: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: JSON.stringify(err) }, { status: 500 });
  }
}