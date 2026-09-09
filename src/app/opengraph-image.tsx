import { ImageResponse } from "next/og";
export const alt = "Strategy Lab. Understand the choices behind every outcome.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F4F0E8",
          color: "#17211B",
          padding: 70,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 30 }}>
          ↗ Strategy Lab <span style={{ color: "#D84B32" }}> .</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontFamily: "serif",
            maxWidth: 960,
          }}
        >
          Understand the choices behind every outcome.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            borderTop: "1px solid #CBC5B8",
            paddingTop: 25,
            justifyContent: "space-between",
          }}
        >
          <span>INTERACTIVE GAME THEORY</span>
          <span>Cooperation · Competition · Trust</span>
        </div>
      </div>
    ),
    size,
  );
}
