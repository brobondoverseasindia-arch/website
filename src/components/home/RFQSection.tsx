import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { COMPANY } from "@/lib/constants";

export function RFQSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA] relative overflow-hidden" id="rfq">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-5 items-start">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            <div>
              <span className="inline-block bg-red-50 text-[#E0323C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#212529] mb-3 sm:mb-4">
                Request <span className="text-[#E0323C]">A Quote</span>
              </h2>
              <p className="text-[#6F7183] text-sm sm:text-base leading-relaxed font-sans">
                Get in touch with our export team for bulk pricing and custom manufacturing inquiries. We'll respond within 24 business hours.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-red-50 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#E0323C]" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[#212529] text-sm">Export Office</p>
                  <p className="text-xs sm:text-sm text-[#6F7183] leading-relaxed font-sans mt-1">
                    {COMPANY.address.street}<br />
                    {COMPANY.address.city}, {COMPANY.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-red-50 flex-shrink-0">
                  <Phone className="h-5 w-5 text-[#E0323C]" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[#212529] text-sm">Sales Line</p>
                  <a href={`tel:${COMPANY.phone}`} className="text-xs sm:text-sm text-[#6F7183] hover:text-[#E0323C] transition-colors font-sans mt-1 block">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-red-50 flex-shrink-0">
                  <Mail className="h-5 w-5 text-[#E0323C]" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[#212529] text-sm">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-xs sm:text-sm text-[#6F7183] hover:text-[#E0323C] transition-colors font-sans mt-1 block break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100">
              <h3 className="text-lg sm:text-xl font-heading font-bold text-[#212529] mb-5 sm:mb-6">Send an Inquiry</h3>
              <InquiryForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
