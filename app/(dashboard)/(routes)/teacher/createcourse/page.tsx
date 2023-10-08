'use client'

import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const CreateCourse = () => {
  return (
    <div className="">
      Create Course
    </div>
  );
}

export default CreateCourse
