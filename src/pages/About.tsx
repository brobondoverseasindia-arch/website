import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionHeader } from "@/components/ui/section-header";
import { COMPANY, FOUNDERS, MANUFACTURING_STEPS } from "@/lib/constants";

const About = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="section-padding bg-background border-b border-white/10">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About BroBond Overseas
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A leading manufacturer and merchant exporter of premium industrial gloves and safety products,
              headquartered in Kolkata, India. We combine manufacturing excellence with global export expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in Kolkata, {COMPANY.name} has grown from a local manufacturer to a
                  globally recognized exporter of industrial safety products. Our journey began
                  with a simple mission: to provide premium quality protective equipment to
                  workers worldwide.
                </p>
                <p>
                  Today, we export to over 50 countries, serving major distributors, procurement
                  teams, and industrial buyers across the globe. Our state-of-the-art manufacturing
                  facility combines traditional craftsmanship with modern technology to deliver
                  consistent quality in every product.
                </p>
                <p>
                  As both a manufacturer and merchant exporter, we offer complete control over
                  quality, pricing, and delivery timelines—ensuring our partners receive the
                  best value and service in the industry.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-secondary overflow-hidden shadow-lg border border-white/10">
                <img
                  src="https://i1-e.pinimg.com/1200x/d9/30/fe/d930fea2a223823b5a6c602f755f2cdc.jpg"
                  alt="Manufacturing facility"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-card border border-white/10 shadow-lg hover:shadow-primary/5 transition-all"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide premium quality industrial safety products that protect workers worldwide,
                while building lasting partnerships with distributors and buyers through exceptional
                service, competitive pricing, and reliable delivery.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-card border border-white/10 shadow-lg hover:shadow-primary/5 transition-all"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted name in industrial safety exports, recognized globally
                for quality, innovation, and customer-centric approach. We aim to expand our reach
                to 100+ countries while maintaining the highest standards of manufacturing excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <SectionHeader
            title="Meet Our Founders"
            subtitle="The visionaries behind BroBond Overseas"
          />
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {FOUNDERS.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border card-shadow text-center"
              >
                <div className="w-32 h-32 rounded-full bg-secondary mx-auto mb-4 overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {founder.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {founder.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {founder.bio}
                </p>
                {/* <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <SectionHeader
            title="Our Manufacturing Process"
            subtitle="From raw materials to export-ready products, every step is carefully controlled"
          />
          <div className="max-w-4xl mx-auto">
            {MANUFACTURING_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-primary-foreground font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Global Export Network
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We proudly serve customers across 50+ countries with reliable logistics,
                export-ready documentation, and dedicated support for international buyers.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["USA", "Germany", "UK", "UAE", "Australia",].map(
                  (country) => (
                    <span
                      key={country}
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                    >
                      {country}
                    </span>
                  )
                )}
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  +10 more
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
