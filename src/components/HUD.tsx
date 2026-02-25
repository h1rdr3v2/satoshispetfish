"use client"

import React, { useEffect, useState } from "react"

interface Props {
	satoshis: number
	fishCount: number
	totalMined: number
	onShopToggle: () => void
}

export default function HUD({
	satoshis,
	fishCount,
	totalMined,
	onShopToggle,
}: Props) {
	const [btcPrice, setBtcPrice] = useState(69420)

	// Fun fake BTC price ticker
	useEffect(() => {
		const interval = setInterval(() => {
			setBtcPrice((p) => p + (Math.random() - 0.48) * 500)
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	const btcValue = satoshis / 100_000_000

	return (
		<div
			className="glass-panel"
			style={{
				position: "absolute",
				top: 16,
				left: 16,
				padding: "16px 20px",
				zIndex: 40,
				minWidth: 220,
			}}
		>
			<div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
				<span className="glow-text">₿</span>{" "}
				<span style={{ color: "#ffd700", fontFamily: "var(--font-mono)" }}>
					{Math.floor(satoshis).toLocaleString()}
				</span>{" "}
				<span style={{ fontSize: 12, color: "#8ecdf7" }}>sats</span>
			</div>

			<div style={{ fontSize: 11, color: "#8ecdf7aa", marginBottom: 4 }}>
				≈ {btcValue.toFixed(8)} BTC ≈ ${(btcValue * btcPrice).toFixed(2)}
			</div>

			<div style={{ fontSize: 11, color: "#8ecdf7aa", marginBottom: 8 }}>
				BTC: ${btcPrice.toFixed(0)} {btcPrice > 69000 ? "📈" : "📉"}
			</div>

			<div
				style={{
					display: "flex",
					gap: 12,
					fontSize: 12,
					color: "#8ecdf7",
					marginBottom: 10,
				}}
			>
				<span>🐠 {fishCount} fish</span>
				<span>⛏ {Math.floor(totalMined)} mined</span>
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation()
					onShopToggle()
				}}
				style={{
					background: "linear-gradient(135deg, #ffd700, #ff8c00)",
					border: "none",
					borderRadius: 10,
					padding: "8px 16px",
					color: "#1a1a2e",
					fontWeight: "bold",
					fontSize: 13,
					cursor: "pointer",
					width: "100%",
					transition: "transform 0.2s, box-shadow 0.2s",
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = "scale(1.05)"
					e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.4)"
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = "scale(1)"
					e.currentTarget.style.boxShadow = "none"
				}}
			>
				🏪 Fish Shop
			</button>

			<div
				style={{
					fontSize: 10,
					color: "#8ecdf766",
					marginTop: 8,
					textAlign: "center",
				}}
			>
				Click anywhere to feed & earn sats!
			</div>
		</div>
	)
}
