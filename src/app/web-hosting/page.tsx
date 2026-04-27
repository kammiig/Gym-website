import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PricingSection } from "@/components/PricingSection";
import { SectionHeader } from "@/components/SectionHeader";
import { hostingFeatures } from "@/data/services";
import { pages } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.webHosting.seoTitle,
  description: pages.webHosting.metaDescription,
  path: "/web-hosting"
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Hosting",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  },
  serviceType: "SSD web hosting",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/web-hosting`
};

export default function WebHostingPage() {
  const hero = pages.webHosting.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Hosting features"
            title="Fast, Secure, and Easy to Manage"
            description="A practical hosting stack for business websites, WordPress projects, email, and day-to-day client management."
          />
          <FeatureGrid features={hostingFeatures} />
        </div>
      </section>
      <PricingSection />
      <FAQSection categories={["general", "hosting"]} />
      <CTASection
        title="Start Hosting With Planetic Solutions"
        description="Order hosting, manage invoices, and access support from the WHMCS client area."
        primaryLabel="Order Hosting"
        secondaryLabel="Contact Us"
      />
      <JsonLd data={serviceSchema} />
    </>
  );
}
