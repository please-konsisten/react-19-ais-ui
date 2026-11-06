"use client"
import { cn } from "cn"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className={cn("min-h-screen w-full bg-[#f7fafc] dark:bg-[#0f172a] flex flex-col items-center justify-center p-6 transition-colors duration-200")}>
        {children}
      </main>
      <footer>

      </footer>
    </>
  )
}
