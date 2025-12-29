import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Heart, Users, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Healova, we believe every woman deserves access to compassionate, evidence-based care for PCOD and
              PCOS. Our platform connects you with expert doctors who understand your unique journey and provide
              personalized treatment plans that actually work.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Women Helped</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Expert Doctors</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <div className="text-3xl font-bold mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Improvement Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Our Approach */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Comprehensive Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed consultation to understand your symptoms, medical history, and lifestyle.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Personalized Treatment</h3>
                <p className="text-sm text-muted-foreground">
                  Evidence-based treatment plans tailored to your specific needs and goals.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Ongoing Support</h3>
                <p className="text-sm text-muted-foreground">
                  Regular follow-ups and adjustments to ensure optimal results and lasting health.
                </p>
              </div>
            </div>
          </div>

          {/* Medical Credibility */}
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Medical Excellence</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our team of board-certified doctors specializes in PCOD/PCOS management, combining years of clinical
                experience with the latest research in women's health.
              </p>
              <p>
                We follow evidence-based protocols recommended by leading medical institutions and continuously update
                our practices based on the latest scientific findings.
              </p>
              <p>
                Your privacy and security are our top priorities. All consultations and medical records are handled with
                the highest standards of confidentiality and HIPAA compliance.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
