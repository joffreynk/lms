'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Pencil, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

type TitleFormProps = {
    initialData: {
        title: string,
        id: string
    }
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
});

const TitleForm = ({ initialData }: TitleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current);

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      axios.patch(`/api/courses/${initialData.id}`, values);
      toast.success('Course updated successfully')
      router.refresh()
    } catch (error) {
      toast.error('OOOps something went wrong')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>
              <X className="h-6 w-6 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {isEditing?(
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
                control={form.control}
                name="title"
                render={({field})=>(
                  <FormItem>
                    <FormControl>
                      <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Advanced CSS Courses'"
                      {...field}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <div className="flex items-center gap-x-2">
              <Button
              disabled={isSubmitting || isValid}
              type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      ): <p className="`text-sm mt-2">{initialData.title}</p>}
    </div>
  );
};

export default TitleForm
