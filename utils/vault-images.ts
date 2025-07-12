// Smart system for lobby room images - no manual backend work needed!
export const VAULT_THEMES = ["vault-1", "vault-2", "vault-3", "vault-4", "vault-5"] as const

export const VAULT_BACKGROUNDS = [
  "cyberpunk-heist-1",
  "cyberpunk-heist-2",
  "vault-security",
  "heist-planning",
  "neon-cityscape",
] as const

// Generate thumbnail based on room ID - consistent but varied
export function getVaultThumbnail(roomId: string): string {
  const hash = roomId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const themeIndex = hash % VAULT_THEMES.length
  return `/assets/vault-thumbnails/${VAULT_THEMES[themeIndex]}.png`
}

// Generate background based on room name - for variety
export function getVaultBackground(roomName: string): string {
  const hash = roomName
    .toLowerCase()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const bgIndex = hash % VAULT_BACKGROUNDS.length
  return `/assets/${VAULT_BACKGROUNDS[bgIndex]}.png`
}

// Generate room difficulty color
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

// Generate room type icon
export function getRoomTypeIcon(roomName: string): string {
  const name = roomName.toLowerCase()
  if (name.includes("bank")) return "🏦"
  if (name.includes("vault")) return "🔒"
  if (name.includes("diamond")) return "💎"
  if (name.includes("cyber")) return "🔮"
  if (name.includes("gold")) return "🏆"
  return "🎯"
}
