import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Destinations } from "@/components/home/Destinations";
import { Manifesto } from "@/components/home/Manifesto";
import { Features } from "@/components/home/Features";
import { JournalPreview } from "@/components/home/JournalPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Destinations />
      <Manifesto />
      <JournalPreview />
      <Features />
      <Newsletter />
    </main>
  );
}