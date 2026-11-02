"use client";

import React from "react";
import { Cpu, ShieldCheck, Waves, Zap, Layers } from "lucide-react";

const features = [
  {
    icon: Cpu,
    category: "TRANSDUCER CORE",
    title: "Vapor-Deposited Titanium",
    description:
      "A pure titanium micro-lattice vapor-deposited onto a resilient silicone suspension. Resists diaphragm flexure at ultra-high SPL, preserving transient attacks with zero ringing.",
    metric: "40mm",
    metricLabel: "DIAPHRAGM DIAMETER",
  },
  {
    icon: ShieldCheck,
    category: "METALLURGY",
    title: "6061-T6 Aircraft Monocoque",
    description:
      "5-axis CNC machined from solid billets of aircraft-grade aluminum alloy. Bead-blasted and anodized with high-density ceramic molecules for lifelong acoustic rigidity.",
    metric: "0.01mm",
    metricLabel: "MACHINING ACCURACY",
  },
  {
    icon: Waves,
    category: "ACOUSTIC ENCLOSURE",
    title: "Dual Dampened Back-Chamber",
    description:
      "Twin micro-perforated acoustic resistance grids equalize internal air pressure in real-time, eliminating standing waves and isolating sub-bass frequencies down to 4Hz.",
    metric: "4Hz – 48kHz",
    metricLabel: "FREQUENCY RANGE",
  },
  {
    icon: Zap,
    category: "LOSSLESS TRANSMISSION",
    title: "Bit-Perfect Lossless Wireless",
    description:
      "Dedicated 2.4GHz proprietary ultra-wideband transmission delivers uncompressed 24-bit/192kHz audio with sub-12ms latency, plus Bluetooth 5.4 with LDAC and aptX Lossless.",
    metric: "< 12ms",
    metricLabel: "RF LATENCY",
  },
];

export default function EngineeringSection() {
  return (
    <section id="engineering" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
            <Layers className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
              STRUCTURAL ANATOMY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/95">
            Every Micron Considered.
          </h2>

          <p className="text-base text-white/60 leading-relaxed">
            Cadence was conceived not merely as consumer electronics, but as a precision acoustic transducer. Every screw, damping layer, and magnetic circuit serves pure sonic fidelity.
          </p>
        </div>

        {/* 4-Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl glass-panel hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                      <Icon className="w-5 h-5 text-white/90" />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
                      {feat.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium text-white/95 mb-3">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed mb-8 font-light">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-light text-white/95">
                    {feat.metric}
                  </span>
                  <span className="text-[11px] font-mono text-white/40 tracking-wider uppercase">
                    {feat.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
