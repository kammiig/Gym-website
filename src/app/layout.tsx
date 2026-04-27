import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Reliable Web Hosting & Complete Website Solutions`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Planetic Solutions",
    "web hosting",
    "domain registration",
    "WHMCS",
    "website development",
    "cPanel hosting",
    "£200 website"
  ],
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07111f"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [siteConfig.clientAreaUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: siteConfig.clientAreaUrl,
    email: siteConfig.email
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  );
}
