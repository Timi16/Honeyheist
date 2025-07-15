import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { connectWallet } from '@/services/wallet';
import socketService from '@/services/socketService';
import { AppContext } from './AppContext'; // Import the context, not the hook

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletSaved, setIsWalletSaved] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { publicKey, connected } = useWallet();

  useEffect(() => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      
      // Step 1: Save wallet to backend
      connectWallet(address)
        .then(() => {
          setWalletAddress(address);
          setIsWalletSaved(true);
          
          // Step 2: Authenticate with WebSocket after wallet is saved
          return socketService.authenticate(address);
        })
        .then(() => {
          setIsAuthenticated(true);
          console.log('Wallet authenticated successfully');
        })
        .catch((error) => {
          console.error('Error during wallet connection or authentication:', error);
          // Reset states on failure
          setIsWalletSaved(false);
          setIsAuthenticated(false);
        });
    } else {
      // Reset states when wallet is disconnected
      setWalletAddress(null);
      setIsWalletSaved(false);
      setIsAuthenticated(false);
    }
  }, [connected, publicKey]);

  return (
    <AppContext.Provider value={{ walletAddress, isWalletSaved, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}