import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import SideBar from "./SideBar"
import NavBarRoutes from "@/components/navBarRoutes";


const NavBar = () => {
  return (
    <nav className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0  bg-white">
          <SideBar />
        </SheetContent>
      </Sheet>
      <NavBarRoutes />
    </nav>
  );
}

export default NavBar