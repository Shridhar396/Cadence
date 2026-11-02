import Navbar from "@/components/Navbar";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import SoundstageSection from "@/components/SoundstageSection";
import EngineeringSection from "@/components/EngineeringSection";
import FinishesSection from "@/components/FinishesSection";
import SpecsSection from "@/components/SpecsSection";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#050505] text-white/90 min-h-screen selection:bg-white/20 selection:text-white">
      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Core Scrollytelling Component: Sticky Canvas 400vh Exploded View Sequence */}
      <HeadphoneScroll frameCount={50} imageFolderPath="/ezgif-split" />

      {/* Interactive Soundstage & Waveform Dynamics */}
      <SoundstageSection />

      {/* Structural Anatomy & Engineering Bento Grid */}
      <EngineeringSection />

      {/* Material Architecture & Editions / Finishes Selector */}
      <FinishesSection />

      {/* Laboratory Benchmark Technical Specifications */}
      <SpecsSection />

      {/* Batch 01 Pre-Order & Serial Reservation */}
      <OrderSection />

      {/* Minimalist Audio Lab Footer */}
      <Footer />
    </main>
  );
}
