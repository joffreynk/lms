import { prismaDB } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string, attachmentId: string } }
) => {
  try {
    const { userId } = auth();
    const { courseId, attachmentId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const owner = await prismaDB.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!owner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await prismaDB.attachment.delete({
        where: {
            id: attachmentId,
            courseId
        }
    })
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENT_ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
