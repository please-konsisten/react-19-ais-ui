import {
  Sidebar,
  useSidebar
} from "@src/components/ui/sidebar";
import { useLocation } from "react-router";
import { AppSidebarContent, AppSidebarFooter, AppSidebarHeader } from "../parts/SidebarParts";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";


export default function AppSidebar() {
  const { state, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  const location = useLocation();

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
        <AppSidebarContent location={location} state={state} handleMenuClick={handleMenuClick} />
        <AppSidebarFooter state={state} toggleSidebar={toggleSidebar} />
      </Sidebar>
    </>
  );
}
