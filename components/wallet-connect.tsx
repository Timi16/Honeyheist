// WalletConnect.tsx - Fixed version with proper wallet selection
"use client"

import { useState, useEffect, useMemo } from "react"
import { Wallet, ChevronDown } from "lucide-react"
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, useWalletModal } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { clusterApiUrl } from '@solana/web3.js'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

// Import your service 
import { connectWallet } from '@/services/wallet'

// WalletProvider Wrapper Component
export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  // You can use 'devnet', 'testnet', or 'mainnet-beta'
  const network = 'devnet'
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ].filter((adapter, index, array) => 
      array.findIndex(a => a.name === adapter.name) === index
    ),
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

// Internal WalletConnect component that uses the wallet context
function WalletConnectInternal() {
  const { wallet, select, connect, disconnect, publicKey, connected, connecting } = useWallet()
  const { setVisible } = useWalletModal()
  const [address, setAddress] = useState("")

  // Update address when publicKey changes
  useEffect(() => {
    if (connected && publicKey) {
      const walletAddress = publicKey.toBase58()
      setAddress(walletAddress)
    } else {
      setAddress("")
    }
  }, [connected, publicKey])

  const handleConnect = async () => {
    try {
      // If no wallet is selected, show the wallet modal
      if (!wallet) {
        setVisible(true)
        return
      }

      // Connect to the selected wallet
      await connect()
      
      if (publicKey) {
        const walletAddress = publicKey.toBase58()
        setAddress(walletAddress)
        try {
          await connectWallet(walletAddress)
        } catch (error) {
          console.error('Failed to save wallet to backend:', error)
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      // If connection fails, show the wallet modal to allow user to select a different wallet
      if (error.name === 'WalletNotSelectedError' || error.name === 'WalletConnectionError') {
        setVisible(true)
      }
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
      setAddress("")
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  // Alternative approach: Use wallet modal for connection
  const handleConnectWithModal = () => {
    setVisible(true)
  }

  if (connected && publicKey) {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-cyan-400/30 rounded-lg px-4 py-2 text-white transition-colors">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="font-mono text-sm">{publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-cyan-400/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <button onClick={handleDisconnect} className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg">
            Disconnect
          </button>
        </div>
      </div>
    )
  }

  return (
    <button 
      onClick={handleConnectWithModal} // Use modal approach for better UX
      disabled={connecting}
      className={`cyber-button flex items-center gap-2 ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Wallet className="w-5 h-5" />
      {connecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}

// Main WalletConnect component that provides the context
export function WalletConnect() {
  return (
    <WalletProviderWrapper>
      <WalletConnectInternal />
    </WalletProviderWrapper>
  )
}