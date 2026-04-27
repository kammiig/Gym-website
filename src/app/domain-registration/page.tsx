import { CTASection } from "@/components/CTASection";
import { DomainSearch } from "@/components/DomainSearch";
import { FAQSection } from "@/components/FAQSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { domainHighlights } from "@/data/services";
import { pages } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.domains.seoTitle,
  description: pages.domains.metaDescription,
  path: "/domain-registration"
});

const domainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Domain Registration",
  provider: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  },
  serviceType: "Domain registration and management",
  url: `${siteConfig.url}/domain-registration`
};

export default function DomainRegistrationPage() {
  const hero = pages.domains.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container domain-grid">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Domain tools"
              title="Register Domains Through the Client Area"
              description="Search for a domain and continue your order through the WHMCS portal for secure account and billing management."
            />
            <FeatureGrid features={domainHighlights} />
          </div>
          <DomainSearch />
        </div>
      </section>
      <FAQSection categories={["general", "domains"]} />
      <CTASection
        title="Keep Domains and Hosting Connected"
        description="Register domains, order hosting, and manage renewals from the same Planetic Solutions client area."
        primaryLabel="Open Client Area"
        secondaryLabel="View Hosting"
        secondaryHref="/web-hosting"
      />
      <JsonLd data={domainSchema} />
    </>
  );
}
