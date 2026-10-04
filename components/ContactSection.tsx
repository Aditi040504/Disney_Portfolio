"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export default function ContactSection() {
  const { name, title, phone, email, location, linkedInUrl, gitHubUrl } =
    PORTFOLIO_DATA.contact;

  return (
    <section
      id="contact"
      className="relative z-30 min-h-screen py-32 px-6 sm:px-12 lg:px-24 flex flex-col justify-center max-w-5xl mx-auto section-atmosphere"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-tangled-gold font-sans font-semibold">
          THE FINAL SUMMONS
        </span>
        <span className="h-[1px] w-16 bg-tangled-gold/40" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-cinzel text-tangled-cream tracking-wide">
          Connect & Inquire
        </h2>
        <p className="text-base sm:text-lg font-cormorant italic text-tangled-muted mt-2">
          Available for innovative cloud infrastructure, AI-assisted engineering, and creative technology discussions
        </p>
      </div>

      {/* Atmospheric Contact Card */}
      <div className="cinematic-card p-8 sm:p-14 rounded-3xl relative overflow-hidden">
        {/* Lantern Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tangled-lantern/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <h3 className="text-2xl sm:text-4xl font-cinzel text-tangled-gold font-semibold mb-2">
              {name}
            </h3>
            <p className="text-sm sm:text-base font-cormorant italic text-tangled-cream/80 max-w-md">
              {title}
            </p>
            <p className="text-xs uppercase tracking-widest text-tangled-muted mt-2 font-mono">
              {location}
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4">
            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0914] border border-tangled-gold/20 hover:border-tangled-gold/60 transition-all duration-300 group block"
            >
              <div className="w-10 h-10 rounded-full bg-tangled-purple/50 flex items-center justify-center text-tangled-gold text-sm group-hover:scale-110 transition-transform">
                ✉
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-tangled-muted font-sans block">
                  Email Dispatch
                </span>
                <span className="text-sm sm:text-base font-mono text-tangled-cream group-hover:text-tangled-gold transition-colors">
                  {email}
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#0a0914] border border-tangled-gold/20 hover:border-tangled-gold/60 transition-all duration-300 group block"
            >
              <div className="w-10 h-10 rounded-full bg-tangled-purple/50 flex items-center justify-center text-tangled-gold text-sm group-hover:scale-110 transition-transform">
                ☎
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-tangled-muted font-sans block">
                  Direct Line
                </span>
                <span className="text-sm sm:text-base font-mono text-tangled-cream group-hover:text-tangled-gold transition-colors">
                  {phone}
                </span>
              </div>
            </a>

            {/* Social Profile Badges (Only clickable if actual URL configured) */}
            <div className="flex gap-3 pt-2">
              {linkedInUrl ? (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-tangled-purple/30 border border-white/10 hover:border-tangled-gold/40 text-xs uppercase tracking-widest text-tangled-warm font-sans transition-colors"
                >
                  LinkedIn
                </a>
              ) : (
                <div
                  className="flex-1 py-3 text-center rounded-xl bg-white/[0.03] border border-white/10 text-xs uppercase tracking-widest text-tangled-muted/60 font-sans cursor-default select-none"
                  title="URL to be configured"
                >
                  LinkedIn
                </div>
              )}

              {gitHubUrl ? (
                <a
                  href={gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-xl bg-tangled-purple/30 border border-white/10 hover:border-tangled-gold/40 text-xs uppercase tracking-widest text-tangled-warm font-sans transition-colors"
                >
                  GitHub
                </a>
              ) : (
                <div
                  className="flex-1 py-3 text-center rounded-xl bg-white/[0.03] border border-white/10 text-xs uppercase tracking-widest text-tangled-muted/60 font-sans cursor-default select-none"
                  title="URL to be configured"
                >
                  GitHub
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
