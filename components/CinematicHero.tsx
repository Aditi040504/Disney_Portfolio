"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function CinematicHero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const heroHeight = window.innerHeight * 1.5; // Transition out within the opening 150vh
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute smooth fade-in and fade-out opacities during the opening sequence
  const nameOpacity = Math.max(0, Math.min(1, (1 - scrollProgress * 1.6)));
  const translateY = scrollProgress * -40;

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-32">
      <div
        className="transition-opacity duration-200 ease-out transform max-w-4xl"
        style={{
          opacity: nameOpacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <span className="block text-xs md:text-sm uppercase tracking-[0.35em] text-tangled-gold/90 font-sans mb-4 font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          A Cinematic Portfolio
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-cinzel font-semibold tracking-wider text-tangled-cream drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          {PORTFOLIO_DATA.hero.name}
        </h1>
        <p className="mt-4 text-base sm:text-xl md:text-2xl font-cormorant italic text-tangled-glow tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          {PORTFOLIO_DATA.hero.role}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-tangled-muted uppercase font-sans">
          <span className="w-8 h-[1px] bg-tangled-gold/40" />
          <span className="text-tangled-cream/80">{PORTFOLIO_DATA.hero.tagline}</span>
          <span className="w-8 h-[1px] bg-tangled-gold/40" />
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-tangled-gold/60 font-mono animate-bounce">
          <span>Scroll to explore story</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
