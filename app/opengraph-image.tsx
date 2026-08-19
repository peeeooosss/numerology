import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Magic of Numbers — Free Numerology Calculator & Reports";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #080914 0%, #101225 50%, #1b1d3a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #d4af37, #b8860b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            ✦
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#f6f1e7",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: "#d4af37" }}>Magic</span> of Numbers
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#a0a0b8",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          Free Numerology Calculator & Online Reports
        </div>
        <div
          style={{
            fontSize: "18px",
            color: "#d4af37",
            marginTop: "32px",
            padding: "8px 24px",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "9999px",
          }}
        >
          magicofnumbers.in
        </div>
      </div>
    ),
    { ...size }
  );
}
