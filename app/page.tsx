import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  HeroSection,
  StatsSection,
  AboutSection,
  WhyChooseUsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
  BrandSection,
} from "@/components/HomeComponents";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <div className="py-24 bg-rose-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <AboutSection />
            <div className="mt-20">
              <WhyChooseUsSection />
            </div>
          </div>
        </div>
      </div>
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <BrandSection />
      <Footer />
    </div>
  );
}
