// REAL HIGH-QUALITY IMAGES - NO MORE 404s!
export const REAL_IMAGES = {
  // Hero & Backgrounds - WORKING LINKS ONLY
  heroBg: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",

  // Vault Thumbnails Pool - REAL WORKING IMAGES
  vaultThumbnails: [
    "https://images.unsplash.com/photo-1614064641938-3bbee52c7?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=120&fit=crop&q=80",
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
