import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-pink-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of women who've transformed their lives with
            personalized PCOD/PCOS care
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-50 px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/consultation">
              Start Your Free Consultation
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
