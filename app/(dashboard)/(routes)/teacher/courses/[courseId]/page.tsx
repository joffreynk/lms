import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prismaDB } from "@/lib/prismaDB";
import { LayoutDashboard } from "lucide-react";

const CourseDetails = async({params}: {params: {courseId: string}}) => {

    const {userId} = auth();

    if (!userId) return redirect('/');

    const course = await prismaDB.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if(!course) return redirect('/');

    const requiredFields = [
      course.title,
      course.description,
      course.imageUrl,
      course.price,
      course.categoryId,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-col-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <div className="bg-sky-700/20 p-1 rounded-full">
              <LayoutDashboard className="text-sky-700 text-3xl" />
            </div>
            <h2 className="text-xl">Customize your Course</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails
