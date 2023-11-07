'use client'

import { FileUpload } from "@/components/fileUpload"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Attachment, Course } from "@prisma/client"
import axios from "axios"
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

type AttachmentFormProps = {
    initialData: Course & {attachments: Attachment[]},
}

const formSchema = z.object({
  url: z.string().min(3),
});

const AttachmentForm = ({ initialData }: AttachmentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.attachments[0]?.url || ""
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current);

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${initialData.id}/attachments`, values);
      toast.success('Course updated successfully')
      toggleEdit();
      router.refresh()
    } catch (error) {
      toast.error('OOOps something went wrong')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>
              <X className="h-6 w-6 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add file
            </>
          ) }
        </Button>
      </div>
      {isEditing ? (
        <FileUpload
          endpoint="courseAttachment"
          onChange={(url) => {
            if (url) {
              onSubmit({ url });
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          {initialData.attachments?.length ? (
            <div className="relative aspect-video h-60 ">
              Add anything your students might need to complete the course
            </div>
          ) : (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttachmentForm
