export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { TaskStatus } from "@/components/Tasks/interfaces";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

export async function GET(request: Request) {
  try {
    const data = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        created_at: true,
        updated_at: true,
        uuid: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: JSON.stringify(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const {filters} = body;
  try {
    const where:any = {};
    if(filters?.status && filters.status !== TaskStatus.none) {
      where["status"] = filters.status;
    }
    if(filters?.priority && filters.priority !== TaskStatus.none) {
      where["priority"] = filters.priority;
    }
    const data = await prisma.tasks.findMany({
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
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: JSON.stringify(err) }, { status: 500 });
  }
}
