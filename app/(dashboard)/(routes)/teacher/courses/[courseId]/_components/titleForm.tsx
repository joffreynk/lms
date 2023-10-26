'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('====================================');
    console.log(values);
    console.log('====================================');
  }
  return <div></div>;
};

export default TitleForm
