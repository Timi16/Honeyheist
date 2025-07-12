// REAL HIGH-QUALITY IMAGES - COMPLETE SET FOR HONEY HEIST
export const REAL_IMAGES = {
  // Hero & Backgrounds - WORKING LINKS ONLY
  heroBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&q=80",
  
  // Execute the Heist Section Images
  neonCity: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop&q=80",
  teamWork: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80",
  
  // Heist Features Images
  vaultDoor: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop&q=80",
  coding: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80",
  securitySystem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
  
  // How It Works Section Images
  meeting: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&q=80",
  planning: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80",
  blockchain: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&q=80",
  
  // Features Section Images
  servers: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",

  // Vault Thumbnails Pool - REAL WORKING IMAGES
  vaultThumbnails: [
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=120&fit=crop&q=80",
  ],
}

// Smart thumbnail generation with REAL images
export function getVaultThumbnail(roomId: string): string {
  const hash = roomId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const index = hash % REAL_IMAGES.vaultThumbnails.length
  return REAL_IMAGES.vaultThumbnails[index]
}

// Generate room difficulty color - FIXED EXPORT
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-400"
    case "medium":
      return "text-yellow-400"
    case "hard":
      return "text-red-400"
    case "expert":
      return "text-purple-400"
    default:
      return "text-gray-400"
  }
}

// Generate room type icon - FIXED EXPORT
export function getRoomTypeIcon(roomName: string): string {
  const name = roomName.toLowerCase()
  if (name.includes("bank")) return "🏦"
  if (name.includes("vault")) return "🔒"
  if (name.includes("diamond")) return "💎"
  if (name.includes("cyber")) return "🔮"
  if (name.includes("gold")) return "🏆"
  return "🎯"
}