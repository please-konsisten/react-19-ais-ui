"use client"

import { AppWindow, Calendar, ChevronDown, FileText, LayoutDashboard, Menu, UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Link } from "react-router";


export function AppSidebarHeader(props: unknown) {
  return (
    <SidebarHeader className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between font-bold text-xl tracking-tight text-gray-800">
        {/* LOGO: Mengecil hanya pada Desktop jika di-collapsed */}
        {props.state === "collapsed" ? (
          <div className="flex items-center justify-center w-full">
            <span className="text-red-600 font-black text-2xl">G</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-gray-900 font-extrabold">i</span>
            <span className="text-red-600 font-black">G</span>
            <span className="text-gray-900 font-extrabold">RACIAS</span>
          </div>
        )}

        {/* Tombol toggle desktop (Hanya muncul jika sidebar sedang expanded) */}
        {props.state === "expanded" && (
          <Button variant="ghost" size="icon" onClick={props.toggleSidebar} className="h-8 w-8 text-gray-500 hover:bg-gray-150">
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Selector Grup Pengguna (Hanya tampil jika sidebar terbuka) */}
      {props.state === "expanded" && (
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
          <div className="w-8 h-8 rounded-md bg-red-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[10px] text-gray-400 font-medium leading-none mb-1">Grup Pengguna</span>
            <span className="text-xs font-semibold text-gray-700 truncate">Mahasiswa</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        </div>
      )}
    </SidebarHeader>
  )
}

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { title: "Nilai", icon: FileText, to: "/score" },
  { title: "Presensi", icon: UserCheck, to: "/absence" },
  { title: "Jadwal Mahasiswa", icon: Calendar, to: "/schedule" },
  { title: "Registrasi", icon: AppWindow, to: "/registration" },
];

export function AppSidebarContent(props: unknown) {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = props.location.pathname === item.to;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={isActive} tooltip={item.title} className={`w-full transition-colors ${isActive ? "bg-red-50 text-red-650 font-semibold dynamic-active" : "text-gray-650 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <Link to={item.to} onClick={props.handleMenuClick} className="flex items-center gap-3 w-full">
                      <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-red-600" : "text-gray-500"}`} />
                      {/* Teks Menu: Menyembunyikan teks jika collapsed */}
                      {props.state === "expanded" && (
                        <span>{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export function AppSidebarFooter(props: unknown) {
  return (
    <SidebarFooter className="p-4 border-t border-gray-100">
      {props.state === "collapsed" && (
        <Button variant="ghost" size="icon" onClick={props.toggleSidebar} className="h-8 w-8 mx-auto text-gray-500 hover:bg-gray-150 flex items-center justify-center">
          <Menu className="h-4 w-4" />
        </Button>
      )}
    </SidebarFooter>
  )
}