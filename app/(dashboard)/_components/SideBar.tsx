import Image from 'next/image'
import React from 'react'

const SideBar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
     <div className='p-6 flex gap-2'>
        <Image
        height={40}
        width={40}
        alt='logo'
        src='/logo.svg'
        />
        <p className='text-violet-800 text-lg font-extrabold tracking-[4px]'>
          LMS
        </p>
     </div>
     <div className='flex flex-col w-full'>

     </div>
    </div>
  )
}

export default SideBar
