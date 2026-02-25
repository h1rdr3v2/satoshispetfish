"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import Fish from "./Fish"
import Bubbles from "./Bubbles"
import Seaweed from "./Seaweed"
import HUD from "./HUD"
import Shop from "./Shop"
import Footer from "./Footer"

export interface FishData {
	id: string
	name: string
	color: string
	size: number
	x: number
	y: number
	vx: number
	vy: number
	mineRate: number
	mined: number
	happiness: number
	species: string
}

interface FoodParticle {
	id: string
	x: number
	y: number
	born: number
}

interface FloatingText {
	id: string
	x: number
	y: number
	text: string
	born: number
}

interface Ripple {
	id: string
	x: number
	y: number
	born: number
}

const CRYPTO_NAMES = [
	"Satoshi",
	"Nakamoto",
	"Hal Finney",
	"Hodl",
	"Lambo",
	"Moonfish",
	"Whale Jr.",
	"Shrimp",
	"Diamond Fins",
	"Paper Tail",
	"Block",
	"Hash",
	"Nonce",
	"Merkle",
	"Genesis",
	"DeFi Dan",
	"Rug Pull Rick",
	"Pump",
	"Dump",
	"WAGMI",
	"gm",
	"ser",
	"fren",
	"Anon",
	"AlphaFin",
	"Vitalik Jr.",
	"CZ's Goldfish",
	"Elon's Koi",
	"Doge Fish",
	"Pepe Guppy",
]

const FISH_COLORS = [
	"#ff6b35",
	"#ff1744",
	"#d500f9",
	"#651fff",
	"#2979ff",
	"#00e5ff",
	"#00e676",
	"#ffea00",
	"#ff9100",
	"#f50057",
	"#7c4dff",
	"#18ffff",
	"#76ff03",
	"#ffd740",
	"#ff6e40",
]

const SPECIES = [
	"Clownfish",
	"Angelfish",
	"Pufferfish",
	"Beta",
	"Goldfish",
	"Neon Tetra",
	"Guppy",
	"Swordtail",
	"Koi",
	"Tang",
]

function randomName() {
	return CRYPTO_NAMES[Math.floor(Math.random() * CRYPTO_NAMES.length)]
}

function randomColor() {
	return FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)]
}

function randomSpecies() {
	return SPECIES[Math.floor(Math.random() * SPECIES.length)]
}

function createFish(overrides?: Partial<FishData>): FishData {
	const size = 40 + Math.random() * 30
	return {
		id: Math.random().toString(36).slice(2, 9),
		name: randomName(),
		color: randomColor(),
		size,
		x:
			100 +
			Math.random() *
				(typeof window !== "undefined" ? window.innerWidth - 200 : 800),
		y:
			80 +
			Math.random() *
				(typeof window !== "undefined" ? window.innerHeight - 250 : 400),
		vx: (Math.random() - 0.5) * 2,
		vy: (Math.random() - 0.5) * 1,
		mineRate: 0.5 + Math.random() * 1.5,
		mined: 0,
		happiness: 80 + Math.random() * 20,
		species: randomSpecies(),
		...overrides,
	}
}

