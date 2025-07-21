
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { LeadForm } from "@/components/home/LeadForm";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />
      <LeadForm />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
