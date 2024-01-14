export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await prisma.todos.create({
      data:{
        title: 'hello world',
        status: "TODO",
        priority: "LOW",
      }
    });
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 401 });
    console.log(err);
  }
}
