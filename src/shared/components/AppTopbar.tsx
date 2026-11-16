import { SidebarTrigger } from "@src/components/ui/sidebar"
import { Separator } from "@src/components/ui/separator"
import { Bell, SunMoon } from "lucide-react" // Contoh ikon aksesoris
import { Button } from "@src/components/ui/button"

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 w-full sticky top-0 z-50">
      
      {/* --- ISIAN SISI KIRI --- */}
      <div className="flex items-center gap-3">
        {/* Pemicu buka tutup sidebar */}
        <SidebarTrigger className="h-8 w-8 text-gray-500" />
        
        {/* Garis pembatas vertikal tipis */}
        <Separator orientation="vertical" className="h-4" />
        
        {/* Penanda halaman (Breadcrumb / Judul) */}
        <div className="flex items-center gap-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
          <span>Akademik ASP</span>
          <span className="text-slate-350">/</span>
          <span className="text-slate-800 font-bold">Dashboard</span>
        </div>
      </div>

      {/* --- ISIAN SISI KANAN --- */}
      <div className="flex items-center gap-2">
        {/* Tombol Notifikasi */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-550 relative">
          <Bell className="h-4 w-4" />
          {/* Dot Merah Indikator Notifikasi Baru */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Tombol Tema (Dark/Light) */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-550">
          <SunMoon className="h-4 w-4" />
        </Button>

        {/* Separator tambahan sebelum profil */}
        <Separator orientation="vertical" className="h-4 mx-1" />

        {/* Menu Profil Ringkas */}
        <button className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">Mahasiswa</span>
        </button>
      </div>

    </header>
  )
}
