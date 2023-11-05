'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import * as z from 'zod'

type CategoryFormProps = {
  initialData?: {
    name: string;
    id: string;
  };
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
});


export function CreateCategory({ initialData }:  CategoryFormProps ) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || ''
    }
  });

  const isEditing = initialData?.id ? true : false;

  const router = useRouter()

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/categories`, values);
      toast.success(`Category ${isEditing ? "Updated" : "created"} successfully`);
      router.refresh()
    } catch (error) {
      toast.error('OOOps something went wrong')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {isEditing ? "Update" : "New"} Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {isEditing ? `Update ${initialData?.name} ` : "Add new"} Category
          </DialogTitle>
          <DialogDescription>
            {" "}
            {isEditing ? `Update ${initialData?.name} ` : "Create new"} course
            category
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Fontend....'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
