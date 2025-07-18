"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import socketService from "@/services/socketService" // Adjust path
import { useAppContext } from '@/contexts/AppContext' // Import the context hook

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateRoomModal({ isOpen, onClose }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [maxPlayers, setMaxPlayers] = useState(4)
  const { isAuthenticated } = useAppContext() // Access authentication status

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert("Please connect your wallet to create a room.")
      return
    }
    const roomData = { name: roomName, difficulty, maxPlayers }
    try {
      await socketService.createRoom(roomData)
      onClose()
    } catch (error) {
      console.error("Error creating room:", error.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="cyber-card max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Plus className="w-6 h-6 text-cyan-400" />
            Create Room
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAuthenticated && (
          <p className="text-red-400 mb-4">Please connect your wallet to create a room.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter room name..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Max Players</label>
            <select
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-800/80 border border-cyan-400/30 rounded-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg 
                       transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 cyber-button" disabled={!isAuthenticated}>
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}