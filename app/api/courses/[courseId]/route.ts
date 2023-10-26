import { prismaDB } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 404 });

    const  values  = await req.json();

    const course = await prismaDB.course.update({
      where: {
        id: params.courseId,
        userId
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(course);
  } catch (error: any) {
    console.log("[COURSE_ID]: " + error.message);
    return new NextResponse("Internal server Error", { status:401});
  }
}