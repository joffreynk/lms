'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chapter, Course } from "@prisma/client"
import axios from "axios"
import { Pencil, PlusCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

type ChaptersFormProps = {
    initialData: Course & {chapters: Chapter[]}
}

const formSchema = z.object({
  title: z.string().min(3),
});

const ChaptersForm = ({ initialData }: ChaptersFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:  ""
    }
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter()

  const toggleCreating = () => setIsCreating((current) => !current);

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${initialData.id}/chapters`, values);
      toast.success('chapter created successfully')
      toggleCreating();
      router.refresh()
    } catch (error) {
      toast.error('OOOps something went wrong')
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapter
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>
              <X className="h-6 w-6 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Introduction to HTML'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting || !isValid} type="submit">
              Create chapter
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <div
            className={cn(
              "text-sm mt-2",
              initialData.chapters.length && "text-slate-500 italic"
            )}
          >
            {initialData.chapters.length && "No chapter"}
            {/* TODO: Add a list of chapters */}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
};

export default ChaptersForm
