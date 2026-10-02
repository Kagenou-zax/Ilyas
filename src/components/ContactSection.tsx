import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Send, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Minimalist Desk Setup Consultation');
  const [preferredHub, setPreferredHub] = useState('Abeokuta (FUNAAB)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = `*NEW SWAVY GADGET INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name || 'Valued Customer'}
📞 *Phone:* ${phone || 'Not provided'}
🎯 *Interest:* ${interest}
📍 *Preferred Hub:* ${preferredHub}
💬 *Message:* ${message || 'I would like to place an order or make inquiries.'}
━━━━━━━━━━━━━━━━━━━━━━
Sent via Swavy Gadget Web Hub`;

    const url = `https://wa.me/2349063192326?text=${encodeURIComponent(payload)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-[#f5f7fc] py-14 sm:py-24 border-t-2 border-black/15 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Direct Info & Addresses */}
          <div className="lg:col-span-6 flex flex-col justify-between" data-reveal>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.22em] mb-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
                <span>Direct Contact & Orders</span>
                <span className="text-[#2563eb] font-black">/</span>
                <span>Swavy Gadget</span>
              </div>

              <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0f172a] uppercase leading-[0.88] tracking-tight mb-6">
                TALK WITH SWAVY GADGETS.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-lg font-medium mb-8 leading-relaxed">
                Have questions regarding stock availability, custom mechanical keyboards, or building out an ergonomic workspace? Contact our dedicated lines directly or send a message below.
              </p>

              {/* Direct Channel Cards */}
              <div className="space-y-4 max-w-lg">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-channel-whatsapp"
                  className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 flex items-center justify-between hover-glow shadow-sm transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center border-2 border-black shadow-2xs group-hover:scale-105 transition-transform">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                        FASTEST RESPONSE (WHATSAPP)
                      </span>
                      <span className="text-base sm:text-lg font-mono font-black text-[#0f172a]">
                        09063192326
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </a>

                {/* Direct Phone Call */}
                <a
                  href="tel:08113841519"
                  id="contact-channel-phone"
                  className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 flex items-center justify-between hover-glow shadow-sm transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center border-2 border-black shadow-2xs group-hover:scale-105 transition-transform">
                      <Phone size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                        DIRECT CALL LINE
                      </span>
                      <span className="text-base sm:text-lg font-mono font-black text-[#0f172a]">
                        08113841519
                      </span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </a>

                {/* Location Summaries */}
                <div id="contact-locations-summary" className="bg-[#f8fafc] border-2 border-black rounded-2xl p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#2563eb] mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-black block">Abeokuta Hub (FUNAAB):</strong>
                      <span className="text-neutral-600">Lalubu Street, Oke-Ilewo Tarmac, Abeokuta, Ogun State</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#2563eb] mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-black block">Lagos Flagship:</strong>
                      <span className="text-neutral-600">Otigba Street, Computer Village, Ikeja, Lagos State</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/10 flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span>Online support active • Mon - Sat: 8:30 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Right Column: Interactive Order & Inquiry Form */}
          <div className="lg:col-span-6" data-reveal data-reveal-delay="150">
            <div id="order-inquiry-container" className="bg-white border-2 border-black rounded-3xl p-6 sm:p-10 shadow-lg relative">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10">
                <div>
                  <h3 className="font-display-title font-bold text-xl sm:text-2xl text-[#0f172a]">
                    Place an Order or Inquire
                  </h3>
                  <span className="text-xs text-slate-600">
                    Sends instant formatted request to WhatsApp
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white border-2 border-black flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
              </div>

              {submitted && (
                <div id="inquiry-success-banner" className="mb-6 p-4 bg-[#25D366]/15 border-2 border-[#25D366] rounded-2xl flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#25D366] shrink-0" />
                  <span className="text-xs font-bold text-neutral-900">
                    Your inquiry has been opened in WhatsApp! Our team is ready to respond.
                  </span>
                </div>
              )}

              <form id="order-inquiry-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inquiry-name-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    id="inquiry-name-input"
                    type="text"
                    required
                    placeholder="e.g. David Adeleke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[44px] bg-[#f8fafc] border-2 border-black rounded-2xl px-4 py-3 text-base sm:text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-phone-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      id="inquiry-phone-input"
                      type="tel"
                      required
                      placeholder="e.g. 080..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[44px] bg-[#f8fafc] border-2 border-black rounded-2xl px-4 py-3 text-base sm:text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-hub-select" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Preferred Store Hub
                    </label>
                    <select
                      id="inquiry-hub-select"
                      value={preferredHub}
                      onChange={(e) => setPreferredHub(e.target.value)}
                      className="w-full min-h-[44px] bg-[#f8fafc] border-2 border-black rounded-2xl px-4 py-3 text-base sm:text-sm text-[#0f172a] focus:outline-none focus:border-[#2563eb] transition-colors cursor-pointer"
                    >
                      <option value="Abeokuta (FUNAAB)">Abeokuta (FUNAAB / Lalubu St)</option>
                      <option value="Computer Village (Ikeja Lagos)">Computer Village (Otigba St, Lagos)</option>
                      <option value="Nationwide Delivery (GIG/DHL)">Nationwide Doorstep Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-item-select" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Item or Service of Interest
                  </label>
                  <select
                    id="inquiry-item-select"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full min-h-[44px] bg-[#f8fafc] border-2 border-black rounded-2xl px-4 py-3 text-base sm:text-sm text-[#0f172a] focus:outline-none focus:border-[#2563eb] transition-colors cursor-pointer"
                  >
                    <option value="Solid Walnut Dual-Tier Desk Shelf System (₦68,000)">
                      Solid Walnut Dual-Tier Desk Shelf (₦68,000)
                    </option>
                    <option value="Custom Low-Profile Gasket Mechanical Keyboard (₦52,000)">
                      Low-Profile Mechanical Keyboard (₦52,000)
                    </option>
                    <option value="Asymmetric ScreenBar Halo LED Monitor Light (₦38,500)">
                      ScreenBar Halo LED Monitor Light (₦38,500)
                    </option>
                    <option value="Heavy-Duty Gas Spring Dual Monitor Arm (₦64,000)">
                      Heavy-Duty Gas Spring Monitor Arm (₦64,000)
                    </option>
                    <option value="3-in-1 Fast MagSafe Charging Station (₦34,000)">
                      3-in-1 Fast MagSafe Charging Station (₦34,000)
                    </option>
                    <option value="140W GaN Pro Multi-Port PD3.1 Charger (₦42,000)">
                      140W GaN Pro Multi-Port Charger (₦42,000)
                    </option>
                    <option value="Merino Wool Felt & Leather Large Desk Mat (₦18,500)">
                      Merino Wool Felt & Leather Desk Mat (₦18,500)
                    </option>
                    <option value="Precision Master Ergonomic Silent Wireless Mouse (₦45,000)">
                      Ergonomic Silent Wireless Mouse (₦45,000)
                    </option>
                    <option value="Complete Custom Minimalist Setup Consultation">
                      Full Custom Minimalist Setup Consultation
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-notes-textarea" className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Special Notes or Delivery Instructions
                  </label>
                  <textarea
                    id="inquiry-notes-textarea"
                    rows={3}
                    placeholder="Provide any custom requests, color choices, or specific location details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#f8fafc] border-2 border-black rounded-2xl px-4 py-3 text-base sm:text-sm text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#2563eb] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="inquiry-submit-btn"
                  className="w-full min-h-[48px] py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-black hover:text-white text-white border-2 border-black font-black text-sm uppercase tracking-wider shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                >
                  <span>Submit Order to WhatsApp</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
