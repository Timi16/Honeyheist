const APP_URL = process.env.API_URL || '';

export const connectWallet = async (address: string) => {
    const response = await fetch(`${APP_URL}/api/wallets/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
  
    if (!response.ok) {
      throw new Error(`Connect failed: ${response.statusText}`);
    }
  
    return response.json();
  };
  
  // Fetch list of connected wallets
  export const getConnectedWallets = async () => {
    const response = await fetch(`${APP_URL}/api/wallets/connected`);
  
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.statusText}`);
    }
  
    return response.json();
  };
  