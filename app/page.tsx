import Image from "next/image"
import Link from "next/link"
import { WalletConnect } from "@/components/wallet-connect"
import { REAL_IMAGES } from "@/utils/real-images"
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Trophy,
  Target,
  Play,
  ChevronDown,
  Gamepad2,
  Coins,
  Eye,
  Car,
  Lock,
  Cpu,
  Camera,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* REAL Animated Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={REAL_IMAGES.heroBg || "/placeholder.svg"}
          alt="Real cyberpunk cityscape with neon lights"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />

        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-glow">
                HONEY
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-glow">
                HEIST
              </span>

              {/* Glowing effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-3xl -z-10" />
            </h1>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32" />
              <span className="text-cyan-400 font-mono text-sm tracking-wider">THE ULTIMATE CRYPTO HEIST</span>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32" />
            </div>
          </div>

          <p className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Plan the perfect heist with your crew. Infiltrate high-security vaults, bypass cutting-edge security
            systems, and escape with massive crypto rewards in this{" "}
            <span className="text-cyan-400 font-semibold">blockchain-powered</span> adventure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <WalletConnect />
            <Link href="/lobby" className="group cyber-button text-lg px-8 py-4 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-6 h-6" />
                Start Heisting
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <button className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
              <Play className="w-5 h-5" />
              Watch Trailer
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: "Active Players", value: "12,847", icon: Users },
              { label: "Heists Completed", value: "3,291", icon: Target },
              { label: "Total Rewards", value: "$2.4M", icon: Coins },
              { label: "Success Rate", value: "73%", icon: Trophy },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </section>

      {/* Execute the Heist Section - REAL IMAGES */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Execute the Perfect Heist
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience heart-pounding action as you infiltrate the most secure vaults in the cyberpunk underworld
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative group">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={REAL_IMAGES.neonCity || "/placeholder.svg"}
                  alt="Real cyberpunk city with neon lights and futuristic buildings"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Cyber Infiltration</h3>
                  <p className="text-gray-300">Navigate through advanced security grids and laser systems</p>
                </div>
                {/* Floating UI elements */}
                <div className="absolute top-4 right-4 bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded px-3 py-1">
                  <span className="text-cyan-400 text-sm font-mono">SECURITY: BYPASSED</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={REAL_IMAGES.teamWork || "/placeholder.svg"}
                  alt="Real team collaboration and planning session"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Team Synchronization</h3>
                  <p className="text-gray-300">Coordinate with your crew in real-time for maximum efficiency</p>
                </div>
                {/* Floating UI elements */}
                <div className="absolute top-4 right-4 bg-green-400/20 backdrop-blur-sm border border-green-400/30 rounded px-3 py-1">
                  <span className="text-green-400 text-sm font-mono">TEAM: SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Heist Features with REAL images */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Advanced Security",
                description: "Bypass quantum encryption, biometric scanners, and AI-powered defense systems",
                image: REAL_IMAGES.vaultDoor,
              },
              {
                icon: Cpu,
                title: "Real-Time Hacking",
                description: "Use cutting-edge tools to disable security networks and unlock digital vaults",
                image: REAL_IMAGES.coding,
              },
              {
                icon: Camera,
                title: "Stealth Operations",
                description: "Avoid detection while navigating through surveillance networks and guard patrols",
                image: REAL_IMAGES.securitySystem,
              },
            ].map((feature, index) => (
              <div key={index} className="cyber-card group hover:scale-105 transition-all duration-300">
                <div className="relative h-32 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={`Real ${feature.title.toLowerCase()} equipment and setup`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section with REAL images */}
      <section className="relative z-10 py-24 bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300">Master the art of the perfect heist in four simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assemble Your Crew",
                description: "Connect your wallet and join a heist room with up to 4 players",
                icon: Users,
                image: REAL_IMAGES.meeting,
              },
              {
                step: "02",
                title: "Choose Your Role",
                description: "Select from Hacker, Muscle, Lookout, or Driver - each with unique abilities",
                icon: Target,
                image: REAL_IMAGES.planning,
              },
              {
                step: "03",
                title: "Execute the Heist",
                description: "Coordinate in real-time to bypass security and collect the loot",
                icon: Zap,
                image: REAL_IMAGES.vaultDoor,
              },
              {
                step: "04",
                title: "Claim Rewards",
                description: "Successfully escape and claim your crypto rewards on the blockchain",
                icon: Trophy,
                image: REAL_IMAGES.blockchain,
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="cyber-card h-full text-center group-hover:scale-105 transition-all duration-300">
                  {/* Step number */}
                  <div className="text-6xl font-bold text-cyan-400/20 mb-4">{item.step}</div>

                  {/* Icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full p-4">
                      <item.icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 mb-6">{item.description}</p>

                  {/* REAL Image */}
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={`Real ${item.title.toLowerCase()} scene`}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-gray-800/50 to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Choose Your Role
              </span>
            </h2>
            <p className="text-xl text-gray-300">Every successful heist needs the right team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                role: "Hacker",
                icon: Zap,
                color: "from-cyan-400 to-blue-500",
                abilities: ["Disable security systems", "Hack electronic locks", "Override cameras"],
                description: "The digital infiltrator who clears the path",
              },
              {
                role: "Muscle",
                icon: Shield,
                color: "from-red-400 to-orange-500",
                abilities: ["Break through barriers", "Handle physical security", "Carry heavy loot"],
                description: "The powerhouse who handles obstacles",
              },
              {
                role: "Lookout",
                icon: Eye,
                color: "from-green-400 to-emerald-500",
                abilities: ["Monitor security", "Spot threats", "Coordinate timing"],
                description: "The eyes and ears of the operation",
              },
              {
                role: "Driver",
                icon: Car,
                color: "from-purple-400 to-pink-500",
                abilities: ["Plan escape routes", "Vehicle control", "Emergency extraction"],
                description: "The getaway specialist ensuring safe escape",
              },
            ].map((role, index) => (
              <div key={index} className="cyber-card group hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${role.color} p-4`}>
                  <role.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 text-center">{role.role}</h3>
                <p className="text-gray-400 text-center mb-6">{role.description}</p>

                <div className="space-y-2">
                  {role.abilities.map((ability, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-300">{ability}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with REAL image */}
      <section className="relative z-10 py-24 bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Next-Gen Gaming
                </span>
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: Shield,
                    title: "Blockchain Security",
                    description:
                      "Provably fair gameplay with transparent smart contracts ensuring every heist is legitimate.",
                  },
                  {
                    icon: Users,
                    title: "Real-Time Multiplayer",
                    description: "Coordinate with your crew in real-time across different roles and specializations.",
                  },
                  {
                    icon: Trophy,
                    title: "Crypto Rewards",
                    description: "Earn real cryptocurrency rewards based on your heist performance and teamwork.",
                  },
                  {
                    icon: Gamepad2,
                    title: "Immersive Gameplay",
                    description:
                      "Experience cutting-edge 2D graphics with physics-based interactions and dynamic environments.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg p-3 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={REAL_IMAGES.servers || "/placeholder.svg"}
                  alt="Real server room with advanced technology setup"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-20 animate-pulse" />
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-30 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Ready to Pull Off the Ultimate Heist?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12">
            Join thousands of players in the most thrilling crypto heist experience. Your crew is waiting, and the vault
            is calling.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/lobby" className="cyber-button text-lg px-8 py-4 group">
              <span className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6" />
                Start Your First Heist
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-lg"
            >
              <Trophy className="w-5 h-5" />
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
