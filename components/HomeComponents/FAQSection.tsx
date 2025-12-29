import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqs = [
  {
    id: "item-1",
    question: "What is the difference between PCOD and PCOS?",
    answer:
      "PCOD (Polycystic Ovarian Disease) is where ovaries release immature eggs that turn into cysts. PCOS (Polycystic Ovary Syndrome) is a metabolic disorder affecting how ovaries work, causing hormonal imbalances. PCOS is more severe with wider-ranging symptoms affecting overall health.",
  },
  {
    id: "item-2",
    question: "How does the consultation process work?",
    answer:
      "Fill out a detailed form with symptoms, medical history, and goals. Upload relevant reports if you have them. Our expert doctors review your case and create a personalized treatment plan delivered within 24-48 hours through the platform and WhatsApp.",
  },
  {
    id: "item-3",
    question: "Are the doctors qualified and certified?",
    answer:
      "Yes, all doctors are board-certified specialists in women's health, endocrinology, and PCOD/PCOS management with years of clinical experience. They stay current with latest research and treatment protocols.",
  },
  {
    id: "item-4",
    question: "How long does it take to see results?",
    answer:
      "Most women notice improvements within 3-6 months including regular periods, reduced acne, better weight management, and improved energy. Long-term commitment to treatment and lifestyle changes yields best outcomes.",
  },
  {
    id: "item-5",
    question: "Is my medical information secure?",
    answer:
      "Absolutely. We follow HIPAA-compliant security standards. All data is encrypted and never shared with third parties without your explicit consent.",
  },
  {
    id: "item-6",
    question: "Can I consult in my native language?",
    answer:
      "Yes! Submit your consultation in any language. Our multilingual platform ensures you communicate comfortably in your preferred language.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-rose-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Your Questions Answered
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about PCOD, PCOS, and our treatment
              approach
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-xl px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline text-left font-semibold text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-pink-600 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
