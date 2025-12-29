import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transparent pricing with no hidden fees. Start your journey to better health today.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Basic Consultation</CardTitle>
                <CardDescription>Perfect for first-time patients</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/consultation</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">30-minute video consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Symptom assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Basic treatment plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Digital prescription</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/consultation">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="flex flex-col border-pink-600 border-2 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Premium Care</CardTitle>
                <CardDescription>Comprehensive PCOD/PCOS management</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">60-minute initial consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Detailed medical analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Personalized treatment plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">2 follow-up consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Lifestyle & nutrition guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">WhatsApp support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  asChild
                >
                  <Link href="/consultation">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Elite Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Elite Package</CardTitle>
                <CardDescription>Complete health transformation</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-muted-foreground">/3 months</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Comprehensive health assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Custom meal plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Exercise regimen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support (24/7)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">Mental health counseling</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/consultation">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              All plans include a 30-day satisfaction guarantee. If you're not completely satisfied with your
              consultation, we'll provide a full refund.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
