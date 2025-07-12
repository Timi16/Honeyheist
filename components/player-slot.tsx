import { Crown, Check, Clock } from "lucide-react"

interface Player {
  id: string
  address: string | null
  role: string | null
  isReady: boolean
  isHost: boolean
}

interface PlayerSlotProps {
  player: Player
  slotNumber: number
}

export function PlayerSlot({ player, slotNumber }: PlayerSlotProps) {
  const isEmpty = !player.address

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200
      ${isEmpty ? "border-gray-600 bg-gray-800/50 border-dashed" : "border-cyan-400/30 bg-gray-800/80"}`}
    >
      {isEmpty ? (
        <div className="text-center text-gray-500">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-lg font-bold">{slotNumber}</span>
          </div>
          <p className="text-sm">Waiting for player...</p>
        </div>
      ) : (
        <div className="text-center">
          {/* Avatar */}
          <div className="relative w-12 h-12 mx-auto mb-2">
            <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">{player.address!.slice(2, 4).toUpperCase()}</span>
            </div>

            {player.isHost && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-gray-900" />
              </div>
            )}
          </div>

          {/* Address */}
          <p className="text-xs font-mono text-gray-300 mb-2">{player.address}</p>

          {/* Role */}
          {player.role && (
            <div className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded mb-2">
              {player.role.charAt(0).toUpperCase() + player.role.slice(1)}
            </div>
          )}

          {/* Status */}
          <div
            className={`flex items-center justify-center gap-1 text-xs
            ${player.isReady ? "text-green-400" : "text-yellow-400"}`}
          >
            {player.isReady ? (
              <>
                <Check className="w-3 h-3" />
                Ready
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                Not Ready
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
