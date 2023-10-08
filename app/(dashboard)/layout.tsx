import NavBar from "./_components/NavBar"
import SideBar from "./_components/SideBar"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full" >
      <header className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </header>
      <aside className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <SideBar />
      </aside>
      <main className="md:pl-56 h-full pt-[80px]">
        {children}
      </main>
    </div>
  )
}

export default layout
