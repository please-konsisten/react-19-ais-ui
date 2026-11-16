import { useState } from "react";
import { SidebarProvider } from "@src/components/ui/sidebar";
import AppSidebar from "@src/shared/components/AppSidebar";
import { Outlet } from "react-router";
import AppHeader from "@src/shared/components/AppHeader";
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