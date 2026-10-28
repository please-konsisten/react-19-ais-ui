import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  UserCheck, 
  Calendar, 
  AppWindow,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// 1. Konfigurasi Route MVP
const MVP_ROUTES = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'nilai', name: 'Nilai', icon: FileText },
  { id: 'presensi', name: 'Presensi', icon: UserCheck },
  { id: 'jadwal', name: 'Jadwal Mahasiswa', icon: Calendar },
  { id: 'registrasi', name: 'Registrasi', icon: AppWindow },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi helper untuk merender konten placeholder berdasarkan route aktif
  const renderContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Konten Dashboard Utama</div>;
      case 'nilai':
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Halaman Nilai Akademik & KHS</div>;
      case 'presensi':
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Halaman Detail Presensi Kuliah</div>;
      case 'jadwal':
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Kalender & Jadwal Kuliah Mingguan</div>;
      case 'registrasi':
        return <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">Formulir Registrasi & PRS</div>;
      default:
        return <div className="p-6">Halaman tidak ditemukan.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans flex flex-col md:flex-row">
      
      {/* --- TOMBOL MOBILE HAMBURGER --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-red-600 tracking-wider">iGRACIAS</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGASI --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo & Identitas Institusi */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-black text-red-600 tracking-tight flex items-center gap-1">
              i<span className="text-gray-900">GRACIAS</span>
            </h1>
            <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs text-gray-500 font-medium">Grup Pengguna</p>
              <p className="text-sm font-bold text-red-700">Mahasiswa</p>
            </div>
          </div>

          {/* List Menu MVP (Dashboard - Registrasi) */}
          <nav className="p-4 space-y-1">
            {MVP_ROUTES.map((route) => {
              const Icon = route.icon;
              const isActive = currentRoute === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => {
                    setCurrentRoute(route.id);
                    setIsSidebarOpen(false); // Tutup sidebar otomatis di mobile setelah klik
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-red-50 text-red-600 shadow-sm shadow-red-100/50' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-red-600' : 'text-gray-400'} />
                  {route.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Menu Bottom / Footer Sidebar */}
        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-xl">
            <Settings size={18} />
            Pengaturan
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* --- OVERLAY UNTUK MOBILE --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- AREA KONTEN UTAMA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Selamat Datang, Karla!</h2>
            <p className="text-xs text-gray-500 mt-0.5">Senin, 27 Juni 2022</p>
          </div>
          
          {/* Fitur Global Search & Aksi */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="relative w-64 max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search size={16} />
              </span>
              <input 
                type="text" 
                placeholder="Cari Sesuatu..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
            </div>
            
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Workspace Konten */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Breadcrumb Info Ringkas */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <span>Akademik</span>
            <span>/</span>
            <span className="text-red-600">{currentRoute}</span>
          </div>

          {/* Pemanggilan Konten Aktif */}
          {renderContent()}
        </main>
      </div>

    </div>
  );
}
