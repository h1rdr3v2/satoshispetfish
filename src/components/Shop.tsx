"use client"

import React from "react"
import type { FishData } from "./Aquarium"

interface ShopFish {
	name: string
	cost: number
	description: string
	emoji: string
	overrides: Partial<FishData>
}

const SHOP_ITEMS: ShopFish[] = [
	{
		name: "Guppy",
		cost: 50,
		description: "A tiny but mighty miner. +0.5 sats/s",
		emoji: "🐟",
		overrides: { size: 35, mineRate: 0.5, species: "Guppy" },
	},
	{
		name: "Clownfish",
		cost: 150,
		description: "Found Nemo! Good vibes, decent mining. +1 sats/s",
		emoji: "🐠",
		overrides: {
			size: 45,
			mineRate: 1.0,
			color: "#ff6b35",
			species: "Clownfish",
		},
	},
	{
		name: "Angelfish",
		cost: 300,
		description: "Elegant & efficient. +1.5 sats/s",
		emoji: "🐡",
		overrides: {
			size: 52,
			mineRate: 1.5,
			color: "#d500f9",
			species: "Angelfish",
		},
	},
	{
		name: "Neon Tetra",
		cost: 100,
		description: "Glows in the dark! Fast swimmer. +0.8 sats/s",
		emoji: "✨",
		overrides: {
			size: 30,
			mineRate: 0.8,
			color: "#00e5ff",
			species: "Neon Tetra",
		},
	},
	{
		name: "Golden Koi",
		cost: 500,
		description: "Satoshi's favorite. High hash rate! +2.5 sats/s",
		emoji: "🏆",
		overrides: { size: 60, mineRate: 2.5, color: "#ffd700", species: "Koi" },
	},
	{
		name: "Whale",
		cost: 1000,
		description: "THE whale. Massive mining power. +5 sats/s",
		emoji: "🐋",
		overrides: { size: 75, mineRate: 5.0, color: "#2979ff", species: "Whale" },
	},
]

interface Props {
	satoshis: number
	fishCount: number
	onBuy: (cost: number, overrides?: Partial<FishData>) => void
	onClose: () => void
}

export default function Shop({ satoshis, fishCount, onBuy, onClose }: Props) {
	return (
		<div
			className="glass-panel"
			style={{
				position: "absolute",
				top: 16,
				right: 16,
				width: 300,
				maxHeight: "calc(100vh - 80px)",
				overflowY: "auto",
				padding: "20px",
				zIndex: 45,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 16,
				}}
			>
				<h2
					style={{ fontSize: 18, fontWeight: "bold", color: "#ffd700" }}
					className="glow-text"
				>
					🏪 Fish Shop
				</h2>
				<button
					onClick={(e) => {
						e.stopPropagation()
						onClose()
					}}
					style={{
						background: "rgba(255,255,255,0.1)",
						border: "1px solid rgba(255,255,255,0.2)",
						borderRadius: 8,
						color: "#fff",
						padding: "4px 10px",
						cursor: "pointer",
						fontSize: 12,
					}}
				>
					✕
				</button>
			</div>

			<div style={{ fontSize: 12, color: "#8ecdf7aa", marginBottom: 12 }}>
				🐠 {fishCount} fish in your aquarium
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				{SHOP_ITEMS.map((item) => {
					const canAfford = satoshis >= item.cost
					return (
						<div
							key={item.name}
							className="shop-item"
							onClick={(e) => {
								e.stopPropagation()
								if (canAfford) onBuy(item.cost, item.overrides)
							}}
							style={{
								background: canAfford
									? "rgba(255, 215, 0, 0.05)"
									: "rgba(255, 255, 255, 0.02)",
								border: `1px solid ${canAfford ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 255, 255, 0.05)"}`,
								borderRadius: 12,
								padding: "12px 14px",
								opacity: canAfford ? 1 : 0.5,
								cursor: canAfford ? "pointer" : "not-allowed",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<span style={{ fontSize: 15, fontWeight: "bold" }}>
									{item.emoji} {item.name}
								</span>
								<span
									style={{
										fontSize: 13,
										color: canAfford ? "#ffd700" : "#ff5555",
										fontWeight: "bold",
										fontFamily: "var(--font-mono)",
									}}
								>
									{item.cost} sats
								</span>
							</div>
							<div style={{ fontSize: 11, color: "#8ecdf7aa", marginTop: 4 }}>
								{item.description}
							</div>
						</div>
					)
				})}
			</div>

			<div
				style={{
					marginTop: 16,
					padding: "10px",
					background: "rgba(255, 215, 0, 0.05)",
					borderRadius: 10,
					border: "1px solid rgba(255, 215, 0, 0.1)",
					fontSize: 11,
					color: "#8ecdf7cc",
					textAlign: "center",
				}}
			>
				💡 Tip: Click fast for combo bonuses!
				<br />
				Fish mine more when they&apos;re happy 😊
			</div>
		</div>
	)
}
