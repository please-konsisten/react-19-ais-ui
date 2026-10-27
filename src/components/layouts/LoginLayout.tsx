"use client"

import type React from "react"

interface LoginLayoutProps {
  children: React.ReactNode
}

export default function LoginLayout(props: LoginLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans text-[#2d3748]">
      <div className="w-full max-w-110 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] p-10">
        {props?.children}
      </div>
    </div>
  )
}
