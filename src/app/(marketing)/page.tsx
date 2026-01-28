import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureSection } from "@/components/marketing/FeatureSection";
import { PhilosophySection } from "@/components/marketing/PhilosophySection";
import { CTASection } from "@/components/marketing/CTASection";

export default async function Home() {
  return (
    <>
      <HeroSection />
      
      <FeatureSection />

      <PhilosophySection />

      <CTASection />
    </>
  );
}
