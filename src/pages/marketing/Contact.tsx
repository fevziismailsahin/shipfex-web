import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import PublicLocationsMap from '../../components/PublicLocationsMap'
import { api, type PublicLocation } from '../../services/api'

export default function ContactPage() {
  const [locations, setLocations] = useState<PublicLocation[]>([])
  const [locationsLoading, setLocationsLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const rows = await api.publicListLocations()
        setLocations(rows)
      } catch {
        setLocations([])
      } finally {
        setLocationsLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Get in touch with our team—we're here to help your business grow
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
                <p className="text-slate-600 mb-6">
                  Whether you have questions about our services, need a quote, or want to discuss a partnership, we're ready to help.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <a href="tel:+18001234567" className="text-slate-600 hover:text-blue-600">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <a href="mailto:info@shipfex.com" className="text-slate-600 hover:text-blue-600">
                      info@shipfex.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Headquarters</p>
                    <p className="text-slate-600">123 Warehouse Blvd<br />Los Angeles, CA 90001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Hours</p>
                    <p className="text-slate-600">Mon-Fri: 8AM - 6PM PST<br />Sat-Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Service Interest</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Select a service</option>
                    <option>Amazon FBA</option>
                    <option>Amazon FBM</option>
                    <option>Dropshipping</option>
                    <option>Logistics</option>
                    <option>Customs</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Tell us about your needs..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-white border border-slate-200 rounded-2xl h-96 overflow-hidden">
            {locationsLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-sm text-slate-500">Loading map…</div>
              </div>
            ) : locations.length ? (
              <PublicLocationsMap locations={locations} className="h-full w-full" />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm font-medium">No locations configured yet</p>
                  <p className="text-xs text-slate-400 mt-1">Log in as admin to add locations.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
