# Cadence — High-End Scrollytelling Acoustic Landing Page

An Awwwards-level interactive scrollytelling experience engineered with **Next.js 14 (App Router)**, **Framer Motion**, and **HTML5 Canvas**.

The core mechanic is a scroll-linked 3D deconstruction sequence where the headphone disassembles and reassembles as the user scrolls, seamlessly blended into a pure `#050505` dark-mode canvas.

---

## 🎧 Features

- **Seamless Canvas Blending (`#050505`)**: Edge-feathering algorithms and radial vignette grading eliminate image boundaries for 100% immersive deconstruction.
- **Buttery 60/120fps Scroll Interpolation**: Powered by Framer Motion `useScroll` with linear damping (`lerp`) on HTML5 Canvas.
- **Responsive Contain-Fit & High-DPI Scaling**: Crisp rendering on mobile and 4K Retina screens with `window.devicePixelRatio`.
- **Preloader & Telemetry**: Luxury acoustic telemetry preloader with dynamic audio wave animation and progress feedback.
- **Deconstructed Hotspots**: Interactive inspection pins (`40mm Titanium Core` & `CNC Acoustic Enclosure`) at peak 60% disassembly.
- **Psychoacoustic Soundstage Visualizer**: Interactive canvas frequency waveform with 3 acoustic profile tunings (`Studio Reference`, `Spatial Binaural`, `432Hz Pure Harmonic`).
- **Architectural Material Selector**: Live finish preview for *Obsidian Dark*, *Lunar Silver*, and *Raw Champagne Titanium*.
- **Pre-Order & Reservation Modal**: Interactive Batch 01 reservation system with simulated serial code generation.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Rendering**: HTML5 Canvas (Hardware accelerated)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Shridhar396/Cadence.git
cd Cadence
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
├── public/
│   ├── ezgif-split/       # WebP deconstruction frames
│   └── sequence/          # High-fidelity JPG frames
├── src/
│   ├── app/
│   │   ├── globals.css    # Minimalist scrollbars, glassmorphism, vignette
│   │   ├── layout.tsx     # Typography, metadata, viewport configuration
│   │   └── page.tsx       # Flagship landing page assembly
│   └── components/
│       ├── Navbar.tsx             # Floating glass header & audio toggle
│       ├── HeadphoneScroll.tsx    # 400vh sticky canvas scrollytelling engine
│       ├── SoundstageSection.tsx  # Dynamic waveform canvas & audio modes
│       ├── EngineeringSection.tsx # 4-card structural anatomy bento grid
│       ├── FinishesSection.tsx    # Color edition selector with ambient halo
│       ├── SpecsSection.tsx       # Anechoic laboratory benchmark matrix
│       ├── OrderSection.tsx       # Pre-order module with interactive modal
│       └── Footer.tsx             # Minimal luxury audio lab footer
└── README.md
```

---

## 📄 License
MIT License. Built with precision for audiophiles and creative developers.
