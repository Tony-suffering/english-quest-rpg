'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Check, Globe, Shield, FileText, MessageCircle } from 'lucide-react'

// Expat Interior Services Landing Page
// This is NOT just a webpage - this is the front door of a lead generation system
//
// Lead source tracking via URL params:
// /expat?src=ten       → Tokyo Expat Network Facebook
// /expat?src=reddit    → r/japanlife
// /expat?src=ref       → Referral (add name: ?src=ref-edmund)
// /expat               → Organic / Google

function ExpatForm() {
  const searchParams = useSearchParams()
  const [leadSource, setLeadSource] = useState<string>('organic')

  useEffect(() => {
    const src = searchParams.get('src')
    if (src) {
      setLeadSource(src)
    }
  }, [searchParams])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    propertyType: '',
    area: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/expat-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          source: leadSource,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-4">
            Thank you for reaching out
          </h1>
          <p className="text-stone-600 mb-6">
            I will personally respond within 24 hours with an initial assessment
            and next steps. No automated replies.
          </p>
          <p className="text-stone-500 text-sm">
            — Iwasaki, 30 years in interior finishing
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero - Direct, No Fluff */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            <span>English-Speaking Interior Services in Tokyo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            Interior Renovation for Expats in Japan
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Finding a trustworthy contractor in Japan is difficult when you do not speak Japanese.
            I offer transparent, English-language interior services with 30 years of experience.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* The Problem - Speak to Their Pain */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            The Problem Every Expat Faces
          </h2>
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
            <p className="text-stone-700">
              &ldquo;If you do not speak Japanese, you cannot communicate accurately about
              the work, schedule, or costs. Many construction companies do not accept
              requests from foreigners.&rdquo;
            </p>
            <p className="text-stone-500 text-sm">
              — Common experience shared across expat communities
            </p>
          </div>
        </section>

        {/* What I Offer - Simple, Clear */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            What I Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">
                Direct English Communication
              </h3>
              <p className="text-stone-600 text-sm">
                All communication in English. No translators, no miscommunication.
                I speak directly with you throughout the project.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">
                Transparent Written Estimates
              </h3>
              <p className="text-stone-600 text-sm">
                Detailed breakdown of all costs before work begins.
                No surprise charges. Western-style contracts.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">
                30 Years Experience
              </h3>
              <p className="text-stone-600 text-sm">
                Specialized in wallpaper, flooring, and interior finishing.
                Not a broker — I do the work myself.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-stone-800 mb-2">
                Project Portal Access
              </h3>
              <p className="text-stone-600 text-sm">
                Online access to your project schedule, costs, and updates.
                Know exactly what is happening every day.
              </p>
            </div>
          </div>
        </section>

        {/* Services & Pricing - Be Specific */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            Services & Typical Pricing
          </h2>
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left p-4 text-stone-600 font-medium">Service</th>
                  <th className="text-left p-4 text-stone-600 font-medium">Typical Range</th>
                  <th className="text-left p-4 text-stone-600 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-4 text-stone-800">Wallpaper (1 room)</td>
                  <td className="p-4 text-stone-600">¥80,000 - ¥150,000</td>
                  <td className="p-4 text-stone-500 text-sm">Includes removal, prep, installation</td>
                </tr>
                <tr>
                  <td className="p-4 text-stone-800">Flooring (1 room)</td>
                  <td className="p-4 text-stone-600">¥120,000 - ¥250,000</td>
                  <td className="p-4 text-stone-500 text-sm">Material dependent</td>
                </tr>
                <tr>
                  <td className="p-4 text-stone-800">Full apartment (1LDK)</td>
                  <td className="p-4 text-stone-600">¥400,000 - ¥800,000</td>
                  <td className="p-4 text-stone-500 text-sm">Walls + floors</td>
                </tr>
                <tr>
                  <td className="p-4 text-stone-800">House renovation</td>
                  <td className="p-4 text-stone-600">¥1,500,000+</td>
                  <td className="p-4 text-stone-500 text-sm">Full assessment required</td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-stone-50 text-stone-500 text-sm">
              All prices include materials and labor. Tax (10%) not included.
              Free estimate provided after site visit.
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            Service Areas
          </h2>
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <p className="text-stone-700 mb-4">
              <strong>Tokyo 23 Wards:</strong> All areas covered, including Shibuya, Minato,
              Meguro, Setagaya, Shinjuku, and surrounding areas.
            </p>
            <p className="text-stone-700 mb-4">
              <strong>Greater Tokyo:</strong> Yokohama, Kawasaki, parts of Chiba and Saitama
              — please inquire.
            </p>
            <p className="text-stone-500 text-sm">
              I work throughout the Tokyo metropolitan area where many international
              residents live.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            Get a Free Estimate
          </h2>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Property Type
                </label>
                <select
                  value={formState.propertyType}
                  onChange={(e) => setFormState({ ...formState, propertyType: e.target.value })}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                >
                  <option value="">Select...</option>
                  <option value="apartment-rental">Apartment (Rental)</option>
                  <option value="apartment-owned">Apartment (Owned)</option>
                  <option value="house-rental">House (Rental)</option>
                  <option value="house-owned">House (Owned)</option>
                  <option value="office">Office</option>
                </select>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-2">
                  Area / Nearest Station
                </label>
                <input
                  type="text"
                  value={formState.area}
                  onChange={(e) => setFormState({ ...formState, area: e.target.value })}
                  className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="e.g., Shibuya, Meguro Station"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-stone-700 font-medium mb-2">
                Tell me about your project
              </label>
              <textarea
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                rows={4}
                placeholder="What would you like to renovate? Any specific requirements or timeline?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            <p className="text-center text-stone-500 text-sm mt-4">
              I respond personally within 24 hours. Free estimate, no obligation.
            </p>
          </form>
        </section>

        {/* About */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-stone-800 mb-6">
            About Iwasaki Interior
          </h2>
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <p className="text-stone-700 mb-4">
              I have been doing interior finishing work in Tokyo for 30 years.
              Wallpaper, flooring, ceiling work — these are my specialty.
            </p>
            <p className="text-stone-700 mb-4">
              I started offering English-language services because I saw how difficult
              it is for international residents to find reliable contractors.
              The language barrier creates problems: miscommunication about work scope,
              unexpected costs, and frustration on both sides.
            </p>
            <p className="text-stone-700">
              My approach is simple: clear communication, transparent pricing,
              and quality work. I treat every project as if it were my own home.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm">
            Iwasaki Interior — English-speaking interior services in Tokyo
          </p>
          <p className="text-stone-500 text-xs mt-2">
            Serving Shibuya, Minato, Meguro, Setagaya, and all Tokyo 23 wards
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function ExpatInteriorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <ExpatForm />
    </Suspense>
  )
}
