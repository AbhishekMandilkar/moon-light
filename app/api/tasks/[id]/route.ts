import prisma from "@/services/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const id = parseInt(params.id);
    console.log("id", id);
  try {
    const task = await prisma.tasks.findFirst({
      where: {
        id: id,
      },
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
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
