import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { prismaDB } from "@/lib/prismaDB";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
  File,
} from "lucide-react";
import IconBadge from "@/components/iconBadge";
import TitleForm from "./_components/titleForm";
import DescriptionForm from "./_components/descriptionForm";
import ImageForm from "./_components/imageForm";
import CategoryForm from "./_components/categoryForm";
import PriceForm from "./_components/priceForm";
import AttachmentForm from "./_components/attachmentForm";

const CourseDetails = async({params}: {params: {courseId: string}}) => {

    const {userId} = auth();

    if (!userId) return redirect('/');

    const course = await prismaDB.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        attachments: true,
      }
    });

    if(!course) return redirect('/');

    const categories = await prismaDB.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge Icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your Course</h2>
          </div>
          <TitleForm initialData={course} />
          <DescriptionForm initialData={course} />
          <ImageForm initialData={course} />
          <CategoryForm
            initialData={course}
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge Icon={ListChecks} />
              <h2 className="text-xl">course Chapters </h2>
            </div>
            <div>TODO: Chapters</div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge Icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your Course</h2>
            </div>
            <PriceForm initialData={course} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge Icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
            <AttachmentForm initialData={course} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails
