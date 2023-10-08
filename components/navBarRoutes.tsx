'use client'

import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const NavBarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const isTeacher = pathname?.startsWith('/teacher');
  const isPlayer = pathname?.startsWith('/chapter/')

  return (
    <div className='flex gap-x-2 ml-auto'>
      {
        isTeacher || isPlayer ? (
          <Button>
            <LogOut className='h-4 w-4 mr-2' />
            Exit
          </Button>
        ): (
          <Link href='/'>
            
          </Link>
        )
      }
        <UserButton />
    </div>
  )
}

export default NavBarRoutes