"use client";

import React from "react";

const SEAWEED_POSITIONS = [
  { left: "5%", height: 80, color: "#2d8a4e" },
  { left: "8%", height: 110, color: "#1e6b3a" },
  { left: "12%", height: 65, color: "#3a9f5c" },
  { left: "40%", height: 90, color: "#2d8a4e" },
  { left: "42%", height: 70, color: "#1e6b3a" },
  { left: "65%", height: 100, color: "#3a9f5c" },
  { left: "68%", height: 75, color: "#2d8a4e" },
  { left: "85%", height: 85, color: "#1e6b3a" },
  { left: "88%", height: 60, color: "#3a9f5c" },
  { left: "92%", height: 95, color: "#2d8a4e" },
  { left: "20%", height: 55, color: "#3a9f5c" },
  { left: "55%", height: 72, color: "#1e6b3a" },
  { left: "75%", height: 88, color: "#2d8a4e" },
];

const CORAL_ITEMS = [
  { left: "15%", emoji: "🪸", size: 28 },
  { left: "50%", emoji: "🪸", size: 22 },
  { left: "78%", emoji: "🪸", size: 32 },
  { left: "35%", emoji: "🐚", size: 18 },
  { left: "60%", emoji: "🐚", size: 16 },
  { left: "90%", emoji: "⭐", size: 16 },
];

export default function Seaweed() {
  return (
    <>
      {SEAWEED_POSITIONS.map((sw, i) => (
        <div
          key={`sw-${i}`}
          className="seaweed"
          style={{ left: sw.left }}
        >
          <div
            className="seaweed-blade"
            style={{
              height: sw.height,
              background: `linear-gradient(0deg, ${sw.color}, ${sw.color}cc)`,
              // @ts-expect-error CSS custom properties
              "--sway-duration": `${2.5 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
          {/* Secondary blade */}
          <div
            className="seaweed-blade"
            style={{
              height: sw.height * 0.7,
              left: 6,
              background: `linear-gradient(0deg, ${sw.color}dd, ${sw.color}99)`,
              // @ts-expect-error CSS custom properties
              "--sway-duration": `${3 + Math.random() * 2}s`,
              animationDelay: `${0.5 + Math.random() * 2}s`,
            }}
          />
        </div>
      ))}

      {/* Coral decorations */}
      {CORAL_ITEMS.map((c, i) => (
        <div
          key={`coral-${i}`}
          className="coral"
          style={{ left: c.left, fontSize: c.size }}
        >
          {c.emoji}
        </div>
      ))}
    </>
  );
}
