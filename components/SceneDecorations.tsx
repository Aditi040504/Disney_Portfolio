"use client";

/**
 * SceneDecorations — Real Asset Integration
 *
 * Uses actual assets discovered in the assets/ folder:
 *   assets/flower.png      → public/decorations/flowers/flower.png
 *   assets/lantern.png     → public/decorations/lanterns/lantern.png
 *   assets/lantern 2.png   → public/decorations/lanterns/lantern2.png
 *   assets/sign.png        → public/decorations/sign.png
 *
 * Layer order (z-index):
 *   z-0   CinematicBackground canvas
 *   z-20  SceneDecorations (this component — flowers, lanterns, sign)
 *   z-30  Resume section content
 *
 * Scene timing (from direct frame inspection):
 *   OPENING  frames   1– 60  → wooden direction sign
 *   FLOWER   frames  60–150  → enchanted golden lily
 *   LANTERN  frames 370–1120 → floating paper lanterns (layered depth)
 *
 * Design rules:
 *   - pointer-events-none: never block scroll/click
 *   - All motion via CSS transforms only (no layout shifts)
 *   - prefers-reduced-motion: static opacity, no animation
 *   - Decorations hug edges/corners — never cover central text
 *   - Scale & opacity variation creates depth without repeated identical assets
 */

import React, { useEffect, useState } from "react";
import { useFrameProgress } from "@/lib/use-frame-progress";

// ─── Asset paths (served from /public via Next.js static hosting) ─────────────
const FLOWER_SRC = "/decorations/flowers/flower.png";
const LANTERN_A_SRC = "/decorations/lanterns/lantern.png";   // single lantern, solo
const LANTERN_B_SRC = "/decorations/lanterns/lantern2.png";  // paired lanterns, slightly different angle
const SIGN_SRC = "/decorations/sign.png";

// ─── prefers-reduced-motion hook ─────────────────────────────────────────────
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ─── Helper: clamp ───────────────────────────────────────────────────────────
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ─────────────────────────────────────────────────────────────────────────────
// SIGN (Opening scene — frames 1–60)
// ─────────────────────────────────────────────────────────────────────────────
// Positioned on the right edge so it sits beside the hero text, not over it.
// Slides in from slightly below and parallaxes gently as the user scrolls.
interface SignDecorationProps {
  opacity: number;
  reducedMotion: boolean;
}

