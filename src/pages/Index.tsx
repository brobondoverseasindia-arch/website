import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RFQSection } from "@/components/home/RFQSection";

const Index = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <WhyChooseUsSection />
      <LogoMarquee />
      <FeaturedProductsSection />
      <HighlightsSection />
      <StatsSection />
      <TestimonialsSection />
      <RFQSection />
    </PublicLayout>
  );
};

export default Index;
