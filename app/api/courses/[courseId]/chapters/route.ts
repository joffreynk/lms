import { prismaDB } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";

export const  POST = async (req: Request, {params}: {params: {courseId: string}}) => {
    try {
      const {userId} = auth();

      const {title} = await req.json();

      if (!userId) return new NextResponse('UnAuthorized', {status: 401});

      const owner = await prismaDB.course.findUnique({
        where: {id: params.courseId, userId},
      })

      if (!owner) return new NextResponse("UnAuthorized", { status: 401 });

      const lastChapter = await prismaDB.chapter.findFirst({
        where: {courseId: params.courseId},
        orderBy: {position: 'desc'},
      });

      const newPosition = lastChapter ? lastChapter.position +1 : 1

      const newChapter = await prismaDB.chapter.create({
        data: {
          title,
          courseId: params.courseId,
          position: newPosition,
        }
      })

      return NextResponse.json(newChapter)

    } catch (error) {
      console.log("[Chapters] Error", error);
      return new NextResponse("Internal server error", {status: 500});
    }
}