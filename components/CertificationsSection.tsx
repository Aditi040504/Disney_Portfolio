"use client";

import React from "react";
import { PORTFOLIO_DATA, CertificationItem } from "@/lib/portfolio-data";

export default function CertificationsSection() {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <section
      id="certifications"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-5xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          ACCOLADES & HONORS
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream tracking-wide">
          Certifications & Accreditations
        </h2>
        <p className="text-base sm:text-lg font-cormorant italic text-tangled-muted mt-2">
          Recognized training from ISRO, Google, IBM SkillsBuild, Accenture, TCS iON, and Internshala
        </p>
      </div>

      {/* Cinematic Credit Roll Timeline */}
      <div className="space-y-4">
        {certifications.map((cert: CertificationItem, idx: number) => (
          <div
            key={idx}
            className="cinematic-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-tangled-purple/60 border border-tangled-gold/30 flex items-center justify-center text-tangled-gold text-sm font-cinzel flex-shrink-0">
                0{idx + 1}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-cinzel text-tangled-cream font-medium">
                  {cert.name}
                </h3>
                <span className="text-sm font-cormorant italic text-tangled-gold tracking-wide">
                  {cert.issuer}
                </span>
              </div>
            </div>

            <div className="sm:text-right pl-14 sm:pl-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-tangled-cream/80 bg-white/5 border border-white/10">
                {cert.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
