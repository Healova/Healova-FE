import {
  CheckCircle2,
  Shield,
  Sparkles,
  Heart,
  Clock,
  Users,
} from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-10">
        Why Women Choose Healova
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">
              Board-Certified Specialists
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Expert doctors with years of PCOD/PCOS experience and deep
              understanding of women's hormonal health
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Shield className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">
              Complete Privacy & Security
            </h4>
            <p className="text-gray-600 leading-relaxed">
              HIPAA-compliant platform ensures your personal and medical
              information stays protected
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Sparkles className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">
              Evidence-Based Treatment
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Treatment protocols backed by the latest medical research and
              proven clinical results
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Holistic Approach</h4>
            <p className="text-gray-600 leading-relaxed">
              We treat the root cause, not just symptoms, with personalized
              lifestyle and nutrition guidance
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Clock className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Convenient Care</h4>
            <p className="text-gray-600 leading-relaxed">
              Get expert consultation from the comfort of your home, no waiting
              rooms or travel required
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Users className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">
              Multilingual Support
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Consult in your preferred language for clear communication and
              better understanding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
