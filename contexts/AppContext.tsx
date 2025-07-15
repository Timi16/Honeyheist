// AppContext.tsx
import { createContext, useContext } from 'react';

interface AppContextType {
  walletAddress: string | null;
  isWalletSaved: boolean;
  isAuthenticated: boolean;
}

export const AppContext = createContext<AppContextType>({
  walletAddress: null,
  isWalletSaved: false,
  isAuthenticated: false,
});

export const useAppContext = () => useContext(AppContext);