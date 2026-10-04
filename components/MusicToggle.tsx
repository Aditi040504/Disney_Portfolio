"use client";

/**
 * MusicToggle — Cinematic background music control
 *
 * Track metadata:
 *   title:    "Fantasy Background – Cinematic Adventure Atmosphere"
 *   artist:   OpenMindAudio
 *   source:   Pixabay
 *   url:      https://pixabay.com/music/fantasy-dreamy-childrens-fantasy-background-cinematic-adventure-atmosphere-464813/
 *   license:  Pixabay Content License  (https://pixabay.com/service/license-summary/)
 *   note:     Track identified as AI-generated on the Pixabay page; free for use
 *             under the Pixabay Content License; attribution not required.
 *
 * Behaviour:
 *   - Music is OFF by default; the visitor must explicitly enable it.
 *   - Uses a single HTMLAudioElement created once via useRef.
 *   - Loops continuously at a subtle background volume (0.13).
 *   - Respects browser autoplay policy — play() rejection is caught silently.
 *   - Session preference is stored in sessionStorage so a page refresh within
 *     the same tab does NOT restart music unexpectedly (still requires a click
 *     to begin; the stored flag only informs the initial render state label).
 *   - Does NOT interact with the 1,215-frame canvas or scroll system.
 *   - pointer-events for the button only; the wrapper has no layout impact.
 */

import React, { useEffect, useRef, useState, useCallback } from "react";

const AUDIO_SRC = "/audio/portfolio-theme.mp3";
const DEFAULT_VOLUME = 0.13;
const SESSION_KEY = "portfolio-music-enabled";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Start always OFF — visitor must explicitly click.
  const [isPlaying, setIsPlaying] = useState(false);
  // Tracks whether play() was attempted but blocked by autoplay policy.
  const [isBlocked, setIsBlocked] = useState(false);

  // ── Create the audio element once on mount ──────────────────────────────
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = "none"; // defer network request until the user clicks
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // ── Toggle handler ──────────────────────────────────────────────────────
  const handleToggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Pause
      audio.pause();
      setIsPlaying(false);
      setIsBlocked(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "false");
      } catch {
        // sessionStorage unavailable in some privacy contexts — ignore
      }
    } else {
      // Play — respect browser autoplay policy by catching the rejection
      try {
        await audio.play();
        setIsPlaying(true);
        setIsBlocked(false);
        try {
          sessionStorage.setItem(SESSION_KEY, "true");
        } catch {
          // ignore
        }
      } catch {
        // Browser blocked the play attempt (autoplay policy)
        setIsBlocked(true);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  // ── Keyboard: Space / Enter already fire click on <button>, nothing extra needed ─

  // ── Accessible label ────────────────────────────────────────────────────
  const ariaLabel = isPlaying
    ? "Disable background music"
    : isBlocked
    ? "Background music blocked — click to retry"
    : "Enable background music";

  // ── Icon glyphs (pure Unicode — no external icon lib needed) ────────────
  // ♪ = music note (playing)   ♩ = single note (paused)
  // Using SVG paths for crisp rendering at small sizes.
  return (
    <div
      className="fixed bottom-5 left-5 z-50"
      // The div is purely a positioning wrapper; the button is the interactive element
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-label={ariaLabel}
        aria-pressed={isPlaying}
        title={ariaLabel}
        className={[
          // Base: small circle, dark translucent, cinematic gold border
          "group relative flex items-center justify-center",
          "w-10 h-10 rounded-full",
          "bg-[#0a0914]/80 backdrop-blur-md",
          "border transition-all duration-300",
          isPlaying
            ? "border-tangled-gold/60 shadow-[0_0_16px_rgba(230,179,102,0.30)]"
            : "border-tangled-gold/25 shadow-[0_0_8px_rgba(230,179,102,0.10)]",
          // Hover glow
          "hover:border-tangled-gold/70 hover:shadow-[0_0_22px_rgba(230,179,102,0.35)]",
          // Focus ring — accessible keyboard navigation
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tangled-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508]",
          // Subtle press scale
          "active:scale-95",
        ].join(" ")}
      >
        {/* ── Icon: SVG music note ── */}
        <MusicIcon playing={isPlaying} blocked={isBlocked} />
      </button>
    </div>
  );
}

// ── Sub-component: SVG icons ─────────────────────────────────────────────────
interface MusicIconProps {
  playing: boolean;
  blocked: boolean;
}

function MusicIcon({ playing, blocked }: MusicIconProps) {
  const goldColor = "#e6b366";
  const mutedColor = "#9e9aa8";
  const color = playing ? goldColor : mutedColor;

  if (blocked) {
    // Show an exclamation icon if autoplay was blocked
    return (
      <svg
        width="16" height="16" viewBox="0 0 16 16"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8 2L14 13H2L8 2Z"
          stroke={goldColor} strokeWidth="1.5" strokeLinejoin="round"
          fill="none"
        />
        <line x1="8" y1="6.5" x2="8" y2="9.5" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11.5" r="0.75" fill={goldColor} />
      </svg>
    );
  }

  if (playing) {
    // Two vertical bars (pause) with a subtle note indication
    return (
      <svg
        width="16" height="16" viewBox="0 0 16 16"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Pause bars */}
        <rect x="4" y="3.5" width="2.5" height="9" rx="1" fill={color} />
        <rect x="9.5" y="3.5" width="2.5" height="9" rx="1" fill={color} />
      </svg>
    );
  }

  // Music note (play state prompt)
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Eighth-note: vertical stem + note head + flag */}
      <line x1="10" y1="2.5" x2="10" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="7.5" cy="11.8" rx="2.5" ry="1.8" fill={color} transform="rotate(-12 7.5 11.8)" />
      {/* Flag / beam */}
      <path d="M10 2.5 C12 4 13 6 11 7.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
