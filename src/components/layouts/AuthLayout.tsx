"use client"
import {
  Card
} from "@src/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
}

const LAYOUT_STYLES = {
  screen: "min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans text-[#2d3748]",
}

export default function AuthLayout({ children}: AuthLayoutProps) {
  return (
    <>
      <main className={LAYOUT_STYLES.screen}>
        <Card>
          { children }
        </Card>
      </main>
      <footer>
        
      </footer>
    </>
  )
}
