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

  // Only include wallets that aren't already registered as Standard Wallets
  const wallets = useMemo(() => {
    const walletAdapters = []
    
    // Check if Phantom is available as Standard Wallet
    const isPhantomStandard = typeof window !== 'undefined' && 
      window.phantom?.solana?.isPhantom
    
    // Only add Phantom adapter if not available as Standard Wallet
    if (!isPhantomStandard) {
      walletAdapters.push(new PhantomWalletAdapter())
    }
    
    // Solflare typically doesn't conflict with Standard Wallet
    walletAdapters.push(new SolflareWalletAdapter())
    
    return walletAdapters.filter((adapter, index, array) => 
      array.findIndex(a => a.name === adapter.name) === index
    )
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.error('Wallet error:', error)
          // Ignore MetaMask-related errors for Solana wallets
          if (error.message?.includes('MetaMask') || 
              error.message?.includes('ethereum')) {
            return
          }
        }}
      >
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

  // Auto-connect when wallet is selected
  useEffect(() => {
    if (wallet && !connected && !connecting) {
      // Small delay to ensure wallet is fully loaded
      const timer = setTimeout(() => {
        handleWalletConnect()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [wallet, connected, connecting])

  const handleWalletConnect = async () => {
    if (!wallet) return

    try {
      // For Standard Wallets, the readyState check is different
      const isReady = wallet.readyState === 'Installed' || 
                     wallet.readyState === 'Loadable' ||
                     wallet.readyState === 'NotDetected'

      if (isReady || wallet.readyState === 'Installed') {
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
      } else {
        // Wallet not installed - redirect to install
        console.log(`${wallet.name} not installed, redirecting to install...`)
        
        const installUrl = getWalletInstallUrl(wallet.name)
        if (installUrl) {
          const shouldInstall = confirm(`${wallet.name} is not installed. Would you like to install it now?`)
          if (shouldInstall) {
            window.open(installUrl, '_blank')
          }
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      
      // Handle specific error cases
      if (error.name === 'WalletNotReadyError' || error.message?.includes('not installed')) {
        const installUrl = getWalletInstallUrl(wallet.name)
        if (installUrl) {
          const shouldInstall = confirm(`${wallet.name} is not installed. Would you like to install it now?`)
          if (shouldInstall) {
            window.open(installUrl, '_blank')
          }
        }
      } else if (error.name === 'WalletConnectionError') {
        console.error('Wallet connection failed:', error.message)
        // Don't show alert for connection rejections
        if (!error.message?.includes('rejected') && !error.message?.includes('cancelled')) {
          alert('Failed to connect to wallet. Please try again.')
        }
      }
    }
  }

  const getWalletInstallUrl = (walletName: string): string | null => {
    const installUrls: Record<string, string> = {
      'Phantom': 'https://phantom.app/',
      'Solflare': 'https://solflare.com/',
      'Backpack': 'https://backpack.app/',
      'Glow': 'https://glow.app/',
      'Coin98': 'https://coin98.com/wallet',
      'Slope': 'https://slope.finance/'
    }
    
    return installUrls[walletName] || null
  }

  const handleConnect = async () => {
    try {
      // If no wallet is selected, show the wallet modal
      if (!wallet) {
        setVisible(true)
        return
      }

      await handleWalletConnect()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
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

  // Show wallet selection modal
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