'use client'

import { BarChart, Compass, Layout, List, Library } from "lucide-react";

import SideBarItem from "./SideBarItem";
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: Library,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: List,
    label: "Categories",
    href: "/teacher/categories",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SideRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher')
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col gap-5 w-full">
      {
        routes.map((route) => (<SideBarItem key={route.href} icon={route.icon} label={route.label} href={route.href}  />) )
      }
    </div>
  )
}

export default SideRoutes