import { Button } from "@/components/ui/button";
import { ArrowDown, Heart } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/images/poster.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 sm:px-6 lg:px-24 py-20 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
          <span className="text-white text-sm font-medium">
            Trusted by 10,000+ Women
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          Reclaim <span className="text-pink-400">Your Health</span>,
          <br />
          Embrace Your Life
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-white font-semibold mb-8">
          Expert PCOD/PCOS Care That Actually Works
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500 mb-8">
          <Heart className="w-5 h-5 text-white" fill="currentColor" />
          <span className="text-white text-sm font-semibold">
            Specialized PCOD/PCOS Care
          </span>
        </div>

        <p className="text-base sm:text-lg text-white/90 mb-10 max-w-2xl leading-relaxed text-pretty">
          Thousands of women have regained control of their health with our
          evidence-based approach. Join a community that understands your
          journey.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <Button
            asChild
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link href="/consultation">
              Start Your Healing Journey
              <span className="ml-2">→</span>
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-full transition-all duration-300 bg-transparent"
          >
            <Link href="#about">Learn More </Link>
          </Button>
        </div>

        {/* <div className="absolute bottom-12 left-2/3  flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
            Scroll to Explore
          </span>
          <ArrowDown className="w-5 h-5 text-white/70" />
        </div> */}
      </div>
    </section>
  );
}