export default function Aquarium() {
	const [fish, setFish] = useState<FishData[]>(() => [
		createFish({ name: "Satoshi", color: "#ffd700", size: 55, species: "Koi" }),
		createFish({ name: "Hodl", color: "#ff6b35", species: "Clownfish" }),
		createFish({ name: "Moonfish", color: "#2979ff", species: "Angelfish" }),
	])
	const [satoshis, setSatoshis] = useState(100)
	const [totalMined, setTotalMined] = useState(0)
	const [food, setFood] = useState<FoodParticle[]>([])
	const [floats, setFloats] = useState<FloatingText[]>([])
	const [ripples, setRipples] = useState<Ripple[]>([])
	const [showShop, setShowShop] = useState(false)
	const [clickCombo, setClickCombo] = useState(0)
	const comboTimeout = useRef<NodeJS.Timeout | null>(null)
	const aquariumRef = useRef<HTMLDivElement>(null)
	const frameRef = useRef<number>(0)

	// Fish movement & mining loop
	useEffect(() => {
		let animId: number
		let lastTime = performance.now()

		const animate = (now: number) => {
			const dt = Math.min((now - lastTime) / 1000, 0.1)
			lastTime = now

			setFish((prev) =>
				prev.map((f) => {
					let { x, y, vx, vy } = f
					const w = window.innerWidth
					const h = window.innerHeight

					// Wander
					vx += (Math.random() - 0.5) * 0.3
					vy += (Math.random() - 0.5) * 0.2

					// Clamp speed
					const maxSpeed = 1.5 + f.size * 0.01
					const speed = Math.sqrt(vx * vx + vy * vy)
					if (speed > maxSpeed) {
						vx = (vx / speed) * maxSpeed
						vy = (vy / speed) * maxSpeed
					}

					x += vx * dt * 60
					y += vy * dt * 60

					// Bounce off walls
					if (x < 30) {
						x = 30
						vx = Math.abs(vx) * 0.8
					}
					if (x > w - 80) {
						x = w - 80
						vx = -Math.abs(vx) * 0.8
					}
					if (y < 50) {
						y = 50
						vy = Math.abs(vy) * 0.8
					}
					if (y > h - 120) {
						y = h - 120
						vy = -Math.abs(vy) * 0.8
					}

					return { ...f, x, y, vx, vy }
				}),
			)

			// Mining
			frameRef.current++
			if (frameRef.current % 60 === 0) {
				let mined = 0
				setFish((prev) =>
					prev.map((f) => {
						const gain = f.mineRate * (f.happiness / 100)
						mined += gain
						return { ...f, mined: f.mined + gain }
					}),
				)
				if (mined > 0) {
					setSatoshis((s) => s + mined)
					setTotalMined((t) => t + mined)
				}
			}

			animId = requestAnimationFrame(animate)
		}

		animId = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(animId)
	}, [])

	// Cleanup old food, floats and ripples
	useEffect(() => {
		const interval = setInterval(() => {
			const now = Date.now()
			setFood((prev) => prev.filter((f) => now - f.born < 3000))
			setFloats((prev) => prev.filter((f) => now - f.born < 1500))
			setRipples((prev) => prev.filter((r) => now - r.born < 1000))
		}, 500)
		return () => clearInterval(interval)
	}, [])

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			if (
				(e.target as HTMLElement).closest(".glass-panel, .shop-item, button, a")
			)
				return

			const rect = aquariumRef.current?.getBoundingClientRect()
			if (!rect) return
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			// Drop food
			const particles = 3 + Math.floor(Math.random() * 3)
			const newFood: FoodParticle[] = Array.from(
				{ length: particles },
				(_, i) => ({
					id: Math.random().toString(36).slice(2, 9),
					x: x + (Math.random() - 0.5) * 30,
					y: y + (Math.random() - 0.5) * 10,
					born: Date.now(),
				}),
			)
			setFood((prev) => [...prev, ...newFood])

			// Click combo
			setClickCombo((c) => c + 1)
			if (comboTimeout.current) clearTimeout(comboTimeout.current)
			comboTimeout.current = setTimeout(() => setClickCombo(0), 2000)

			const bonus = Math.min(clickCombo, 10)
			const earned = 1 + bonus
			setSatoshis((s) => s + earned)
			setTotalMined((t) => t + earned)

			// Floating text
			setFloats((prev) => [
				...prev,
				{
					id: Math.random().toString(36).slice(2, 9),
					x,
					y,
					text: bonus > 0 ? `+${earned} sats 🔥x${bonus}` : `+${earned} sat`,
					born: Date.now(),
				},
			])

			// Ripple
			setRipples((prev) => [
				...prev,
				{ id: Math.random().toString(36).slice(2, 9), x, y, born: Date.now() },
			])

			// Attract nearest fish toward food
			setFish((prev) => {
				const sorted = [...prev].sort(
					(a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y),
				)
				return prev.map((f) => {
					if (sorted.indexOf(f) < 2) {
						const dx = x - f.x
						const dy = y - f.y
						const dist = Math.hypot(dx, dy) || 1
						return {
							...f,
							vx: f.vx + (dx / dist) * 1.5,
							vy: f.vy + (dy / dist) * 1.5,
							happiness: Math.min(100, f.happiness + 5),
						}
					}
					return f
				})
			})
		},
		[clickCombo],
	)

	const buyFish = useCallback(
		(cost: number, overrides?: Partial<FishData>) => {
			if (satoshis < cost) return
			setSatoshis((s) => s - cost)
			setFish((prev) => [...prev, createFish(overrides)])
		},
		[satoshis],
	)

	return (
		<div className="aquarium" ref={aquariumRef} onClick={handleClick}>
			<div className="light-rays" />
			<div className="sand" />

			{/* Seaweed */}
			<Seaweed />

			{/* Bubbles */}
			<Bubbles fishPositions={fish.map((f) => ({ x: f.x, y: f.y }))} />

			{/* Fish */}
			{fish.map((f) => (
				<Fish key={f.id} data={f} />
			))}

			{/* Food */}
			{food.map((f) => (
				<div
					key={f.id}
					className="food-particle"
					style={{ left: f.x, top: f.y }}
				/>
			))}

			{/* Floating text */}
			{floats.map((f) => (
				<div
					key={f.id}
					className="satoshi-float"
					style={{ left: f.x, top: f.y }}
				>
					{f.text}
				</div>
			))}

			{/* Ripples */}
			{ripples.map((r) => (
				<div
					key={r.id}
					className="click-ripple"
					style={{ left: r.x, top: r.y }}
				/>
			))}

			{/* Treasure chest */}
			<div
				className="treasure"
				style={{ bottom: 35, right: "15%" }}
				onClick={(e) => {
					e.stopPropagation()
					const bonus = 10 + Math.floor(Math.random() * 40)
					setSatoshis((s) => s + bonus)
					setTotalMined((t) => t + bonus)
					const rect = aquariumRef.current?.getBoundingClientRect()
					if (rect) {
						setFloats((prev) => [
							...prev,
							{
								id: Math.random().toString(36).slice(2, 9),
								x: e.clientX - rect.left,
								y: e.clientY - rect.top,
								text: `💰 +${bonus} sats!`,
								born: Date.now(),
							},
						])
					}
				}}
			>
				<span style={{ fontSize: 32 }}>🪙</span>
				<div
					className="treasure-sparkle"
					style={{ top: -5, left: 5, animationDelay: "0s" }}
				/>
				<div
					className="treasure-sparkle"
					style={{ top: -8, right: 2, animationDelay: "0.5s" }}
				/>
				<div
					className="treasure-sparkle"
					style={{ top: -3, right: -5, animationDelay: "1s" }}
				/>
			</div>

			{/* Another treasure */}
			<div
				className="treasure"
				style={{ bottom: 38, left: "25%" }}
				onClick={(e) => {
					e.stopPropagation()
					const bonus = 5 + Math.floor(Math.random() * 20)
					setSatoshis((s) => s + bonus)
					setTotalMined((t) => t + bonus)
					const rect = aquariumRef.current?.getBoundingClientRect()
					if (rect) {
						setFloats((prev) => [
							...prev,
							{
								id: Math.random().toString(36).slice(2, 9),
								x: e.clientX - rect.left,
								y: e.clientY - rect.top,
								text: `⚡ +${bonus} sats!`,
								born: Date.now(),
							},
						])
					}
				}}
			>
				<span style={{ fontSize: 28 }}>📦</span>
				<div
					className="treasure-sparkle"
					style={{ top: -5, left: 3, animationDelay: "0.3s" }}
				/>
			</div>

			{/* HUD */}
			<HUD
				satoshis={satoshis}
				fishCount={fish.length}
				totalMined={totalMined}
				onShopToggle={() => setShowShop((s) => !s)}
			/>

			{/* Shop */}
			{showShop && (
				<Shop
					satoshis={satoshis}
					onBuy={buyFish}
					onClose={() => setShowShop(false)}
					fishCount={fish.length}
				/>
			)}

			{/* Footer */}
			<Footer />
		</div>
	)
}
