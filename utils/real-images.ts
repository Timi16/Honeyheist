// REAL HIGH-QUALITY IMAGES - NO MORE 404s!
export const REAL_IMAGES = {
  // Hero & Backgrounds
  heroBg: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center&q=80",
  neonCity: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop&crop=center&q=80",
  cyberpunkStreet:
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop&crop=center&q=80",

  // Heist & Security
  vaultDoor: "https://images.unsplash.com/photo-1614064641938-3bbee52c7?w=800&h=600&fit=crop&crop=center&q=80",
  securitySystem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&q=80",
  bankVault: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=600&fit=crop&crop=center&q=80",

  // Team & Planning
  teamWork: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop&crop=center&q=80",
  planning: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center&q=80",
  meeting: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&crop=center&q=80",

  // Technology & Blockchain
  blockchain: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center&q=80",
  coding: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center&q=80",
  servers: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=center&q=80",

  // Gaming & UI
  gaming: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop&crop=center&q=80",
  neonLights: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=500&fit=crop&crop=center&q=80",

  // Vault Thumbnails Pool
  vaultThumbnails: [
    "https://images.unsplash.com/photo-1614064641938-3bbee52c7?w=200&h=120&fit=crop&crop=center&q=80",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=120&fit=crop&crop=center&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop&crop=center&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=120&fit=crop&crop=center&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=120&fit=crop&crop=center&q=80",
  ],
}

// Smart thumbnail generation with REAL images
export function getVaultThumbnail(roomId: string): string {
  const hash = roomId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % REAL_IMAGES.vaultThumbnails.length
  return REAL_IMAGES.vaultThumbnails[index]
}

// Get background image based on room type
export function getVaultBackground(roomType: string): string {
  switch (roomType?.toLowerCase()) {
    case "bank":
      return REAL_IMAGES.bankVault
    case "vault":
      return REAL_IMAGES.vaultDoor
    case "cyber":
      return REAL_IMAGES.neonCity
    case "security":
      return REAL_IMAGES.securitySystem
    default:
      return REAL_IMAGES.vaultDoor
  }
}
