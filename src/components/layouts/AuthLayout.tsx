"use client"

import type React from "react"
import { cn } from "cn"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

const LAYOUT_STYLES = {
  screen: "min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans text-[#2d3748]",
  card: cn(
    "w-full bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)]",
    "p-6 max-w-full",
    "sm:p-10 sm:max-w-[440px]"
  )
}

export default function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <>
      <main className={LAYOUT_STYLES.screen}>
        <div className={cn(LAYOUT_STYLES.card, className)}>
          {children}
        </div>
      </main>
    </>
  )
}
