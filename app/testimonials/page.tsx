import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "Mumbai",
    image: "P",
    rating: 5,
    text: "After years of irregular periods, Healova's treatment plan regulated my cycle within 3 months. I finally feel like myself again!",
    result: "Regular periods restored",
    backgroundColor: "from-pink-100 to-rose-100",
  },
  {
    id: 2,
    name: "Ananya M.",
    location: "Bangalore",
    image: "A",
    rating: 5,
    text: "The doctors explained everything clearly and gave me a plan that worked. My acne has cleared significantly!",
    result: "Clear, glowing skin",
    backgroundColor: "from-purple-100 to-pink-100",
  },
  {
    id: 3,
    name: "Riya K.",
    location: "Delhi",
    image: "R",
    rating: 5,
    text: "Healova exceeded expectations. Expert care from home is amazing. I've lost 8kg in 4 months!",
    result: "Healthy weight achieved",
    backgroundColor: "from-blue-100 to-purple-100",
  },
  {
    id: 4,
    name: "Sneha R.",
    location: "Pune",
    image: "S",
    rating: 5,
    text: "The holistic approach made all the difference. The lifestyle guidance helped me make lasting changes.",
    result: "Transformed lifestyle",
    backgroundColor: "from-green-100 to-blue-100",
  },
  {
    id: 5,
    name: "Meera P.",
    location: "Jaipur",
    image: "M",
    rating: 5,
    text: "Consulting in Hindi was helpful! The doctor understood perfectly. My hormonal imbalance improved dramatically.",
    result: "Balanced hormones",
    backgroundColor: "from-yellow-100 to-orange-100",
  },
  {
    id: 6,
    name: "Nisha T.",
    location: "Hyderabad",
    image: "N",
    rating: 5,
    text: "Fast, professional, and caring. Prescription delivered within 24 hours and excellent follow-up support!",
    result: "Swift & personalized care",
    backgroundColor: "from-indigo-100 to-pink-100",
  },
  {
    id: 7,
    name: "Deepa V.",
    location: "Chennai",
    image: "D",
    rating: 5,
    text: "I was skeptical about online consultation, but Healova proved me wrong. The treatment is evidence-based and results-driven.",
    result: "Complete transformation",
    backgroundColor: "from-teal-100 to-green-100",
  },
  {
    id: 8,
    name: "Kavya M.",
    location: "Pune",
    image: "K",
    rating: 5,
    text: "The nutritional guidance combined with medicine really helped. I feel energized and healthy now!",
    result: "Energy & wellness restored",
    backgroundColor: "from-rose-100 to-pink-100",
  },
];

const stats = [
  {
    value: "10,000+",
    label: "Women Helped",
    icon: Heart,
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
    icon: Star,
  },
  {
    value: "50+",
    label: "Expert Doctors",
    icon: Heart,
  },
  {
    value: "85%",
    label: "See Improvement",
    icon: Star,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-semibold">Real Stories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Inspiring Journeys of{" "}
              <span className="text-pink-600">Healing & Hope</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Thousands of women have transformed their lives with Healova. Read
              their stories and discover how you can too.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
                  {stat.value}
                </div>
                <p className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className={`border-0 bg-gradient-to-br ${testimonial.backgroundColor} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group`}
                >
                  <CardContent className="pt-8 pb-6 px-6">
                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
                      "{testimonial.text}"
                    </p>

                    {/* Result Badge */}
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white/60 backdrop-blur text-gray-900 text-sm font-semibold rounded-full border border-white/80">
                        {testimonial.result}
                      </span>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/30">
                      <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-gray-900 font-bold text-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-700">
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

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Join Thousands of Women Who Found Their Way to Better Health
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Every woman's journey is unique, but they all share one thing in
              common: the courage to take control of their health and transform
              their lives with Healova's expert care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-white text-pink-600 font-bold text-lg rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Women Trust Healova
              </h2>
              <p className="text-lg text-gray-600">
                Our commitment to excellence, privacy, and personalized care
                makes us the preferred choice for PCOD/PCOS management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-pink-600 mb-4">
                  100%
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Confidential
                </h3>
                <p className="text-gray-600">
                  Your medical information is secure, encrypted, and
                  HIPAA-compliant.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-pink-600 mb-4">
                  24-48h
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Fast Turnaround
                </h3>
                <p className="text-gray-600">
                  Get your personalized treatment plan quickly without
                  compromising quality.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-pink-600 mb-4">
                  Expert
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Board-Certified
                </h3>
                <p className="text-gray-600">
                  All doctors are specialists with years of experience in
                  women's health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
