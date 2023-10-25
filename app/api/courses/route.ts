import { prismaDB } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const {title} = await req.json();

  const {userId} =  auth()
  if (!userId) return new NextResponse('Unauthorized', {status: 401});
  if (!title) return new NextResponse("Course title is required", { status: 401 });

  try {
    const response = await prismaDB.course.create({
      data: {title, userId},
    })
    return NextResponse.json(response, {status: 200});
  } catch (error) {
    return new NextResponse("OOpsSomething went wrong", {status:404});
  }
}