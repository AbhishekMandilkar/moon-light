import { prisma } from "@/services/db";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const response = await prisma.users.create({
      data: {
        external_id: data.$id,
        name: data.name,
        email: data.email,
        created_at: data.$createdAt,
        updated_at: data.$updatedAt,
        active: data.status,
      },
    });
    return NextResponse.json(
      { message: response, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  const data = await request.nextUrl.searchParams.get("id");
  if (!data)
    return NextResponse.json(
      { message: "No data", success: false },
      { status: 500 }
    );
  try {
    const response = await prisma.users.findUnique({
      where: {
        external_id: data as string,
      },
      select: {
        id: true,
        external_id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        active: true,
        uuid: true,
      }
    });
    if(!response) {
      return NextResponse.json(
        { message: "No data", success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}
