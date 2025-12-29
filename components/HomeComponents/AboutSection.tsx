export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-rose-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4">
              About Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 max-w-3xl">
              Compassionate Care Built on Science, Delivered with Heart
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              We understand the challenges of living with PCOD and PCOS. That's
              why we've created a platform where expert medical care meets
              genuine understanding and support.
            </p>
          </div>

          {/* Three-Step Process */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-10">
              How We Help You Heal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Share Your Story
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Tell us about your symptoms, medical history, and health
                      goals through our detailed but easy-to-complete
                      consultation form.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Expert Review
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our specialist doctors carefully analyze your case and
                      create a personalized treatment plan just for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      Begin Healing
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Receive your treatment plan within 24-48 hours and start
                      your journey with ongoing support from our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
