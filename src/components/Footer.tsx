"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] pt-20 pb-12 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.04]">
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2 bg-white/70 rounded-full" />
                  <span className="w-0.5 h-3.5 bg-white rounded-full" />
                  <span className="w-0.5 h-1.5 bg-white/60 rounded-full" />
                </div>
              </div>
              <span className="text-sm font-semibold tracking-[0.25em] uppercase text-white/95">
                CADENCE
              </span>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-light">
              Architectural acoustic deconstruction. Engineered from monocoque aerospace alloys, vapor-deposited titanium transducers, and psychoacoustic spatial fidelity.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-mono text-white/40 tracking-wider">
                ANECHOIC LAB 01 · CALIBRATION ACTIVE
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block">
              EXPERIENCE
            </span>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>
                <a href="#cadence-canvas-container" className="hover:text-white transition-colors">
                  Deconstruction
                </a>
              </li>
              <li>
                <a href="#sound-experience" className="hover:text-white transition-colors">
                  Soundstage
                </a>
              </li>
              <li>
                <a href="#engineering" className="hover:text-white transition-colors">
                  Engineering
                </a>
              </li>
              <li>
                <a href="#specs" className="hover:text-white transition-colors">
                  Specifications
                </a>
              </li>
              <li>
                <a href="#finishes" className="hover:text-white transition-colors">
                  Editions
                </a>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block">
              SPECS
            </span>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>40mm Titanium Core</li>
              <li>4Hz – 48kHz Range</li>
              <li>24-Bit / 192kHz RF</li>
              <li>48-Hr Playback</li>
              <li>6061-T6 Chassis</li>
            </ul>
          </div>

          {/* Back to top & Action */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white/70 hover:text-white text-xs font-mono tracking-wider transition-colors cursor-pointer"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <span className="text-[11px] font-mono text-white/30 tracking-wider pt-6 md:pt-0">
              DESIGNED FOR AUDIOPHILES
            </span>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <p>© {new Date().getFullYear()} CADENCE ACOUSTICS LABS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white/60 cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white/60 cursor-pointer">COMPLIANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

