'use client'

import { FileUpload } from "@/components/fileUpload"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Attachment, Course } from "@prisma/client"
import axios from "axios"
import { File, Loader2, PlusCircle, X } from "lucide-react";
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
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const onDelete = async (id: string) => {
    try {
      setDeleteId(id);
      await axios.post(`/api/courses/${initialData.id}/attachments/${id}`);
      toast.success('Attachment deleted')
      router.refresh()
    } catch (error) {
      toast.error("Something went  wrong")
    } finally {
      setDeleteId(null);
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
          )}
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
      ) : initialData.attachments?.length ? (
        <div className="flex flex-col gap-3">
          {initialData.attachments.map((attach) => (
            <div
              key={attach.id}
              className="flex items-center p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
            >
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-xs line-clamp-1">
                {attach.url.split("/").pop()}
              </p>
              {deleteId === attach.id ? (
                <div>
                  <Loader2 className="h4 pl-3 w-4 animate-spin" />
                </div>
              ) : (
                <button
                onClick={() =>onDelete(attach.id)}
                 className="pl-3 hover:opacity-75 transition">
                  <X className="h4 w-4" />
                </button>
              )}
            </div>
          ))}
          <div className="relative aspect-video h-60 ">
            Add anything your students might need to complete the course
          </div>
        </div>
      ) : (
        <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
      )}
    </div>
  );
};

export default AttachmentForm
