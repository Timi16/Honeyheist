"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { RoleButton } from "@/components/role-button"
import { PlayerSlot } from "@/components/player-slot"
import { Users, Clock, ArrowRight } from "lucide-react"

const roles = [
  {
    key: "hacker",
    label: "Hacker",
    icon: "/placeholder.svg?height=64&width=64",
    description: "Disable security systems",
  },
  {
    key: "muscle",
    label: "Muscle",
    icon: "/placeholder.svg?height=64&width=64",
    description: "Handle physical obstacles",
  },
  { key: "lookout", label: "Lookout", icon: "/placeholder.svg?height=64&width=64", description: "Monitor for threats" },
  { key: "driver", label: "Driver", icon: "/placeholder.svg?height=64&width=64", description: "Plan the escape route" },
]

const mockPlayers = [
  { id: "1", address: "0x1234...5678", role: "hacker", isReady: true, isHost: true },
  { id: "2", address: "0x9876...5432", role: "muscle", isReady: false, isHost: false },
  { id: "3", address: null, role: null, isReady: false, isHost: false },
  { id: "4", address: null, role: null, isReady: false, isHost: false },
]

export default function RoomPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const roomId = params.id as string
  const allPlayersReady = mockPlayers.filter((p) => p.address).every((p) => p.isReady)
  const canStartHeist = allPlayersReady && mockPlayers.filter((p) => p.address).length >= 2

  const handleStartHeist = () => {
    if (canStartHeist) {
      router.push(`/heist/${roomId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Room Header */}
        <div className="cyber-card mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 neon-glow">
                Room: <span className="text-cyan-400">{roomId}</span>
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{mockPlayers.filter((p) => p.address).length}/4 Players</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Waiting for players...</span>
                </div>
              </div>
            </div>

            {canStartHeist && (
              <button onClick={handleStartHeist} className="cyber-button flex items-center gap-2 mt-4 md:mt-0">
                Start Heist <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Player Slots */}
          <div className="cyber-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              Players
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {mockPlayers.map((player, index) => (
                <PlayerSlot key={index} player={player} slotNumber={index + 1} />
              ))}
            </div>
          </div>

          {/* Role Selection */}
          <div className="cyber-card">
            <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {roles.map((role) => (
                <RoleButton
                  key={role.key}
                  role={role}
                  isSelected={selectedRole === role.key}
                  isDisabled={mockPlayers.some((p) => p.role === role.key)}
                  onClick={() => setSelectedRole(role.key)}
                />
              ))}
            </div>

            {selectedRole && (
              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 mb-2">Ready to start?</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isReady}
                        onChange={(e) => setIsReady(e.target.checked)}
                        className="w-5 h-5 text-cyan-400 bg-gray-800 border-gray-600 rounded 
                                 focus:ring-cyan-400 focus:ring-2"
                      />
                      <span className="text-white">I'm ready!</span>
                    </label>
                  </div>

                  {isReady && <div className="text-green-400 font-semibold">✓ Ready</div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Rules */}
        <div className="cyber-card mt-8">
          <h3 className="text-xl font-bold mb-4">Heist Rules</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Objective</h4>
              <p>Work together to infiltrate the vault, bypass security, and escape with the loot.</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Roles</h4>
              <p>Each role has unique abilities essential for success. Coordinate your actions!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
