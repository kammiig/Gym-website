import { CLIENT_AREA_URL } from "./site";

export const hostingPlans = [
  {
    name: "Starter Hosting",
    price: "£4.99",
    period: "/mo",
    description: "A reliable starting point for personal sites, portfolios, and small business launches.",
    features: [
      "1 website",
      "10 GB SSD storage",
      "Free SSL",
      "cPanel access",
      "Email accounts",
      "WHMCS billing support"
    ],
    ctaLabel: "Choose Starter",
    ctaHref: CLIENT_AREA_URL,
    highlighted: false
  },
  {
    name: "Business Hosting",
    price: "£8.99",
    period: "/mo",
    description: "More room and power for growing business websites, blogs, and lead generation pages.",
    features: [
      "Up to 5 websites",
      "30 GB SSD storage",
      "Free SSL",
      "cPanel access",
      "Priority support",
      "Daily backup ready"
    ],
    ctaLabel: "Choose Business",
    ctaHref: CLIENT_AREA_URL,
    highlighted: true
  },
  {
    name: "Pro Hosting",
    price: "£14.99",
    period: "/mo",
    description: "Premium hosting for larger websites, agencies, and performance-focused projects.",
    features: [
      "Unlimited websites",
      "75 GB SSD storage",
      "Free SSL",
      "Advanced cPanel tools",
      "Enhanced server resources",
      "WHMCS client support"
    ],
    ctaLabel: "Choose Pro",
    ctaHref: CLIENT_AREA_URL,
    highlighted: false
  }
];

export const websitePackage = {
  name: "Complete Website Development",
  price: "£200",
  priceNote: "one-time package",
  description:
    "A complete launch package for businesses that want a professional website without managing every technical detail.",
  ctaLabel: "Order Website Package",
  ctaHref: CLIENT_AREA_URL,
  secondaryCtaLabel: "Contact Us",
  secondaryCtaHref: "/contact",
  features: [
    "Complete responsive website",
    "Free domain",
    "Free hosting",
    "Elementor setup",
    "Free graphic work",
    "Free content writing",
    "Free stock images",
    "Contact form",
    "Mobile-friendly design",
    "Basic SEO setup",
    "Website launch support"
  ],
  process: [
    {
      title: "Share Your Requirements",
      description: "Tell us your business, pages, preferred style, and the service you want to promote."
    },
    {
      title: "We Build the Website",
      description: "Your site is designed with responsive layouts, launch content, graphics, and stock imagery."
    },
    {
      title: "Launch With Support",
      description: "We help connect the domain, hosting, contact form, and basic SEO-ready structure."
    }
  ]
};
