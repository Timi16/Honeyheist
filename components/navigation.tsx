"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Trophy, Gamepad2 } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/lobby", label: "Lobby", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Honey Heist
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive ? "text-cyan-400 bg-cyan-400/10" : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Wallet Connect */}
          <WalletConnect />
        </div>
      </div>
    </nav>
  )
}
