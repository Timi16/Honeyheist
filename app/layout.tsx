import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GameProvider } from "@/contexts/game-context"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Honey Heist - Crypto Heist Game",
  description: "The ultimate crypto heist experience",
    generator: 'Honey-Heist'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <GameProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </GameProvider>
      </body>
    </html>
  )
}
