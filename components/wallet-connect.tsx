"use client"

import { useState } from "react"
import { Wallet, ChevronDown } from "lucide-react"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")

  const handleConnect = async () => {
    // Mock wallet connection
    setIsConnected(true)
    setAddress("0x1234...5678")
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress("")
  }

  if (isConnected) {
    return (
      <div className="relative group">
        <button
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-cyan-400/30 
                         rounded-lg px-4 py-2 text-white transition-colors"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="font-mono text-sm">{address}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <div
          className="absolute right-0 mt-2 w-48 bg-gray-800 border border-cyan-400/30 rounded-lg 
                      shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                      transition-all duration-200 z-50"
        >
          <button
            onClick={handleDisconnect}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg"
          >
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <button onClick={handleConnect} className="cyber-button flex items-center gap-2">
      <Wallet className="w-5 h-5" />
      Connect Wallet
    </button>
  )
}
