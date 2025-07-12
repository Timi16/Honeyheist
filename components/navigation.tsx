"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Home, Users, Trophy, Gamepad2, Menu, X } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/lobby", label: "Lobby", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-cyan-400/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Honey Heist
            </span>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Desktop Wallet Connect */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border-t border-cyan-400/30">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors
                      ${
                        isActive 
                          ? "text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400" 
                          : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              
              {/* Mobile Wallet Connect */}
              <div className="px-3 py-3 border-t border-gray-700 mt-4">
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}