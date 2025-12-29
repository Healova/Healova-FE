import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              HEALOVA
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Expert PCOD/PCOS care that empowers women to reclaim their health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="text-sm text-muted-foreground hover:text-pink-600 transition-colors"
                >
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-pink-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@healova.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Healova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
