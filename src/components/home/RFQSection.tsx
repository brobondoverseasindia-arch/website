import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { COMPANY } from "@/lib/constants";

export function RFQSection() {
  return (
    <section className="section-padding section-light" id="rfq">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Request a Quote"
            subtitle="Get in touch with our export team. We'll respond within 24 business hours."
          />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form - Takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card-elevated p-6 md:p-8">
              <InquiryForm />
            </div>
          </motion.div>

          {/* Location Info - Contrast panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="card-elevated-dark h-full p-6 md:p-8 section-dark rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">
                  Contact Information
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Manufacturing & Export Office</p>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {COMPANY.address.street}<br />
                      {COMPANY.address.city}, {COMPANY.address.state}<br />
                      {COMPANY.address.country} - {COMPANY.address.zip}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5">Phone</p>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-0.5">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm text-white/60 hover:text-primary transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="divider-dark" />

                {/* Export Regions */}
                <div>
                  <p className="text-sm font-medium text-white/80 mb-3">We Export To</p>
                  <div className="flex flex-wrap gap-2">
                    {["USA", "EU", "UAE", "Australia", "Asia", "+40 more"].map((region) => (
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

              {/* Map Embed */}
              <div className="mt-6 rounded-xl overflow-hidden border border-white/10 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0931839455726!2d88.4295!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjQiTiA4OMKwMjUnNDYuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BroBond Overseas Location"
                  className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
