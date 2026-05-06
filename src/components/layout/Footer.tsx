import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#212529] mt-auto">
      <div className="container-wide py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Brobond Overseas" className="h-16 w-auto" />
              <div>
                <span className="text-lg font-heading font-black text-white block leading-tight">BROBOND</span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-500 font-sans">Overseas</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed font-sans text-sm pr-4">
              Premier manufacturer and exporter of industrial safety gloves, protective equipment, and specialized workwear for global B2B procurement.
            </p>
            <div className="flex gap-3">
              {[
                { href: COMPANY.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: COMPANY.social.twitter, icon: Twitter, label: "Twitter" },
                { href: COMPANY.social.facebook, icon: Facebook, label: "Facebook" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E0323C] hover:border-[#E0323C] transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-heading font-bold text-white tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-[#E0323C] transition-colors font-sans flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#E0323C] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-sm font-heading font-bold text-white tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#E0323C] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed font-sans">
                  {COMPANY.address.street}<br />
                  {COMPANY.address.city}, {COMPANY.address.state}, {COMPANY.address.zip}<br />
                  {COMPANY.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#E0323C] flex-shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="text-sm text-gray-400 hover:text-[#E0323C] transition-colors font-sans">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#E0323C] flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="text-sm text-gray-400 hover:text-[#E0323C] transition-colors font-sans break-all">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full h-px bg-white/10 my-8 md:my-10" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-sans text-center sm:text-left">
            © {currentYear} BroBond Overseas. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#E0323C] transition-colors font-sans">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-[#E0323C] transition-colors font-sans">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
