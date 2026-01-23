import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { COMPANY } from "@/lib/constants";

export function RFQSection() {
  return (
    <section className="section-padding bg-background" id="rfq">
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

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <InquiryForm />
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Our Location
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Manufacturing & Export Office</p>
                    <p className="text-muted-foreground">
                      {COMPANY.address.street}<br />
                      {COMPANY.address.city}, {COMPANY.address.state}<br />
                      {COMPANY.address.country} - {COMPANY.address.zip}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden border border-border h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0931839455726!2d88.4295!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM0JzIxLjQiTiA4OMKwMjUnNDYuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BroBond Overseas Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
