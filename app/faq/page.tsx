import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Find answers to common questions about PCOD, PCOS, and our treatment approach.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="max-w-3xl mx-auto space-y-8">
            {/* About PCOD/PCOS */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About PCOD & PCOS</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the difference between PCOD and PCOS?</AccordionTrigger>
                  <AccordionContent>
                    PCOD (Polycystic Ovarian Disease) is a condition where the ovaries release immature or partially
                    mature eggs, which eventually turn into cysts. PCOS (Polycystic Ovary Syndrome) is a metabolic
                    disorder that affects how the ovaries work, causing hormonal imbalances. PCOS is more severe and
                    includes a wider range of symptoms affecting overall health.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the common symptoms?</AccordionTrigger>
                  <AccordionContent>
                    Common symptoms include irregular or missed periods, excessive facial or body hair growth, acne,
                    weight gain (especially around the abdomen), thinning hair or hair loss, darkening of skin,
                    fertility issues, and mood changes. Symptoms can vary significantly between individuals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can PCOD/PCOS be cured?</AccordionTrigger>
                  <AccordionContent>
                    While there is no permanent cure, PCOD and PCOS can be effectively managed through lifestyle
                    changes, medication, and proper medical care. Many women successfully manage their symptoms and lead
                    healthy lives. Early diagnosis and consistent treatment are key to preventing long-term
                    complications.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* About Our Platform */}
            <div>
              <h2 className="text-2xl font-bold mb-4">About Our Platform</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-4">
                  <AccordionTrigger>How does the consultation process work?</AccordionTrigger>
                  <AccordionContent>
                    After signing up, you'll fill out a comprehensive consultation form with your symptoms, medical
                    history, and health goals. You can also upload relevant medical reports. Our expert doctors review
                    your submission and create a personalized treatment plan, which is delivered to you through the
                    platform and WhatsApp.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Are the doctors qualified and certified?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all our doctors are board-certified medical professionals specializing in women's health,
                    endocrinology, and PCOD/PCOS management. They have years of clinical experience and stay updated
                    with the latest research and treatment protocols.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Is my medical information secure?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. We follow HIPAA-compliant security standards to protect your personal and medical
                    information. All data is encrypted, and we never share your information with third parties without
                    your explicit consent.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I consult in my native language?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can submit your consultation form in any language. Our platform automatically translates
                    your responses for the doctor while preserving your original submission for reference.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Treatment & Results */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Treatment & Results</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-8">
                  <AccordionTrigger>How long does it take to see results?</AccordionTrigger>
                  <AccordionContent>
                    Results vary by individual, but most women start noticing improvements within 3-6 months of
                    consistent treatment. This includes more regular periods, reduced acne, better weight management,
                    and improved energy levels. Long-term commitment to treatment and lifestyle changes yields the best
                    outcomes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>What does treatment typically include?</AccordionTrigger>
                  <AccordionContent>
                    Treatment is personalized but typically includes medications to regulate hormones and insulin,
                    dietary recommendations focusing on low-glycemic foods, exercise plans, stress management
                    techniques, and supplements when needed. Regular monitoring and adjustments ensure optimal results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>Do you offer refunds if I'm not satisfied?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a 30-day satisfaction guarantee on all our plans. If you're not completely satisfied
                    with your consultation and treatment plan, we'll provide a full refund, no questions asked.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
