import {
  Sidebar,
  useSidebar
} from "@src/components/ui/sidebar";
import { useLocation } from "react-router";
import { useAuth } from "@src/app/providers/AuthProvider";
import { navByRole } from "@src/config/navigation";
import { AppSidebarContent, AppSidebarFooter, AppSidebarHeader } from "./SidebarParts";
import { Menu } from "lucide-react";
import { Button } from "@src/components/ui/button";


export default function AppSidebar() {
  const { state, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const items = navByRole[user?.role ?? "student"] ?? navByRole.student;

  const handleMenuClick = () => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <>
      {isMobile && (
        <Button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-slate-900 text-white rounded-md z-50"
        >
          <Menu size={20} />
        </Button>
      )}

      <Sidebar collapsible="icon" className="bg-white border-r border-gray-200">
        <AppSidebarHeader state={state} toggleSidebar={toggleSidebar} />
        <AppSidebarContent items={items} location={location} state={state} handleMenuClick={handleMenuClick} />
        <AppSidebarFooter state={state} toggleSidebar={toggleSidebar} />
      </Sidebar>
    </>
  );
}
