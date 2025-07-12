"use client"

import { useEffect, useRef } from "react"
import Phaser from "phaser"

interface PhaserGameProps {
  roomId: string
}

export function PhaserGame({ roomId }: PhaserGameProps) {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    // Game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1200,
      height: 800,
      parent: gameRef.current,
      backgroundColor: "#1a1a2e",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    }

    // Create the game
    phaserGameRef.current = new Phaser.Game(config)

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true)
        phaserGameRef.current = null
      }
    }
  }, [])

  function preload(this: Phaser.Scene) {
    // Create placeholder sprites
    this.add.graphics().fillStyle(0x00ffff).fillRect(0, 0, 32, 32).generateTexture("player", 32, 32)

    this.add.graphics().fillStyle(0x666666).fillRect(0, 0, 64, 64).generateTexture("wall", 64, 64)

    this.add.graphics().fillStyle(0x333333).fillRect(0, 0, 64, 32).generateTexture("floor", 64, 32)

    this.add.graphics().fillStyle(0xffff00).fillRect(0, 0, 32, 32).generateTexture("loot", 32, 32)
  }

  function create(this: Phaser.Scene) {
    // Create vault background
    for (let x = 0; x < 1200; x += 64) {
      for (let y = 0; y < 800; y += 64) {
        if (y === 800 - 32) {
          this.add.image(x, y, "floor")
        } else if (x === 0 || x >= 1200 - 64 || y === 0) {
          this.add.image(x, y, "wall")
        }
      }
    }

    // Create player
    const player = this.physics.add.sprite(100, 700, "player")
    player.setBounce(0.2)
    player.setCollideWorldBounds(true)

    // Create loot items
    const loot = this.physics.add.group()
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(200, 1000)
      const y = Phaser.Math.Between(100, 600)
      loot.create(x, y, "loot")
    }

    // Player controls
    const cursors = this.input.keyboard?.createCursorKeys()
    const wasd = this.input.keyboard?.addKeys("W,S,A,D")

    // Store references for update function
    ;(this as any).player = player
    ;(this as any).cursors = cursors
    ;(this as any).wasd = wasd
    ;(this as any).loot = loot

    // Collect loot on overlap
    this.physics.add.overlap(player, loot, (player, lootItem) => {
      lootItem.destroy()
    })

    // Add UI text
    this.add.text(16, 16, `Room: ${roomId}`, {
      fontSize: "24px",
      color: "#00ffff",
    })

    this.add.text(16, 50, "Use WASD or Arrow Keys to move", {
      fontSize: "16px",
      color: "#ffffff",
    })
  }

  function update(this: Phaser.Scene) {
    const player = (this as any).player
    const cursors = (this as any).cursors
    const wasd = (this as any).wasd

    if (!player || !cursors || !wasd) return

    // Player movement
    if (cursors.left.isDown || wasd.A.isDown) {
      player.setVelocityX(-160)
    } else if (cursors.right.isDown || wasd.D.isDown) {
      player.setVelocityX(160)
    } else {
      player.setVelocityX(0)
    }

    if ((cursors.up.isDown || wasd.W.isDown) && player.body.touching.down) {
      player.setVelocityY(-330)
    }
  }

  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <div ref={gameRef} className="border border-cyan-400/30 rounded-lg overflow-hidden" />
    </div>
  )
}
