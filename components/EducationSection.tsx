"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function EducationSection() {
  const { degree, duration, university, institute, location, honors } = PORTFOLIO_DATA.education;

  return (
    <section
      id="education"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-5xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          FOUNDATION
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream mb-16 tracking-wide">
        Academic Heritage
      </h2>

      {/* Storybook Illuminated Scroll / Card */}
      <div className="relative cinematic-card p-8 sm:p-14 rounded-3xl overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-tangled-purple/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-tangled-gold/15 pb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-tangled-gold bg-tangled-gold/10 border border-tangled-gold/20 mb-4">
              {duration}
            </span>
            <h3 className="text-2xl sm:text-4xl font-cinzel text-tangled-cream font-semibold mb-2">
              {degree}
            </h3>
            <p className="text-lg font-cormorant italic text-tangled-warm">
              {institute}
            </p>
          </div>

          <div className="md:text-right flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-tangled-muted mb-1 font-sans">
              Affiliation
            </span>
            <p className="text-sm font-sans text-tangled-cream/90 font-medium max-w-xs">
              {university}
            </p>
            <p className="text-xs text-tangled-muted mt-1">{location}</p>
          </div>
        </div>

        {/* Honors Distinction Badge */}
        <div className="pt-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-tangled-gold/15 border border-tangled-gold/40 flex items-center justify-center text-tangled-gold text-sm font-serif">
              ✦
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-tangled-muted font-sans block">
                Academic Standing
              </span>
              <span className="text-base sm:text-lg font-cinzel font-medium text-tangled-gold">
                {honors}
              </span>
            </div>
          </div>

          <div className="text-xs text-tangled-muted font-mono tracking-wider">
            Satara, Maharashtra • 2021 – 2025
          </div>
        </div>
      </div>
    </section>
  );
}
