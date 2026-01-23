import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RFQSection } from "@/components/home/RFQSection";

const Index = () => {
  return (
    <PublicLayout>
      <HeroSection />
      <HighlightsSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <RFQSection />
    </PublicLayout>
  );
};

export default Index;
