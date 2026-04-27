export const CLIENT_AREA_URL = "https://planeticsolution.com/clientarea/";

export const siteConfig = {
  name: "Planetic Solutions",
  domain: "planeticsolution.com",
  url: "https://planeticsolution.com",
  clientAreaUrl: CLIENT_AREA_URL,
  description:
    "Fast web hosting, secure domains, WHMCS client support, and professional website development from Planetic Solutions.",
  email: "kammiig@gmail.com",
  supportEmail: "kammiig@gmail.com",
  supportLabel: "Email Support Tickets",
  copyright: `(c) ${new Date().getFullYear()} Planetic Solutions. All rights reserved.`
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Web Hosting", href: "/web-hosting" },
  { label: "Domains", href: "/domain-registration" },
  { label: "Website Development", href: "/website-development" },
  { label: "Pricing", href: "/pricing" },
  { label: "Support", href: "/support" },
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
      { label: "Support Tickets", href: "/support" },
      { label: "News", href: "/news" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Billing", href: CLIENT_AREA_URL },
      { label: "Create Ticket", href: "/support" },
      { label: "Invoices", href: CLIENT_AREA_URL },
      { label: "Contact", href: "/contact" }
    ]
  }
];
