import React from "react"
import SideBar from "./_components/SideBar"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="" >
      <aside className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <SideBar />
      </aside>
    {children}
    </main>
  )
}

export default layout
