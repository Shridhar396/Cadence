"use client";

import React, { useState } from "react";
import { SlidersHorizontal, BatteryCharging, Radio, Box } from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

interface SpecCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  items: SpecItem[];
}

const specCategories: SpecCategory[] = [
  {
    id: "acoustic",
    name: "Transducers & Acoustics",
    icon: SlidersHorizontal,
    items: [
      { label: "Driver Architecture", value: "40mm Custom Vapor-Deposited Titanium Diaphragm" },
      { label: "Magnetic Motor", value: "N52 Neodymium Dual-Gap Circuit (1.4 Tesla Flux)" },
      { label: "Frequency Range", value: "4 Hz – 48,000 Hz (Hi-Res Certified)" },
      { label: "Total Harmonic Distortion", value: "< 0.04% @ 1kHz, 100dB SPL" },
      { label: "Nominal Impedance", value: "32 Ohms (Passive Mode)" },
      { label: "Sensitivity", value: "104 dB SPL / 1mW @ 1kHz" },
    ],
  },
  {
    id: "wireless",
    name: "Lossless Connectivity",
    icon: Radio,
    items: [
      { label: "Ultra-Wideband RF", value: "Dedicated 2.4GHz Dongle (24-bit / 192kHz uncompressed)" },
      { label: "RF Latency", value: "< 11.8 ms Bit-Perfect Stream" },
      { label: "Bluetooth Protocol", value: "Bluetooth 5.4 with Multi-Point Pairing" },
      { label: "Supported Codecs", value: "LDAC, aptX Lossless, aptX Adaptive, AAC, SBC" },
      { label: "Wired Analog Inputs", value: "3.5mm & 6.35mm Balanced Oxygen-Free Copper" },
      { label: "Digital Audio Mode", value: "USB-C Asynchronous DAC (up to 32-bit / 384kHz DSD)" },
    ],
  },
  {
    id: "battery",
    name: "Power Architecture",
    icon: BatteryCharging,
    items: [
      { label: "Continuous Playback", value: "Up to 48 Hours (ANC Active, 50% Volume)" },
      { label: "Ultra-Fast Charge", value: "15 Minutes provides 8 Hours Playback" },
      { label: "Full Recharge Time", value: "65 Minutes via High-Bandwidth USB-C PD" },
      { label: "Battery Chemistry", value: "Dual Integrated 900mAh Solid-State Cells" },
      { label: "Smart Standby", value: "Optical Ear-Detection Auto Pause / Hibernate" },
    ],
  },
  {
    id: "physical",
    name: "Chassis & Ergonomics",
    icon: Box,
    items: [
      { label: "Chassis Metallurgy", value: "Billet 6061-T6 Aircraft-Grade CNC Aluminum" },
      { label: "Headband Suspension", value: "Floating Elastic Manganese Steel Ribbon" },
      { label: "Ear Cushions", value: "Viscoelastic High-Density Foam with Protein Lambskin" },
      { label: "Net Weight", value: "348 grams (Perfect 50/50 Balance Distribution)" },
      { label: "Environmental Rating", value: "IP54 Sweat & Micro-Particle Resistance" },
    ],
  },
];

export default function SpecsSection() {
  const [activeTab, setActiveTab] = useState<string>("acoustic");

  const currentCategory = specCategories.find((c) => c.id === activeTab) || specCategories[0];

  return (
    <section id="specs" className="relative py-32 bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
            <SlidersHorizontal className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
              LABORATORY BENCHMARK
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/95">
            Technical Specifications.
          </h2>

          <p className="text-base text-white/60 leading-relaxed">
            Transparent acoustic data measured in our anechoic chamber. No artificial loudness algorithms, just pure engineering fidelity.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-white/[0.08]">
          {specCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_-3px_rgba(255,255,255,0.3)]"
                    : "glass-panel text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Specs Table Matrix */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/[0.08]">
          <div className="divide-y divide-white/[0.06]">
            {currentCategory.items.map((item, idx) => (
              <div
                key={idx}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02] transition-colors rounded-xl px-4 -mx-4"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 sm:w-1/3">
                  {item.label}
                </span>
                <span className="text-sm md:text-base font-normal text-white/90 sm:w-2/3 sm:text-right">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

