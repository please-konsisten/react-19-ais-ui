"use client"
import { ThemeProvider } from "@src/components/theme-provider"

interface AuthLayoutProps {
  children: React.ReactNode
}

const LAYOUT_STYLES = {
  screen: "min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans text-[#2d3748]",
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider>
      <main className={LAYOUT_STYLES.screen}>
        {children}
      </main>
      <footer>

      </footer>
    </ThemeProvider>
  )
}
