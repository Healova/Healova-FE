import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "After years of irregular periods, Healova's treatment plan regulated my cycle within 3 months. I finally feel like myself again!",
    author: "Priya S.",
    location: "Mumbai",
    initial: "P",
  },
  {
    text: "The doctors explained everything clearly and gave me a plan that worked. My acne has cleared significantly!",
    author: "Ananya M.",
    location: "Bangalore",
    initial: "A",
  },
  {
    text: "Healova exceeded expectations. Expert care from home is amazing. I've lost 8kg in 4 months!",
    author: "Riya K.",
    location: "Delhi",
    initial: "R",
  },
  {
    text: "The holistic approach made all the difference. The lifestyle guidance helped me make lasting changes.",
    author: "Sneha R.",
    location: "Pune",
    initial: "S",
  },
  {
    text: "Consulting in Hindi was helpful! The doctor understood perfectly. My hormonal imbalance improved dramatically.",
    author: "Meera P.",
    location: "Jaipur",
    initial: "M",
  },
  {
    text: "Fast, professional, and caring. Prescription delivered within 24 hours and excellent follow-up support!",
    author: "Nisha T.",
    location: "Hyderabad",
    initial: "N",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Real Stories of Hope & Healing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Hear from women who've transformed their health and reclaimed
              their lives with Healova
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:border-pink-300 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-pink-500 text-pink-500"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                      {testimonial.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
