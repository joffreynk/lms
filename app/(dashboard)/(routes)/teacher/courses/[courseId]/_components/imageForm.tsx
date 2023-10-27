'use client'

import { FileUpload } from "@/components/fileUpload"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ImageIcon, Pencil, PlusCircle, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

type ImageFormProps = {
    initialData: {
        imageUrl?: string | null,
        id: string
    }
}

const formSchema = z.object({
  imageUrl: z.string().min(3, { message: "Image is required" }),
});

const ImageForm = ({ initialData }: ImageFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || ""
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current);

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${initialData.id}`, values);
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
          ) : initialData.imageUrl?.length ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <FileUpload
          endpoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      ) : (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          {initialData.imageUrl?.length ? (
            <div className="relative aspect-video h-60 ">
              <Image
                alt="course image"
                src={initialData.imageUrl}
                className="object-cover rounded-md"
                fill
              />
            </div>
          ) : (
            <ImageIcon className="w-32 h-32" />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageForm
