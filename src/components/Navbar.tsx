"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.04] group-hover:border-white/50 transition-colors">
            <div className="flex items-center gap-0.5">
              <span className="w-0.5 h-2 bg-white/70 rounded-full group-hover:h-3 transition-all" />
              <span className="w-0.5 h-3.5 bg-white rounded-full group-hover:h-4 transition-all" />
              <span className="w-0.5 h-1.5 bg-white/60 rounded-full group-hover:h-2.5 transition-all" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-[0.25em] uppercase text-white/95">
            CADENCE
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-white/60">
          <a href="#cadence-canvas-container" className="hover:text-white transition-colors">
            Acoustic Deconstruction
          </a>
          <a href="#sound-experience" className="hover:text-white transition-colors">
            Soundstage
          </a>
          <a href="#engineering" className="hover:text-white transition-colors">
            Engineering
          </a>
          <a href="#specs" className="hover:text-white transition-colors">
            Specifications
          </a>
          <a href="#finishes" className="hover:text-white transition-colors">
            Editions
          </a>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-4">
          {/* Ambient Frequency Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-[11px] font-mono tracking-wider text-white/60 hover:text-white transition-all cursor-pointer"
            title={soundEnabled ? "Mute Ambient Frequency" : "Enable 432Hz Ambient Acoustic"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span className="text-white">432Hz ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span>AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Reserve CTA Button */}
          <a
            href="#order-section"
            className="px-5 py-2 rounded-full bg-white text-black font-medium text-xs tracking-tight hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_-3px_rgba(255,255,255,0.3)]"
          >
            Reserve
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-sm font-mono tracking-wider uppercase text-white/70">
            <a
              href="#cadence-canvas-container"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Acoustic Deconstruction
            </a>
            <a
              href="#sound-experience"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Soundstage
            </a>
            <a
              href="#engineering"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Engineering
            </a>
            <a
              href="#specs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Specifications
            </a>
            <a
              href="#finishes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white"
            >
              Editions
            </a>
            <a
              href="#order-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-bold"
            >
              Pre-Order Cadence ($499)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
