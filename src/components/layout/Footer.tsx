import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark noise-overlay relative">
      <div className="container-wide section-padding relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-purple">
                <span className="text-lg font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-bold text-white">{COMPANY.name}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {COMPANY.description}
            </p>
            <div className="flex gap-3">
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={COMPANY.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-white/60 hover:text-primary transition-colors"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-white/60 leading-relaxed">
                  {COMPANY.address.street}<br />
                  {COMPANY.address.city}, {COMPANY.address.state}<br />
                  {COMPANY.address.country} - {COMPANY.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-sm text-white/60 hover:text-primary transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/60 hover:text-primary transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Export Ready */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-white">Export Ready</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              We ship to 50+ countries worldwide with reliable logistics partners and export-ready documentation.
            </p>
            <div className="flex flex-wrap gap-2">
              {["USA", "EU", "UAE", "Australia", "Asia"].map((region) => (
                <span
                  key={region}
                  className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/70"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-dark my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-white/50 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-white/50 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
