import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Systems from "@/components/sections/Systems";
import Philosophy from "@/components/sections/Philosophy";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-charcoal text-offwhite overflow-x-hidden relative">
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