function SignDecoration({ opacity, reducedMotion }: SignDecorationProps) {
  // Entrance: slides up from slightly below as it fades in — feels like it
  // rises up into the scene from the forest floor rather than popping in.
  const translateY = reducedMotion ? 0 : clamp((1 - opacity) * 28, 0, 28);

  return (
    <div
      className="fixed pointer-events-none select-none z-20"
      style={{
        // Moved 1.5× inward from edge: right value changed from -4vw/-60px
        // to a positive inset so the sign sits visibly inside the cinematic world.
        // On mobile it shifts further inward to avoid overlapping identity text.
        right: "clamp(8px, 3vw, 48px)",
        bottom: "10vh",
        // 1.5× the previous clamp range: was 140–220px → now 210–340px
        width: "clamp(210px, 21vw, 340px)",
        opacity,
        transform: `translateY(${translateY}px) rotate(-3deg)`,
        transition: reducedMotion ? undefined : "transform 0.4s ease-out",
        // Warm grounded shadow — slightly stronger to anchor it in the scene
        filter: "drop-shadow(0 10px 28px rgba(140, 100, 40, 0.32))",
        // Subtle physical sway when fully visible
        animation: reducedMotion || opacity < 0.5
          ? undefined
          : "signSway 8s ease-in-out 0.5s infinite alternate",
      }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SIGN_SRC}
        alt="Whimsical wooden direction sign reading This Way, Nowhere, Over There, That Way, Anywhere, Somewhere"
        draggable={false}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOWER (Enchanted flower scene — frames 60–150)
// ─────────────────────────────────────────────────────────────────────────────
// Three instances of the same asset placed at different scales and positions
// to create a sense of depth without fabricating new graphics.
//
//   Instance A — bottom-left corner, large, slightly off-screen, background depth
//   Instance B — bottom-right corner, medium, rotated, midground depth
//   Instance C — left edge mid-height, small, partially cropped, far background
//
// The opacity envelope from sceneEnvelopeOpacity controls the whole layer.
// Individual dim factors provide depth differentiation within the layer.

interface FlowerDecorationProps {
  opacity: number;
  reducedMotion: boolean;
}

function FlowerDecoration({ opacity, reducedMotion }: FlowerDecorationProps) {
  const floatAnim = reducedMotion ? undefined : "flowerSway 7s ease-in-out 0s infinite alternate";
  const floatBnim = reducedMotion ? undefined : "flowerSway 9s ease-in-out 1.5s infinite alternate";
  const floatCnim = reducedMotion ? undefined : "flowerSway 11s ease-in-out 0.8s infinite alternate";

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-20 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* ── Instance A: Bottom-left, large, background depth ── */}
      <div
        className="absolute"
        style={{
          bottom: "-8%",
          left: "-6%",
          width: "clamp(180px, 22vw, 380px)",
          opacity: 0.82,
          transform: "rotate(-18deg)",
          animation: floatAnim,
          filter: "drop-shadow(0 4px 16px rgba(201, 148, 77, 0.18))",
          // Warm subtle glow that blends with the golden/purple frame palette
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLOWER_SRC}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Instance B: Bottom-right, medium, midground depth ── */}
      <div
        className="absolute hidden sm:block"
        style={{
          bottom: "-5%",
          right: "-4%",
          width: "clamp(130px, 16vw, 280px)",
          opacity: 0.70,
          transform: "rotate(22deg) scaleX(-1)",
          animation: floatBnim,
          filter: "drop-shadow(0 4px 12px rgba(201, 148, 77, 0.15))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLOWER_SRC}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* ── Instance C: Left edge mid-height, small, far background ── */}
      <div
        className="absolute hidden lg:block"
        style={{
          top: "28%",
          left: "-8%",
          width: "clamp(90px, 9vw, 160px)",
          opacity: 0.45,
          transform: "rotate(8deg)",
          animation: floatCnim,
          filter: "blur(1.5px) drop-shadow(0 2px 8px rgba(201, 148, 77, 0.10))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FLOWER_SRC}
          alt=""
          draggable={false}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANTERNS (Lantern scene — frames 370–1120)
// ─────────────────────────────────────────────────────────────────────────────
// Uses BOTH lantern assets to prevent repetition:
//   lantern.png  (single, rounder top)  → solo instances at varying sizes
//   lantern2.png (paired, two at angle) → used as a single decorative unit
//
// Depth layers:
//   BACKGROUND  — small, blurred, slow, dimmer, lower opacity
//   MIDGROUND   — medium, slight blur, moderate speed
//   FOREGROUND  — larger, sharp, brighter, slightly faster, edge-positioned

interface LanternInstance {
  id: string;
  src: string;
  // Position
  left: string;
  bottom: string;
  // Visual
  width: string;
  opacity: number;
  rotate: string;
  blur?: string;
  // Animation
  duration: string;
  delay: string;
  // Responsive
  hideBelow?: "sm" | "md" | "lg";
}

const LANTERN_INSTANCES: LanternInstance[] = [
  // ── BACKGROUND layer ──────────────────────────────────────────────────────
  {
    id: "bg-1",
    src: LANTERN_A_SRC,
    left: "8%", bottom: "18%",
    width: "clamp(28px, 3.5vw, 56px)",
    opacity: 0.38,
    rotate: "-4deg",
    blur: "2px",
    duration: "20s", delay: "0s",
    hideBelow: "md",
  },
  {
    id: "bg-2",
    src: LANTERN_A_SRC,
    left: "52%", bottom: "22%",
    width: "clamp(22px, 2.8vw, 44px)",
    opacity: 0.32,
    rotate: "3deg",
    blur: "2.5px",
    duration: "24s", delay: "3s",
    hideBelow: "lg",
  },
  {
    id: "bg-3",
    src: LANTERN_A_SRC,
    left: "78%", bottom: "15%",
    width: "clamp(18px, 2.2vw, 36px)",
    opacity: 0.28,
    rotate: "-2deg",
    blur: "3px",
    duration: "26s", delay: "1.5s",
    hideBelow: "lg",
  },

  // ── MIDGROUND layer ───────────────────────────────────────────────────────
  {
    id: "mid-1",
    src: LANTERN_B_SRC,          // paired variant — more visual interest
    left: "2%", bottom: "8%",
    width: "clamp(60px, 7vw, 110px)",
    opacity: 0.62,
    rotate: "5deg",
    blur: "0.8px",
    duration: "16s", delay: "0.5s",
    hideBelow: "sm",
  },
  {
    id: "mid-2",
    src: LANTERN_A_SRC,
    left: "62%", bottom: "5%",
    width: "clamp(46px, 5.5vw, 84px)",
    opacity: 0.55,
    rotate: "-6deg",
    blur: "1px",
    duration: "18s", delay: "2.5s",
    hideBelow: "sm",
  },
  {
    id: "mid-3",
    src: LANTERN_A_SRC,
    left: "38%", bottom: "10%",
    width: "clamp(36px, 4.5vw, 70px)",
    opacity: 0.48,
    rotate: "2deg",
    blur: "1.5px",
    duration: "22s", delay: "4s",
    hideBelow: "md",
  },

  // ── FOREGROUND layer ──────────────────────────────────────────────────────
  // Opacity trimmed from 0.82/0.78 → 0.68/0.62: the cinematic frames already
  // contain many lanterns, so PNG foreground elements should add depth without
  // competing with the background artwork.
  {
    id: "fg-1",
    src: LANTERN_A_SRC,
    left: "-3%", bottom: "2%",
    width: "clamp(80px, 9vw, 140px)",
    opacity: 0.68,
    rotate: "-8deg",
    duration: "13s", delay: "1s",
  },
  {
    id: "fg-2",
    src: LANTERN_B_SRC,          // paired variant for foreground right side
    left: "88%", bottom: "4%",
    width: "clamp(72px, 8.5vw, 130px)",
    opacity: 0.62,
    rotate: "6deg",
    duration: "15s", delay: "0s",
    hideBelow: "sm",
  },
];

interface LanternDecorationProps {
  opacity: number;
  reducedMotion: boolean;
}

function LanternDecoration({ opacity, reducedMotion }: LanternDecorationProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-20 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {LANTERN_INSTANCES.map((ln) => {
        const hideClass =
          ln.hideBelow === "lg" ? " hidden lg:block"
          : ln.hideBelow === "md" ? " hidden md:block"
          : ln.hideBelow === "sm" ? " hidden sm:block"
          : "";

        return (
          <div
            key={ln.id}
            className={`absolute${hideClass}`}
            style={{
              left: ln.left,
              bottom: ln.bottom,
              width: ln.width,
              opacity: ln.opacity,
              transform: `rotate(${ln.rotate})`,
              filter: ln.blur
                ? `blur(${ln.blur}) drop-shadow(0 4px 18px rgba(201, 148, 77, 0.30))`
                : "drop-shadow(0 4px 20px rgba(201, 148, 77, 0.38))",
              animation: reducedMotion
                ? undefined
                : `lanternRise ${ln.duration} ease-in-out ${ln.delay} infinite`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ln.src}
              alt=""
              draggable={false}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function SceneDecorations() {
  const { openingOpacity, flowerOpacity, lanternOpacity } = useFrameProgress();
  const reducedMotion = usePrefersReducedMotion();

  const anyVisible = openingOpacity > 0 || flowerOpacity > 0 || lanternOpacity > 0;
  if (!anyVisible) return null;

  return (
    <>
      {/* ── SIGN (opening scene, frames 1–60) ── */}
      {openingOpacity > 0 && (
        <SignDecoration opacity={openingOpacity} reducedMotion={reducedMotion} />
      )}

      {/* ── FLOWER (enchanted flower scene, frames 60–150) ── */}
      {flowerOpacity > 0 && (
        <FlowerDecoration opacity={flowerOpacity} reducedMotion={reducedMotion} />
      )}

      {/* ── LANTERNS (lantern night scene, frames 370–1120) ── */}
      {lanternOpacity > 0 && (
        <LanternDecoration opacity={lanternOpacity} reducedMotion={reducedMotion} />
      )}
    </>
  );
}
