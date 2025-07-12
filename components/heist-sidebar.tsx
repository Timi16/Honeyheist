"use client"

import { useState } from "react"
import { Users, Target, Clock, Zap, AlertTriangle } from "lucide-react"

interface HeistSidebarProps {
  roomId: string
}

const mockPlayers = [
  { id: "1", role: "hacker", address: "0x1234...5678", status: "active", progress: 75 },
  { id: "2", role: "muscle", address: "0x9876...5432", status: "active", progress: 60 },
  { id: "3", role: "lookout", address: "0x5555...1111", status: "warning", progress: 90 },
  { id: "4", role: "driver", address: "0x7777...9999", status: "ready", progress: 100 },
]

const mockObjectives = [
  { id: 1, text: "Disable security cameras", completed: true },
  { id: 2, text: "Hack vault door", completed: true },
  { id: 3, text: "Collect loot items", completed: false, progress: 60 },
  { id: 4, text: "Reach extraction point", completed: false },
]

export function HeistSidebar({ roomId }: HeistSidebarProps) {
  const [activeTab, setActiveTab] = useState<"team" | "objectives">("team")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "ready":
        return "text-cyan-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "ready":
        return <Target className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">Heist Control</h2>
        <p className="text-sm text-gray-400">Room: {roomId}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab("team")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors
            ${activeTab === "team" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"}`}
        >
          <Users className="w-4 h-4 inline-block mr-2" />
          Team
        </button>
        <button
          onClick={() => setActiveTab("objectives")}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors
            ${
              activeTab === "objectives" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"
            }`}
        >
          <Target className="w-4 h-4 inline-block mr-2" />
          Objectives
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "team" ? (
          <div className="space-y-4">
            {mockPlayers.map((player) => (
              <div key={player.id} className="bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{player.address.slice(2, 4).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white capitalize">{player.role}</p>
                      <p className="text-xs text-gray-400 font-mono">{player.address}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 ${getStatusColor(player.status)}`}>
                    {getStatusIcon(player.status)}
                    <span className="text-xs capitalize">{player.status}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${player.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{player.progress}% complete</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockObjectives.map((objective) => (
              <div
                key={objective.id}
                className={`p-3 rounded-lg border-l-4 ${
                  objective.completed ? "bg-green-900/20 border-green-400" : "bg-gray-700/50 border-cyan-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${objective.completed ? "bg-green-400 border-green-400" : "border-gray-400"}`}
                  >
                    {objective.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${objective.completed ? "text-green-400" : "text-white"}`}>
                    {objective.text}
                  </span>
                </div>

                {!objective.completed && objective.progress && (
                  <div className="ml-7">
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                      <div
                        className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${objective.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{objective.progress}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">2,500 HONEY</div>
          <p className="text-xs text-gray-400">Potential Reward</p>
        </div>
      </div>
    </div>
  )
}
