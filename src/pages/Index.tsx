import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <AboutPreview />
      <ProjectsPreview />
      <InsightsPreview />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
