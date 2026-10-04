"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function FinalCredits() {
  const { credits } = PORTFOLIO_DATA;

  return (
    <footer className="relative z-30 min-h-screen py-40 px-6 sm:px-12 flex flex-col justify-center items-center text-center bg-gradient-to-b from-transparent via-[#050508]/70 to-[#020204]/90">
      {/* 1. Cinematic "THE END" */}
      <div className="mb-32">
        <div className="w-2 h-2 rounded-full bg-tangled-gold mx-auto mb-8 shadow-[0_0_20px_rgba(230,179,102,0.8)] animate-pulse" />
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-cinzel tracking-[0.3em] text-tangled-cream uppercase font-light">
          The End
        </h2>
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-tangled-muted font-sans">
          Chapter One of the Journey
        </p>
      </div>

      {/* 2. Movie-Style Post-Credits Roll Sequence */}
      <div className="max-w-2xl mx-auto space-y-16 border-t border-b border-white/10 py-20 my-10">
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-tangled-muted font-sans block mb-3 font-semibold">
            {credits.supertitle}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-tangled-gold/70 font-sans block mb-2">
            {credits.authorLabel}
          </span>
          <h3 className="text-2xl sm:text-3xl font-cinzel text-tangled-cream font-medium tracking-widest">
            {credits.authorName}
          </h3>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-tangled-muted font-sans block mb-2">
            {credits.inspirationLabel}
          </span>
          <h4 className="text-xl sm:text-2xl font-cinzel text-tangled-gold tracking-widest uppercase">
            {credits.inspirationTitle}
          </h4>
          <p className="text-xs font-mono text-tangled-muted mt-1">
            Visual & Creative Inspiration: {credits.creativeInspiration}
          </p>
        </div>

        {/* Clear non-affiliation and creative attribution statement */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-lg mx-auto">
          <p className="text-xs font-sans text-tangled-muted/80 leading-relaxed font-light">
            {credits.disclaimer}
          </p>
        </div>
      </div>

      {/* 3. Closing Salute */}
      <div className="mt-16">
        <p className="text-sm font-cinzel tracking-[0.3em] text-tangled-gold uppercase">
          {credits.closingGreeting}
        </p>
        <p className="mt-2 text-xs font-mono text-tangled-muted/60 tracking-wider">
          © {new Date().getFullYear()} {credits.authorName} • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
