import { LayoutDashboard, FileText, UserCheck, Calendar, AppWindow, ChevronDown, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@src/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { title: "Nilai", icon: FileText, to: "/score" },
  { title: "Presensi", icon: UserCheck, to: "/absence" },
  { title: "Jadwal Mahasiswa", icon: Calendar, to: "/schedule" },
  { title: "Registrasi", icon: AppWindow, to: "/registration" },
];

export default function AppSidebar() {
  const { state, openMobile, setOpenMobile, isMobile, toggleSidebar } = useSidebar();
  const location = useLocation();

  // PERBAIKAN: Fungsi penutup drawer mobile saat menu diklik harus diset ke FALSE
  const handleMenuClick = () => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <Sidebar collapsible="icon" className="bg-white border-r border-gray-200">
        {isMobile ? (
          <>
          test
            <SidebarHeader className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between font-bold text-xl tracking-tight text-gray-800">
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 font-extrabold">i</span>
                  <span className="text-red-600 font-black">G</span>
                  <span className="text-gray-900 font-extrabold">RACIAS</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8 text-gray-500 hover:bg-gray-150"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>

              {/* Selector Grup Pengguna Mobile */}
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
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            isActive={isActive}
                            className={`w-full transition-colors ${isActive
                                ? "bg-red-50 text-red-650 font-semibold"
                                : "text-gray-650 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                          >
                            <Link to={item.to} onClick={handleMenuClick} className="flex items-center gap-3 w-full">
                              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-red-600" : "text-gray-500"}`} />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
              iGracias Mobile v1.0
            </SidebarFooter>
          </>
        ) : (
          <>
            <AppSidebarHeader state={state} toggleSidebar={toggleSidebar} />
            <AppSidebarContent location={location} state={state} handleMenuClick={handleMenuClick} />
            <AppSidebarFooter state={state} toggleSidebar={toggleSidebar} />
          </>
        )}
      </Sidebar>
    </>
  );
}

function AppSidebarHeader(props: unknown) {
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

function AppSidebarContent(props: unknown) {
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

function AppSidebarFooter(props: unknown) {
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