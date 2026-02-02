// BroBond Overseas - Company Constants

export const COMPANY = {
  name: "BroBond Overseas",
  tagline: "Premium Industrial Gloves. Global Supply. Export-Ready Quality.",
  description: "Leading manufacturer and merchant exporter of premium industrial gloves and safety products from Kolkata, India.",
  phone: "+91 33 2234 5678",
  email: "export@brobondoverseas.com",
  whatsapp: "+91 79808 07953",
  address: {
    street: "123 Industrial Park, Sector V",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    zip: "700091"
  },
  social: {
    linkedin: "https://linkedin.com/company/brobond-overseas",
    twitter: "https://twitter.com/brobondoverseas",
    facebook: "https://facebook.com/brobondoverseas"
  }
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

export const TRUST_BADGES = [
  { label: "Manufacturer", icon: "Factory" },
  { label: "Merchant Exporter", icon: "Globe" },
  { label: "Worldwide Shipping", icon: "Truck" },
] as const;

export const QUICK_HIGHLIGHTS = [
  {
    title: "Manufactured in Kolkata",
    description: "State-of-the-art production facility ensuring quality at source.",
    icon: "Factory",
  },
  {
    title: "Global Export Network",
    description: "Shipping to 50+ countries with reliable logistics partners.",
    icon: "Globe",
  },
  {
    title: "Premium Quality Materials",
    description: "Using only certified raw materials for durability and safety.",
    icon: "Shield",
  },
  {
    title: "Reliable Delivery",
    description: "Export-ready packaging with on-time delivery guarantee.",
    icon: "Package",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Quality Control",
    description: "Rigorous testing at every production stage ensures consistent quality.",
    icon: "CheckCircle",
  },
  {
    title: "Export Packaging",
    description: "Industry-standard packaging designed for international shipping.",
    icon: "Package",
  },
  {
    title: "Customization",
    description: "Private labeling and custom specifications available.",
    icon: "Settings",
  },
  {
    title: "Compliance Ready",
    description: "Products meet international safety standards and certifications.",
    icon: "FileCheck",
  },
  {
    title: "Scalable Production",
    description: "Capacity to handle bulk orders with consistent delivery schedules.",
    icon: "TrendingUp",
  },
  {
    title: "Responsive Support",
    description: "Dedicated export team for seamless communication.",
    icon: "Headphones",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Michael Schmidt",
    company: "Schmidt Industrial GmbH",
    country: "Germany",
    content: "BroBond's nitrile gloves have become our preferred choice. The quality is consistent, and their export documentation is always perfect.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    company: "SafetyFirst Distribution",
    country: "USA",
    content: "We've been importing from BroBond for 3 years. Their attention to packaging and timely delivery sets them apart from other suppliers.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    company: "Gulf Safety Supplies",
    country: "UAE",
    content: "Excellent product range and competitive pricing. The team is very responsive to our custom requirements.",
    rating: 5,
  },
  {
    name: "Jennifer Wong",
    company: "Pacific Safety Equipment",
    country: "Australia",
    content: "The cut-resistant gloves we source from BroBond receive excellent feedback from our mining sector clients.",
    rating: 5,
  },
] as const;

export const FOUNDERS = [
  {
    name: "Rajesh Sharma",
    role: "Co-Founder & Managing Director",
    bio: "With over 25 years in industrial safety manufacturing, Rajesh leads our production and quality initiatives. His vision has transformed BroBond into a global export powerhouse.",
    image: "/placeholder.svg",
    linkedin: "https://linkedin.com/in/rajeshsharma"
  },
  {
    name: "Priya Banerjee",
    role: "Co-Founder & Director of International Sales",
    bio: "Priya brings 20 years of experience in international trade and export management. She has built our global network spanning 50+ countries.",
    image: "/placeholder.svg",
    linkedin: "https://linkedin.com/in/priyabanerjee"
  }
] as const;

export const MANUFACTURING_STEPS = [
  { step: 1, title: "Raw Material Sourcing", description: "Premium certified materials from trusted suppliers" },
  { step: 2, title: "Precision Manufacturing", description: "State-of-the-art machinery with strict quality protocols" },
  { step: 3, title: "Quality Testing", description: "Multi-stage inspection ensuring compliance with international standards" },
  { step: 4, title: "Export Packaging", description: "Industry-grade packaging designed for international transit" },
  { step: 5, title: "Global Shipping", description: "Reliable logistics partners ensuring timely worldwide delivery" },
] as const;
