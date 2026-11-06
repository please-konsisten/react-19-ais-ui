import { useState } from "react";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../features/AppSidebar";
import { Outlet } from "react-router";
import AppHeader from "../features/AppHeader";
import "@src/index.css"

export default function AppLayout(){
  const [open, setOpen] = useState(true)
  return(
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <div id="main-content">
        <AppHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}