"use client"

import React, { useEffect, useState } from "react"

interface BubbleData {
	id: string
	x: number
	y: number
	size: number
	duration: number
}

interface Props {
	fishPositions: { x: number; y: number }[]
}

export default function Bubbles({ fishPositions }: Props) {
	const [bubbles, setBubbles] = useState<BubbleData[]>([])

	useEffect(() => {
		const interval = setInterval(() => {
			// Random ambient bubbles
			const ambientCount = 1 + Math.floor(Math.random() * 2)
			const newBubbles: BubbleData[] = []

			for (let i = 0; i < ambientCount; i++) {
				newBubbles.push({
					id: Math.random().toString(36).slice(2, 9),
					x:
						Math.random() *
						(typeof window !== "undefined" ? window.innerWidth : 800),
					y:
						(typeof window !== "undefined" ? window.innerHeight : 600) -
						80 +
						Math.random() * 40,
					size: 3 + Math.random() * 8,
					duration: 3 + Math.random() * 5,
				})
			}

			// Fish bubbles
			if (fishPositions.length > 0) {
				const fish =
					fishPositions[Math.floor(Math.random() * fishPositions.length)]
				newBubbles.push({
					id: Math.random().toString(36).slice(2, 9),
					x: fish.x + 20,
					y: fish.y - 5,
					size: 2 + Math.random() * 5,
					duration: 2 + Math.random() * 4,
				})
			}

			setBubbles((prev) => [...prev, ...newBubbles])
		}, 800)

		// Cleanup old bubbles
		const cleanup = setInterval(() => {
			setBubbles((prev) => {
				if (prev.length > 40) return prev.slice(-30)
				return prev
			})
		}, 3000)

		return () => {
			clearInterval(interval)
			clearInterval(cleanup)
		}
	}, [fishPositions])

	return (
		<>
			{bubbles.map((b) => (
				<div
					key={b.id}
					className="bubble"
					style={{
						left: b.x,
						top: b.y,
						width: b.size,
						height: b.size,
						// @ts-expect-error CSS custom properties
						"--rise-duration": `${b.duration}s`,
					}}
				/>
			))}
		</>
	)
}
