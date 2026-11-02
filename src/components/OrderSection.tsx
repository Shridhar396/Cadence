"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Truck, RotateCcw, Package, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("Obsidian Dark");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const randomCode = `CDN-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(randomCode);
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 300);
  };

  return (
    <section id="order-section" className="relative py-32 bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel-glow rounded-3xl p-8 md:p-14 border border-white/[0.1] relative overflow-hidden">
          {/* Subtle Corner Badge */}
          <div className="absolute top-8 right-8 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase">
              BATCH 01 · 250 UNITS
            </span>
          </div>

          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/70">
                LIMITED PRODUCTION RUN
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white/95">
              Secure Your Cadence.
            </h2>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-light">
              Each unit in Batch 01 is individually acoustic-calibrated and marked with an anechoic verification graph signed by our sound architect.
            </p>

            {/* Price Display */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-5xl sm:text-6xl font-light text-white tracking-tight">
                $499
              </span>
              <span className="text-sm font-mono text-white/40 uppercase tracking-widest">
                USD · FREE GLOBAL SHIPPING
              </span>
            </div>

            {/* In the box list */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                INCLUDED IN THE ARCHITECTURAL CASE:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/70">
                <div className="flex items-center gap-2.5">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span>Cadence Titanium Transducer Headphones</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span>CNC Anodized Magnetic Travel Case</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span>1.8m Silver-Plated OFC Cable (3.5mm/6.35mm)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span>2.4GHz Lossless RF Dongle + USB-C DAC Cable</span>
                </div>
              </div>
            </div>

            {/* Trigger Pre-order Button */}
            <div className="pt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-medium text-sm tracking-tight hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_35px_-5px_rgba(255,255,255,0.4)] cursor-pointer"
              >
                Reserve Cadence Now — $499
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-[11px] font-mono text-white/40 tracking-wider">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-white/60" />
                <span>EXPEDITED COURIER</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                <span>2-YEAR REPLACEMENT WARRANTY</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-white/60" />
                <span>30-DAY IN-STUDIO TRIAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg glass-panel-glow bg-[#0b0b0c] rounded-3xl p-8 border border-white/15 z-10 text-left shadow-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full bg-white/5 border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-1">
                      BATCH 01 ALLOCATION
                    </span>
                    <h3 className="text-2xl font-medium text-white/95">
                      Reserve Your Cadence
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      No immediate charge required. We will notify you 48 hours prior to batch dispatch.
                    </p>
                  </div>

                  <form onSubmit={handleReserve} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                        Preferred Edition Finish
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Obsidian Dark", "Lunar Silver", "Raw Titanium"].map((fin) => (
                          <button
                            type="button"
                            key={fin}
                            onClick={() => setSelectedFinish(fin)}
                            className={`p-2.5 rounded-xl border text-[11px] font-mono text-center transition-all ${
                              selectedFinish === fin
                                ? "bg-white text-black font-semibold border-white"
                                : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/20"
                            }`}
                          >
                            {fin}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                        Your Direct Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="collector@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-white text-black font-medium text-sm tracking-tight hover:bg-white/90 active:scale-95 transition-all shadow-lg"
                      >
                        Confirm Batch Reservation ($499)
                      </button>
                    </div>

                    <p className="text-[10px] text-white/40 text-center">
                      Zero deposit required today. Includes 30-day trial and 2-year warranty.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8 text-white stroke-[2.5]" />
                  </div>

                  <h3 className="text-2xl font-medium text-white/95">
                    Reservation Confirmed
                  </h3>

                  <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
                    You have secured a serial slot for the <span className="text-white">{selectedFinish}</span> edition in Batch 01.
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 inline-block">
                    <span className="block text-[10px] font-mono text-white/40 uppercase">
                      RESERVATION SERIAL CODE
                    </span>
                    <span className="text-lg font-mono font-medium text-white tracking-widest">
                      {reservationCode}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-white/40 pt-2">
                    A confirmation telemetry dispatch was scheduled to: {email}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-colors"
                    >
                      Return to Exploration
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

