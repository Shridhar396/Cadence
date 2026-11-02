"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Disc3, Sparkles, ChevronDown } from "lucide-react";

interface HeadphoneScrollProps {
  frameCount?: number;
  imageFolderPath?: string;
}

export default function HeadphoneScroll({
  frameCount = 50,
  imageFolderPath = "/ezgif-split",
}: HeadphoneScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activePin, setActivePin] = useState<string | null>(null);

  // Scroll progress through the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Story transform thresholds for fading and translation
  // Phase 1: 0% scroll (0.00 - 0.20)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.2], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);
  const titleScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96]);

  // Phase 2: 30% scroll (0.22 - 0.44)
  const p2Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.36, 0.44], [0, 1, 1, 0]);
  const p2X = useTransform(scrollYProgress, [0.22, 0.28, 0.36, 0.44], [-30, 0, 0, -30]);

  // Phase 3: 60% scroll (0.50 - 0.74)
  const p3Opacity = useTransform(scrollYProgress, [0.5, 0.56, 0.66, 0.74], [0, 1, 1, 0]);
  const p3X = useTransform(scrollYProgress, [0.5, 0.56, 0.66, 0.74], [30, 0, 0, 30]);

  // Phase 4: 90% scroll (0.80 - 1.00)
  const p4Opacity = useTransform(scrollYProgress, [0.8, 0.88, 1], [0, 1, 1]);
  const p4Y = useTransform(scrollYProgress, [0.8, 0.9, 1], [40, 0, 0]);
  const p4Scale = useTransform(scrollYProgress, [0.8, 0.9, 1], [0.96, 1, 1]);

  // HUD Progress indicator value
  const progressPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [displayPercent, setDisplayPercent] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = progressPercent.on("change", (latest) => {
      setDisplayPercent(Math.round(latest));
    });
    return () => unsubscribe();
  }, [progressPercent]);

  // Preload image sequence with automatic fallback
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let counter = 0;

    const pad3 = (num: number) => String(num).padStart(3, "0");

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Primary: webp from ezgif-split with 3-digit padding (frame_000_delay-0.04s.webp)
      const primarySrc = `${imageFolderPath}/frame_${pad3(i)}_delay-0.04s.webp`;
      const fallbackSrc1 = `${imageFolderPath}/frame_${i}_delay-0.04s.webp`;
      const fallbackSrc2 = `/sequence/ezgif-frame-${pad3(i + 1)}.jpg`;

      const onImageLoaded = () => {
        if (isCancelled) return;
        loadedImages[i] = img;
        counter++;
        setLoadedCount(counter);
        if (counter === frameCount) {
          setImages(loadedImages);
          setTimeout(() => setIsLoading(false), 250);
        }
      };

      img.onload = onImageLoaded;

      img.onerror = () => {
        // Try unpadded webp
        img.onerror = () => {
          // Try sequence jpg
          img.onerror = () => {
            if (isCancelled) return;
            counter++;
            setLoadedCount(counter);
            if (counter === frameCount) {
              setImages(loadedImages);
              setIsLoading(false);
            }
          };
          img.src = fallbackSrc2;
        };
        img.src = fallbackSrc1;
      };

      img.src = primarySrc;
    }

    return () => {
      isCancelled = true;
    };
  }, [frameCount, imageFolderPath]);

  // Canvas drawing routine with contain-fit, DPI scaling, and edge-blending
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = images[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Handle canvas resize
      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Fill background with exact brand deep dark #050505
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Compute aspect ratio contain-fit
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = displayWidth / displayHeight;
      let renderW = displayWidth;
      let renderH = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      // Fit mode: contain
      if (canvasRatio > imgRatio) {
        renderH = displayHeight;
        renderW = displayHeight * imgRatio;
        offsetX = (displayWidth - renderW) / 2;
        offsetY = 0;
      } else {
        renderW = displayWidth;
        renderH = displayWidth / imgRatio;
        offsetX = 0;
        offsetY = (displayHeight - renderH) / 2;
      }

      // Draw the image onto the canvas
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

      // Subtle edge feathering gradient on the image perimeter to blend any edge compression seamlessly
      const borderFeather = 16;
      // Top feather
      const gradTop = ctx.createLinearGradient(0, offsetY, 0, offsetY + borderFeather);
      gradTop.addColorStop(0, "#050505");
      gradTop.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = gradTop;
      ctx.fillRect(offsetX, offsetY, renderW, borderFeather);

      // Bottom feather
      const gradBottom = ctx.createLinearGradient(0, offsetY + renderH - borderFeather, 0, offsetY + renderH);
      gradBottom.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradBottom.addColorStop(1, "#050505");
      ctx.fillStyle = gradBottom;
      ctx.fillRect(offsetX, offsetY + renderH - borderFeather, renderW, borderFeather);

      // Left feather
      const gradLeft = ctx.createLinearGradient(offsetX, 0, offsetX + borderFeather, 0);
      gradLeft.addColorStop(0, "#050505");
      gradLeft.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = gradLeft;
      ctx.fillRect(offsetX, offsetY, borderFeather, renderH);

      // Right feather
      const gradRight = ctx.createLinearGradient(offsetX + renderW - borderFeather, 0, offsetX + renderW, 0);
      gradRight.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradRight.addColorStop(1, "#050505");
      ctx.fillStyle = gradRight;
      ctx.fillRect(offsetX + renderW - borderFeather, offsetY, borderFeather, renderH);

      ctx.restore();
    },
    [images]
  );

  // Smooth interpolation using requestAnimationFrame + lerp
  useEffect(() => {
    if (images.length === 0) return;

    let animationFrameId: number;
    let currentProgress = 0;
    let targetProgress = 0;

    // Listen to scroll changes
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      targetProgress = latest;
    });

    const loop = () => {
      // Linear interpolation (lerp) for 60/120fps buttery smooth animation
      const diff = targetProgress - currentProgress;
      currentProgress += diff * 0.12;

      if (Math.abs(diff) < 0.0001) {
        currentProgress = targetProgress;
      }

      // Progress mapping:
      // 0% -> 60%: Explode from frame 0 to frameCount - 1 (Disassembly)
      // 60% -> 95%: Reassemble from frameCount - 1 back to frame 0
      let frameIndex = 0;
      const maxIndex = images.length - 1;

      if (currentProgress <= 0.6) {
        const ratio = Math.max(0, currentProgress / 0.6);
        frameIndex = Math.min(maxIndex, Math.floor(ratio * maxIndex));
      } else {
        const ratio = Math.min(1, Math.max(0, (currentProgress - 0.6) / 0.35));
        frameIndex = Math.min(maxIndex, Math.max(0, Math.floor((1 - ratio) * maxIndex)));
      }

      drawFrame(frameIndex);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, scrollYProgress, drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) {
        drawFrame(0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, drawFrame]);

  const scrollToNext = () => {
    if (!containerRef.current) return;
    const scrollTarget = window.innerHeight * 1.2;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      id="cadence-canvas-container"
      className="relative w-full h-[400vh] bg-[#050505]"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
              {/* Animated Cadence Brand Emblem */}
              <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-25" />
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-white/80 rounded-full animate-soundwave-1" />
                    <span className="w-1 h-6 bg-white rounded-full animate-soundwave-2" />
                    <span className="w-1 h-8 bg-white rounded-full animate-soundwave-3" />
                    <span className="w-1 h-5 bg-white rounded-full animate-soundwave-4" />
                    <span className="w-1 h-3 bg-white/80 rounded-full animate-soundwave-5" />
                  </div>
                </div>
              </div>

              {/* Brand Title */}
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50 mb-2">
                CADENCE ACOUSTICS
              </span>
              <h2 className="text-xl font-light tracking-tight text-white/90 mb-4">
                Calibrating Transducers
              </h2>

              {/* Progress Bar */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/40 via-white to-white/70"
                  style={{
                    width: `${Math.round((loadedCount / frameCount) * 100)}%`,
                  }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <span className="text-[11px] font-mono text-white/40 tracking-wider">
                {Math.round((loadedCount / frameCount) * 100)}% LOADED
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport (100vh, sticky top-0) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background glow ambiance */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/[0.03] to-transparent blur-3xl animate-subtle-pulse" />
        </div>

        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full block object-contain select-none"
        />

        {/* Edge Vignette Overlay ensuring seamless zero-edge immersion */}
        <div className="absolute inset-0 z-20 vignette-overlay" />

        {/* HUD Telemetry Overlay (Awwwards Polish) */}
        <div className="absolute top-24 left-6 md:left-12 z-30 pointer-events-none hidden sm:flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90" />
          </span>
          <span className="text-[11px] font-mono text-white/50 tracking-[0.2em] uppercase">
            3D SPATIAL DECONSTRUCTION
          </span>
        </div>

        {/* Scroll Progress Readout on Right Edge */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4 pointer-events-none">
          <div className="h-32 w-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="w-full bg-white/80"
              style={{
                height: `${displayPercent}%`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-white/40 tracking-widest [writing-mode:vertical-rl] rotate-180">
            FRAME PROGRESS {displayPercent}%
          </span>
        </div>

        {/* Interactive Floating Hotspots at 60% Explosion Phase */}
        <AnimatePresence>
          {displayPercent >= 48 && displayPercent <= 72 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-30 pointer-events-auto max-w-7xl mx-auto px-6"
            >
              {/* Pin 1: Driver Diaphragm */}
              <div className="absolute top-[38%] left-[24%] md:left-[28%]">
                <button
                  onClick={() => setActivePin(activePin === "driver" ? null : "driver")}
                  className="group relative flex items-center gap-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  title="Titanium Vapor Diaphragm"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-mono tracking-wider text-white/80 pr-2 hidden sm:inline">
                    40MM TITANIUM CORE
                  </span>
                </button>
                {activePin === "driver" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute left-0 top-10 w-64 p-3 rounded-xl glass-panel-glow z-40 text-left"
                  >
                    <p className="text-xs font-semibold text-white/95 mb-1">
                      Vapor-Deposited Diaphragm
                    </p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Micro-textured for near-zero modal break-up and lightning transient recovery.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Pin 2: Acoustic Chamber */}
              <div className="absolute bottom-[40%] right-[22%] md:right-[26%]">
                <button
                  onClick={() => setActivePin(activePin === "chamber" ? null : "chamber")}
                  className="group relative flex items-center gap-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                  title="Resonance Control Enclosure"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-mono tracking-wider text-white/80 pr-2 hidden sm:inline">
                    CNC ACOUSTIC ENCLOSURE
                  </span>
                </button>
                {activePin === "chamber" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 top-10 w-64 p-3 rounded-xl glass-panel-glow z-40 text-left"
                  >
                    <p className="text-xs font-semibold text-white/95 mb-1">
                      Acoustic Back-Chamber
                    </p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Calibrated dual air-dampers eliminate standing waves and ear-canal fatigue.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            STORY TEXT OVERLAYS (Tied to Framer Motion useScroll progress)
            ========================================================================= */}

        {/* ---------------- 0% Scroll: Centered Title ---------------- */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-between py-24 md:py-28 px-6 text-center"
        >
          {/* Subtle series tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/70">
              CADENCE · SERIES 1
            </span>
          </motion.div>

          {/* Main Hero Title */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white/90">
              Cadence.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white/60">
              Pure Sound.
            </p>
            <p className="text-sm md:text-base text-white/40 max-w-md mx-auto pt-2 font-normal">
              An architectural exploration in transient fidelity and pure acoustic presence.
            </p>
          </div>

          {/* Scroll Cue Button */}
          <div className="pointer-events-auto">
            <button
              onClick={scrollToNext}
              className="group flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase">
                SCROLL TO DECONSTRUCT
              </span>
              <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-white/50 transition-colors">
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-2.5 rounded-full bg-white/70"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* ---------------- 30% Scroll: Left Aligned ---------------- */}
        <motion.div
          style={{ opacity: p2Opacity, x: p2X }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-start max-w-7xl mx-auto px-6 md:px-16"
        >
          <div className="max-w-md lg:max-w-lg space-y-4 text-left pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
              <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">
                01 / ARCHITECTURE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/90 leading-tight">
              Precision Engineering.
            </h2>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Milled from a single billet of aerospace-grade anodized aluminum. Every seam is sealed to 0.01mm tolerance to eliminate microscopic air leakage and parasitic resonances before sound reaches the ear canal.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl glass-panel">
                <span className="block text-xl font-light text-white/90">0.01mm</span>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  MACHINED TOLERANCE
                </span>
              </div>
              <div className="p-3.5 rounded-xl glass-panel">
                <span className="block text-xl font-light text-white/90">6061-T6</span>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  AEROSPACE ALLOY
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- 60% Scroll: Right Aligned ---------------- */}
        <motion.div
          style={{ opacity: p3Opacity, x: p3X }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-end max-w-7xl mx-auto px-6 md:px-16"
        >
          <div className="max-w-md lg:max-w-lg space-y-4 text-left md:text-right pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
              <Cpu className="w-3.5 h-3.5 text-white/70" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">
                02 / ACOUSTIC TRANSDUCTION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/90 leading-tight">
              Titanium Drivers.
            </h2>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              At the core lies our custom 40mm vapor-deposited titanium diaphragm suspended in low-damping Japanese silicone. Revealing sub-bass textures and crystalline upper harmonics with zero acoustic coloration.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-left">
              <div className="p-3.5 rounded-xl glass-panel">
                <span className="block text-xl font-light text-white/90">4Hz – 48kHz</span>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  FREQUENCY RESPONSE
                </span>
              </div>
              <div className="p-3.5 rounded-xl glass-panel">
                <span className="block text-xl font-light text-white/90">&lt; 0.05%</span>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  TOTAL HARMONIC DISTORTION
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------------- 90% Scroll: Centered CTA ---------------- */}
        <motion.div
          style={{ opacity: p4Opacity, y: p4Y, scale: p4Scale }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel">
              <Disc3 className="w-3.5 h-3.5 text-white/80" />
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/70">
                THE REASSEMBLED MASTERPIECE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-white/95">
              Hear Everything.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-xl mx-auto font-light leading-relaxed">
              The headphone reassembles into an immaculate acoustic instrument. Unrivaled clarity, lossless wireless transmission, and total auditory immersion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#order-section"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium text-sm tracking-tight hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
              >
                Reserve Cadence — $499
              </a>
              <a
                href="#specs"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white/80 hover:text-white hover:border-white/20 font-medium text-sm tracking-tight transition-all"
              >
                Explore Full Specifications
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-[12px] font-mono text-white/40 tracking-wider">
              <span>LIMITED FIRST BATCH</span>
              <span>·</span>
              <span>GLOBAL 2-YEAR WARRANTY</span>
              <span>·</span>
              <span>RISK-FREE 30-DAY TRIAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
