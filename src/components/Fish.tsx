"use client";

import React from "react";
import type { FishData } from "./Aquarium";

interface Props {
  data: FishData;
}

export default function Fish({ data }: Props) {
  const facingRight = data.vx >= 0;

  return (
    <div
      className="fish"
      style={{
        left: data.x,
        top: data.y,
        // @ts-expect-error CSS custom properties
        "--fish-size": `${data.size}px`,
        "--fish-color": data.color,
        transform: facingRight ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <div className="fish-tooltip">
        {data.name} the {data.species} — ⛏ {data.mined.toFixed(1)} sats |{" "}
        😊 {Math.round(data.happiness)}%
      </div>
      <div className="fish-body">
        <div className="fish-tail" />
        <div className="fish-main">
          <div className="fish-eye" />
          <div className="fish-fin" />
          <div className="fish-dorsal" />
          {/* Stripe pattern */}
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "10%",
              width: "80%",
              height: "3px",
              background: `linear-gradient(90deg, transparent, ${data.color}88, transparent)`,
              filter: "brightness(1.3)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "55%",
              left: "15%",
              width: "70%",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${data.color}66, transparent)`,
              filter: "brightness(0.7)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
