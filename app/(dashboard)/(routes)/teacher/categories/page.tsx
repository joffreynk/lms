import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { CreateCategory } from './_components/createCategory';

const CoursesPage = () => {
  return <div className='p-6'>
     <CreateCategory />
  </div>;
}

export default CoursesPage
