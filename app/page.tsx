"use client";

import React, { useState } from "react";
import CinematicBackground from "@/components/CinematicBackground";
import CinematicHero from "@/components/CinematicHero";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import FinalCredits from "@/components/FinalCredits";
import SceneDecorations from "@/components/SceneDecorations";
import MusicToggle from "@/components/MusicToggle";
import { FRAME_CONFIG } from "@/lib/frame-utils";

// -----------------------------------------------------------------------------
// CONFIGURATION & DEVELOPMENT FLAGS
// -----------------------------------------------------------------------------
// Set to true to display frame counter and scroll percentage debug panel
const SHOW_DEBUG_UI = false;
// -----------------------------------------------------------------------------

export default function Home() {
  const [debugState, setDebugState] = useState({
    currentFrame: 1,
    targetFrame: 1,
    progress: 0,
  });

  return (
    <main className="relative min-h-screen text-[#e8e4dc] selection:bg-[#c9944d]/30 selection:text-[#fcedb3] overflow-x-hidden">
      {/* 1. GLOBAL CINEMATIC BACKGROUND CANVAS (Pinned behind all sections, progressing across entire page) */}
      <CinematicBackground
        onFrameUpdate={(currentFrame, targetFrame, progress) => {
          if (SHOW_DEBUG_UI) {
            setDebugState({ currentFrame, targetFrame, progress });
          }
        }}
      />

      {/* 2. SCENE DECORATIONS LAYER — flowers (frames 60–150) and lanterns (frames 370–1120)
              z-20: above canvas (z-0), below resume content (z-30)
              pointer-events-none: never intercepts clicks */}
      <SceneDecorations />

      {/* 3. PORTFOLIO CONTENT LAYER (Scrolling smoothly above the animated canvas world) */}
      <div className="relative z-10">
        {/* OPENING / IDENTITY */}
        <CinematicHero />

        {/* RESUME CHAPTERS & SECTIONS */}
        <div className="space-y-24 sm:space-y-36 pb-24">
          {/* SECTION 2: ABOUT / CAREER OBJECTIVE */}
          <AboutSection />

          {/* SECTION 3: EDUCATION */}
          <EducationSection />

          {/* SECTION 4: WORK EXPERIENCE */}
          <ExperienceSection />

          {/* SECTION 5: TECHNICAL SKILLS */}
          <SkillsSection />

          {/* SECTION 6: PROJECTS */}
          <ProjectsSection />

          {/* SECTION 7: CERTIFICATIONS */}
          <CertificationsSection />

          {/* SECTION 8: CONTACT */}
          <ContactSection />
        </div>

        {/* SECTION 9 & 10: FINAL CINEMATIC ENDING & POST-CREDITS */}
        <FinalCredits />
      </div>

      {/* 4. MUSIC TOGGLE — fixed bottom-left, z-50, independent of frame engine */}
      <MusicToggle />

      {/* 5. OPTIONAL DEVELOPMENT DEBUG PANEL */}
      {SHOW_DEBUG_UI && (
        <aside
          aria-label="Frame sequence debug panel"
          className="fixed bottom-4 right-4 z-50 bg-[#0a0914]/90 backdrop-blur-md border border-tangled-gold/20 text-tangled-cream font-mono text-xs px-3.5 py-2.5 rounded-lg shadow-2xl flex flex-col gap-1 pointer-events-none"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-tangled-muted">Frame:</span>
            <span className="font-semibold text-tangled-gold">
              {String(debugState.currentFrame).padStart(4, "0")} / {FRAME_CONFIG.totalFrames}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-tangled-muted">Scroll:</span>
            <span className="font-semibold text-emerald-400">
              {Math.round(debugState.progress * 100)}%
            </span>
          </div>
        </aside>
      )}
    </main>
  );
}
