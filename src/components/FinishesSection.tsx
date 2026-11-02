"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";

interface Finish {
  id: string;
  name: string;
  subtitle: string;
  swatchColor: string;
  accentGlow: string;
  chassis: string;
  earcushion: string;
  description: string;
}

const finishes: Finish[] = [
  {
    id: "obsidian",
    name: "Obsidian Dark",
    subtitle: "PVD DEEP MATTE",
    swatchColor: "#111112",
    accentGlow: "rgba(255, 255, 255, 0.05)",
    chassis: "Ceramic PVD Matte Black Aluminum",
    earcushion: "Perforated Black Protein Lambskin",
    description: "An understated, non-reflective obsidian finish engineered through high-pressure physical vapor deposition.",
  },
  {
    id: "lunar",
    name: "Lunar Silver",
    subtitle: "BEAD-BLASTED RAW",
    swatchColor: "#C4C8CC",
    accentGlow: "rgba(196, 200, 204, 0.08)",
    chassis: "Natural Satin Anodized 6061 Alloy",
    earcushion: "Ash Grey Acoustic Memory Foam",
    description: "Pure metallurgical honesty. Fine glass bead-blasted raw aluminum with bright-cut bevel accents.",
  },
  {
    id: "titanium",
    name: "Raw Champagne Titanium",
    subtitle: "BRUSHED LIMITED RUN",
    swatchColor: "#D1C3A5",
    accentGlow: "rgba(209, 195, 165, 0.1)",
    chassis: "Hand-Brushed Grade 5 Titanium",
    earcushion: "Espresso Italian Calfskin",
    description: "Individually numbered boutique edition featuring hand-brushed Grade 5 titanium yokes with warm champagne undertones.",
  },
];

export default function FinishesSection() {
  const [selectedFinish, setSelectedFinish] = useState<Finish>(finishes[0]);

  return (
    <section id="finishes" className="relative py-32 bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
            <Sparkles className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
              MATERIAL ARCHITECTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/95">
            Three Architectural Finishes.
          </h2>

          <p className="text-base text-white/60 leading-relaxed">
            Crafted for decades of tactile satisfaction. Each edition receives individual acoustic calibration and metallurgical inspection before leaving the lab.
          </p>
        </div>

        {/* Interactive Finishes Card */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Showcase Panel */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[340px] rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent p-8 border border-white/[0.04]">
            {/* Ambient halo glow based on selected finish */}
            <div
              className="absolute w-72 h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: selectedFinish.accentGlow }}
            />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div
                className="w-24 h-24 rounded-full border-2 border-white/30 shadow-2xl transition-all duration-500 flex items-center justify-center"
                style={{ backgroundColor: selectedFinish.swatchColor }}
              >
                <span className="w-8 h-8 rounded-full border border-white/20 bg-white/10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 block">
                  {selectedFinish.subtitle}
                </span>
                <h3 className="text-3xl font-medium text-white/95 mt-1">
                  {selectedFinish.name}
                </h3>
              </div>

              <p className="text-sm text-white/60 max-w-md leading-relaxed font-light">
                {selectedFinish.description}
              </p>
            </div>
          </div>

          {/* Configuration and Swatch Selector */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-4">
                CHOOSE EDITION
              </span>

              <div className="space-y-3">
                {finishes.map((f) => {
                  const isCurrent = selectedFinish.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-white/[0.08] border-white/40 shadow-lg"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-6 h-6 rounded-full border border-white/30 shadow-sm inline-block"
                          style={{ backgroundColor: f.swatchColor }}
                        />
                        <div className="text-left">
                          <span className="block text-sm font-medium text-white/90">
                            {f.name}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                            {f.subtitle}
                          </span>
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Specs */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-white/40 uppercase">Chassis Metallurgy</span>
                <span className="text-white/80">{selectedFinish.chassis}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-white/40 uppercase">Earcup Cushion</span>
                <span className="text-white/80">{selectedFinish.earcushion}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-white/40 uppercase">Acoustic Tuning</span>
                <span className="text-white/80">Matched ±0.3dB Pair Calibration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

