
import { prismaDB } from '@/lib/prismaDB';
import { CreateCategory } from './_components/createCategory';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const CoursesPage = async() => {
  const {userId} = auth();
  if (!userId) return redirect('/')
  const categories = await prismaDB.category.findMany({
    where: {
      userId
    }
  }) 
  
  return (
    <div className="p-6">
      <CreateCategory />

      <div className="py-8 flex flex-col gap-3 w-fit">
        {categories.map((c) => (
          <div className='flex items-center gap-5'>
            <p>{c.name}</p>
            <CreateCategory key={c.id} initialData={c} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage
