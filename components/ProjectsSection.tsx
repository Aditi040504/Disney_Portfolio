"use client";

import React from "react";
import { PORTFOLIO_DATA, ProjectItem } from "@/lib/portfolio-data";

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section
      id="projects"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-6xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          THE TALES OF CREATION
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream tracking-wide">
          Featured Projects
        </h2>
        <p className="text-base sm:text-lg font-cormorant italic text-tangled-muted mt-2">
          Full-stack architectures, AI assistance engines, desktop applications, and intelligent diagnostics
        </p>
      </div>

      {/* Chapters Storybook Stream */}
      <div className="space-y-16">
        {projects.map((project: ProjectItem) => (
          <article
            key={project.id}
            className="cinematic-card rounded-3xl p-8 sm:p-14 relative overflow-hidden transition-all duration-300 group"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-tangled-purple/15 rounded-full blur-3xl pointer-events-none group-hover:bg-tangled-lantern/15 transition-colors duration-500" />

            <div className="relative z-10">
              {/* Header: Chapter Index & Duration */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-tangled-gold font-bold">
                    {project.chapterNumber}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-tangled-gold/40" />
                  <span className="text-xs font-mono text-tangled-muted">
                    {project.duration}
                  </span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-tangled-purple/40 text-tangled-warm border border-tangled-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Summary */}
              <h3 className="text-2xl sm:text-4xl font-cinzel text-tangled-cream font-semibold mb-3">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg font-cormorant italic text-tangled-glow/90 mb-8 max-w-3xl">
                {project.summary}
              </p>

              {/* Achievement Highlights (Direct from Resume) */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-tangled-muted font-sans block font-semibold">
                  Key Achievements & Implementation Details
                </span>

                <div className="grid grid-cols-1 gap-3">
                  {project.achievements.map((ach, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-[#0a0914]/60 border border-white/5"
                    >
                      <span className="text-tangled-gold text-sm font-serif mt-0.5">
                        ✦
                      </span>
                      <p className="text-sm font-sans text-tangled-cream/85 leading-relaxed font-light">
                        {ach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
