"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, SkillCategory } from "@/lib/portfolio-data";

export default function SkillsSection() {
  const { technicalSkills } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section
      id="skills"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-6xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          THE ENCHANTED REPERTOIRE
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream tracking-wide">
          Technical Skills & Craft
        </h2>
        <p className="text-base sm:text-lg font-cormorant italic text-tangled-muted mt-2">
          Languages, infrastructure automation, artificial intelligence, and visual design
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/10">
        {technicalSkills.map((cat: SkillCategory, idx: number) => {
          const isActive = idx === activeCategory;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? "bg-tangled-gold text-tangled-dark font-semibold shadow-[0_0_20px_rgba(230,179,102,0.4)]"
                  : "bg-[#0a0914]/80 text-tangled-cream/70 border border-white/10 hover:border-tangled-gold/40 hover:text-white"
              }`}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Active Category Illuminated Cluster */}
      <div className="cinematic-card p-8 sm:p-12 rounded-3xl relative overflow-hidden mb-12">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-tangled-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-cinzel text-tangled-gold font-semibold">
              {technicalSkills[activeCategory].category}
            </h3>
            <span className="text-xs font-mono text-tangled-muted">
              {technicalSkills[activeCategory].skills.length} Capabilities
            </span>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {technicalSkills[activeCategory].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="group relative px-5 py-3 rounded-2xl bg-[#0a0914] border border-tangled-gold/25 hover:border-tangled-gold/70 text-tangled-cream transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,179,102,0.2)] flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-tangled-gold/60 group-hover:bg-tangled-gold transition-colors duration-300" />
                <span className="text-sm sm:text-base font-sans font-medium tracking-wide">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Overview Grid for all categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {technicalSkills.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#0a0914]/50 border border-white/5 hover:border-tangled-gold/25 transition-all duration-300"
          >
            <h4 className="text-xs uppercase tracking-widest text-tangled-gold font-sans font-semibold mb-3">
              {cat.category}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-tangled-cream/80 font-sans"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
