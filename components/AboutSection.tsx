"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function AboutSection() {
  const { headline, text, keyThemes } = PORTFOLIO_DATA.careerObjective;

  return (
    <section
      id="about"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-6xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          PROLOGUE
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      {/* Main Headline */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cinzel font-normal text-tangled-cream tracking-wide mb-8 leading-tight">
        {headline}
      </h2>

      {/* Story Narrative Paragraph (Verbatim Career Objective from Resume) */}
      <div className="relative mb-16 pl-6 border-l-2 border-tangled-gold/40">
        <p className="text-lg sm:text-2xl font-cormorant italic text-tangled-cream/90 leading-relaxed max-w-4xl">
          &ldquo;{text}&rdquo;
        </p>
      </div>

      {/* Three Visual Themes Grid (Derived directly from Career Objective & Experience) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {keyThemes.map((theme, idx) => (
          <div
            key={idx}
            className="cinematic-card p-8 rounded-2xl relative group transition-all duration-300"
          >
            <div className="absolute top-4 right-4 text-xs font-mono text-tangled-gold/40">
              0{idx + 1}
            </div>
            <h3 className="text-xl font-cinzel text-tangled-gold mb-3 font-semibold">
              {theme.title}
            </h3>
            <p className="text-sm font-sans text-tangled-cream/80 leading-relaxed font-light">
              {theme.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
