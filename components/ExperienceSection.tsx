"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function ExperienceSection() {
  const { role, company, duration, highlights } = PORTFOLIO_DATA.experience;

  return (
    <section
      id="experience"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-6xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          CHRONICLE OF PRACTICE
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream tracking-wide">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg font-cormorant italic text-tangled-muted mt-2">
            Enterprise cloud operations, vulnerability remediation, and application stability
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tangled-purple/40 border border-tangled-gold/30">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-tangled-cream">
            Active Milestone
          </span>
        </div>
      </div>

      {/* Main Experience Showcase Card */}
      <div className="relative cinematic-card rounded-3xl p-8 sm:p-14 overflow-hidden mb-8">
        {/* Ambient illumination */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tangled-lantern/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-tangled-gold/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl sm:text-3xl font-cinzel font-bold text-tangled-gold">
                {company}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-tangled-gold/15 text-tangled-warm font-mono border border-tangled-gold/30">
                Global Technology
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel text-tangled-cream font-medium">
              {role}
            </h3>
          </div>

          <div className="lg:text-right">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-tangled-gold bg-tangled-dark border border-tangled-gold/30">
              {duration}
            </span>
          </div>
        </div>

        {/* Milestone Responsibilities & Achievements Timeline */}
        <div className="relative z-10 pt-10">
          <h4 className="text-xs uppercase tracking-[0.25em] text-tangled-muted font-sans mb-8 font-semibold">
            Key Contributions & Core Responsibilities
          </h4>

          <div className="space-y-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 p-5 rounded-xl bg-[#0a0914]/60 border border-white/5 hover:border-tangled-gold/30 transition-all duration-300"
              >
                {/* Glowing step marker */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tangled-purple/80 border border-tangled-gold/40 flex items-center justify-center text-tangled-gold text-xs font-mono font-bold mt-0.5 shadow-[0_0_15px_rgba(230,179,102,0.2)]">
                  0{idx + 1}
                </div>

                <p className="text-sm sm:text-base font-sans text-tangled-cream/90 leading-relaxed font-light">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
