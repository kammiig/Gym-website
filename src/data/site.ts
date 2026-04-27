export const CLIENT_AREA_URL = "https://planeticsolution.com/clientarea/";

export const siteConfig = {
  name: "Planetic Solutions",
  domain: "planeticsolution.com",
  url: "https://planeticsolution.com",
  clientAreaUrl: CLIENT_AREA_URL,
  description:
    "Fast web hosting, secure domains, WHMCS client support, and professional website development from Planetic Solutions.",
  email: "support@planeticsolution.com",
  supportLabel: "WHMCS Client Area",
  copyright: `(c) ${new Date().getFullYear()} Planetic Solutions. All rights reserved.`
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Web Hosting", href: "/web-hosting" },
  { label: "Domains", href: "/domain-registration" },
  { label: "Website Development", href: "/website-development" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const footerLinkGroups = [
  {
    title: "Hosting",
    links: [
      { label: "Web Hosting", href: "/web-hosting" },
      { label: "Hosting Pricing", href: "/pricing" },
      { label: "Order Hosting", href: CLIENT_AREA_URL },
      { label: "Client Area", href: CLIENT_AREA_URL }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/website-development" },
      { label: "Domain Registration", href: "/domain-registration" },
      { label: "Complete Website Package", href: "/website-development" },
      { label: "News", href: "/news" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Billing", href: CLIENT_AREA_URL },
      { label: "Support Tickets", href: CLIENT_AREA_URL },
      { label: "Invoices", href: CLIENT_AREA_URL },
      { label: "Contact", href: "/contact" }
    ]
  }
];
