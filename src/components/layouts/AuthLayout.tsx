"use client"

import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc] dark:bg-[#0f172a] transition-colors duration-200">
      <header className="w-full px-6 py-5 md:px-10">
        <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          i<span className="text-blue-600">G</span>RACIAS
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <Outlet />
      </main>

      <footer className="w-full px-6 py-5 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} iGRACIAS. Semua hak dilindungi.
      </footer>
    </div>
  )
}