// BroBond Overseas - Company Constants

export const COMPANY = {
  name: "BroBond Overseas",
  tagline: "Premium Industrial Gloves. Global Supply. Export-Ready Quality.",
  description: "Leading manufacturer and merchant exporter of premium industrial gloves and safety products from Kolkata, India.",
  phone: "+91 7980807953",
  email: "info@brobondoverseas.com",
  whatsapp: "+91 7980807953",
  address: {
    street: "17D, Trinathpally Nowbhanga , Salt Lake Sector 4",
    city: "Kolkata",
    state: "West Bengal",
    zip: "700105",
    country: "India"
  },
  social: {
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
    facebook: "https://facebook.com/"
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
  { label: "Exporter", icon: "Globe" },
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
    description: "Shipping to 15+ countries with reliable logistics partners.",
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
    name: "Rajesh Kumar",
    company: "RK Fabrication Works",
    country: "India",
    content: "The leather welding hood quality is outstanding. It provides excellent protection against sparks and heat, and the comfort level is very good for long working hours.",
    rating: 5,
  },
  {
    name: "Amit Das",
    company: "Eastern Metal Industries",
    country: "India",
    content: "Very durable and well-stitched safety hood. The material feels premium and gives full coverage during welding operations.",
    rating: 5,
  },
  {
    name: "Sandeep Yadav",
    company: "Yadav Engineering Solutions",
    country: "India",
    content: "We have been using these welding hoods in our workshop regularly. The product quality and finishing are excellent for industrial use.",
    rating: 4,
  },
  {
    name: "Mohit Sharma",
    company: "Sharma Industrial Tools",
    country: "India",
    content: "Reliable safety gear with strong leather quality and comfortable fitting. Highly recommended for fabrication and heavy-duty welding work.",
    rating: 5,
  },
] as const;

export const FOUNDERS = [
  {
    name: "Laltu Mondal",
    role: "Co-Founder & Managing Director",
    bio: "With over 25 years in industrial safety manufacturing, Laltu leads our production and quality initiatives. His vision has transformed BroBond into a global export powerhouse.",
    image: "/laltumandal.jpeg",
    // linkedin: "https://linkedin.com/in/rajeshsharma"
  },
  {
    name: "Santu Mondal",
    role: "Co-Founder & Director of International Sales",
    bio: "Santu has 10 years of experience in international trade and export management. He has built our global network spanning 5+ countries.",
    image: "/placeholder.svg",
    // linkedin: "https://linkedin.com/in/priyabanerjee"
  }
] as const;

export const MANUFACTURING_STEPS = [
  { step: 1, title: "Raw Material Sourcing", description: "Premium certified materials from trusted suppliers" },
  { step: 2, title: "Precision Manufacturing", description: "State-of-the-art machinery with strict quality protocols" },
  { step: 3, title: "Quality Testing", description: "Multi-stage inspection ensuring compliance with international standards" },
  { step: 4, title: "Export Packaging", description: "Industry-grade packaging designed for international transit" },
  { step: 5, title: "Global Shipping", description: "Reliable logistics partners ensuring timely worldwide delivery" },
] as const;
