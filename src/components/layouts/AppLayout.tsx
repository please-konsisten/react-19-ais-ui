import React, { useState } from "react";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../features/AppSidebar";

interface AppLayoutProps extends React.PropsWithChildren {
}

export default function AppLayout({
  children
}: AppLayoutProps){
  const [open, setOpen] = useState(true)
  return(
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main>
        { children }
      </main>
    </SidebarProvider>
  )
}