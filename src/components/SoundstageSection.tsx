"use client";

import React, { useState, useEffect, useRef } from "react";
import { Radio } from "lucide-react";

interface SoundProfile {
  id: string;
  name: string;
  badge: string;
  description: string;
  subBass: string;
  mids: string;
  treble: string;
  harmonicFreq: string;
}

const profiles: SoundProfile[] = [
  {
    id: "reference",
    name: "Studio Reference",
    badge: "FLAT RESPONSE",
    description: "Unadulterated mastering-grade fidelity. Zero bass boost, linear mids, and surgically transparent high frequencies.",
    subBass: "+0.0 dB",
    mids: "Linear ±0.2 dB",
    treble: "Extended to 48kHz",
    harmonicFreq: "1.0x Unity",
  },
  {
    id: "spatial",
    name: "Spatial Binaural",
    badge: "360° IMMERSION",
    description: "Psychoacoustic head-related transfer function (HRTF) mapping creates an expansive 3D acoustic dome around you.",
    subBass: "+2.5 dB",
    mids: "Phase Aligned",
    treble: "HRTF Calibrated",
    harmonicFreq: "Surround Matrix",
  },
  {
    id: "432hz",
    name: "432Hz Pure Harmonic",
    badge: "ORGANIC TUNING",
    description: "Verdi's concert pitch calibration. Mathematical harmony based on golden ratio overtones to eliminate listening fatigue.",
    subBass: "+1.0 dB",
    mids: "Harmonic Warmth",
    treble: "Ultra Silk Rolloff",
    harmonicFreq: "432.0 Hz A-Concert",
  },
];

export default function SoundstageSection() {
  const [activeProfile, setActiveProfile] = useState<string>("spatial");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic audio waveform simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      phase += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw 3 layered harmonic sine waves
      const waves = [
        { amp: 28, freq: 0.015, speed: 1.0, color: "rgba(255, 255, 255, 0.8)", width: 2 },
        { amp: 16, freq: 0.03, speed: 1.4, color: "rgba(255, 255, 255, 0.35)", width: 1.5 },
        { amp: 8, freq: 0.06, speed: 2.1, color: "rgba(255, 255, 255, 0.15)", width: 1 },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * w.freq + phase * w.speed) * w.amp * (activeProfile === "spatial" ? 1.3 : activeProfile === "432hz" ? 0.9 : 1.1) +
            Math.cos(x * 0.008 + phase * 0.5) * 8;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeProfile]);

  const current = profiles.find((p) => p.id === activeProfile) || profiles[0];

  return (
    <section id="sound-experience" className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/[0.06]">
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
            <Radio className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/60">
              ACOUSTIC ARCHITECTURE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/95">
            A Soundstage Beyond Physical Boundaries.
          </h2>

          <p className="text-base text-white/60 leading-relaxed">
            Engineered with psychoacoustic spatial matrixing and 40mm titanium transducers. Cadence translates complex musical arrangements with millimeter-precise instrument placement.
          </p>
        </div>

        {/* Interactive Soundstage Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Waveform Monitor & Real-Time Vis */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-white/70 uppercase">
                  SPECTRAL WAVEFORM DYNAMICS
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/40 tracking-wider">
                REALTIME 48KHZ/24-BIT
              </span>
            </div>

            {/* Canvas Frequency Waveform */}
            <div className="relative w-full h-48 bg-black/40 rounded-2xl overflow-hidden border border-white/[0.05] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={700}
                height={200}
                className="w-full h-full block"
              />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/40">
                20Hz SUB
              </div>
              <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/40">
                48kHz AIR
              </div>
            </div>

            {/* Live Metrics readout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="block text-[10px] font-mono text-white/40 uppercase">Sub-Bass</span>
                <span className="text-sm font-medium text-white/90">{current.subBass}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="block text-[10px] font-mono text-white/40 uppercase">Midrange</span>
                <span className="text-sm font-medium text-white/90">{current.mids}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="block text-[10px] font-mono text-white/40 uppercase">Treble Extension</span>
                <span className="text-sm font-medium text-white/90">{current.treble}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="block text-[10px] font-mono text-white/40 uppercase">Tuning</span>
                <span className="text-sm font-medium text-white/90">{current.harmonicFreq}</span>
              </div>
            </div>
          </div>

          {/* Right: Sound Profiles Selector */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-2">
              SELECT SOUNDSTAGE MODE
            </span>

            {profiles.map((p) => {
              const isSelected = activeProfile === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProfile(p.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.08] border-white/30 shadow-[0_0_25px_-5px_rgba(255,255,255,0.08)]"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-medium text-white/95">{p.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isSelected
                          ? "bg-white text-black font-semibold"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{p.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
