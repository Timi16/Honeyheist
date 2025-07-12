"use client"

import { useParams } from "next/navigation"
import { PhaserGame } from "@/components/phaser-game"
import { HeistSidebar } from "@/components/heist-sidebar"

export default function HeistPage() {
  const params = useParams()
  const roomId = params.id as string

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Game Canvas */}
      <div className="flex-1 relative">
        <PhaserGame roomId={roomId} />
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-l border-cyan-400/30">
        <HeistSidebar roomId={roomId} />
      </div>
    </div>
  )
}
