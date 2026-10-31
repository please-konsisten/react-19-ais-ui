import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  Calendar, 
  AppWindow,
  ChevronDown
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@src/components/ui/sidebar";
import { Link } from "react-router";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to:"/"},
  { title: "Nilai", icon: FileText, to:"/score" },
  { title: "Presensi", icon: UserCheck, to:"/absence" },
  { title: "Jadwal Mahasiswa", icon: Calendar, to:"/schedule" },
  { title: "Registrasi", icon: AppWindow, to:"/registration" },
];

export default function AppSidebar() {
  const [isActive, setIsActive] = useState(true)
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="flex flex-col">
        <div className="flex items-center font-bold text-xl tracking-tight text-gray-800">
          <span className="text-gray-900 font-extrabold">i</span>
          <span className="text-red-600 font-black">G</span>
          <span className="text-gray-900 font-extrabold">RACIAS</span>
        </div>
        <div className="flex items-center bg-gray-50">
          <div className="rounded-md bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] text-gray-400 font-medium leading-none">Grup Pengguna</span>
            <span className="text-xs font-semibold text-gray-700 truncate">Mahasiswa</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    className={`w-full flex items-center rounded-lg text-sm font-medium transition-colors
                      ${item.isActive 
                        ? "bg-red-50 text-red-600 hover:bg-red-50 hover:text-red-600" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <Link to={item.to} className="flex items-center w-full">
                      <item.icon className={`w-4 h-4 ${item.isActive ? "text-red-600" : "text-gray-400"}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
