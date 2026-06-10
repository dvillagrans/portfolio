import Navbar from "@/components/layout/Navbar";
import ScrollProgressRail from "@/components/layout/ScrollProgressRail";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Systems from "@/components/sections/Systems";
import Philosophy from "@/components/sections/Philosophy";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import { SectionHueOrchestrator } from "@/components/ui/SectionHueOrchestrator";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen w-full overflow-x-hidden relative pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} tabIndex={-1}>
      <SectionHueOrchestrator />
      <ScrollProgressRail />
      <Navbar />
      <Hero />
      <FeaturedWork />
      <Marquee />
      <Systems />
      <Philosophy />
      <Stack />
      <Contact />
    </main>
  );
}
