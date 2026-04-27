import { BlogList } from "@/components/BlogList";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { PackageHighlight } from "@/components/PackageHighlight";
import { PricingSection } from "@/components/PricingSection";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCards } from "@/components/ServiceCards";
import { Testimonials } from "@/components/Testimonials";
import { pages } from "@/data/pages";
import { hostingFeatures, serviceCards } from "@/data/services";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.home.seoTitle,
  description: pages.home.metaDescription
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.clientAreaUrl}?domain={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Hosting features"
            title="Everything Needed for a Professional Website Launch"
            description="Hosting, security, billing, domains, and support tools are built around a simple WHMCS client experience."
          />
          <FeatureGrid features={hostingFeatures} />
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="Hosting Company Services in One Place"
            description="Choose only what you need, or combine hosting, domains, and development into one launch package."
          />
          <ServiceCards services={serviceCards} />
        </div>
      </section>

      <PackageHighlight />
      <PricingSection />
      <Testimonials />

      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="News"
            title="Recent Hosting and Website Notes"
            description="A dynamic news structure is included so future posts can be managed from a central data file."
          />
          <BlogList limit={3} />
        </div>
      </section>

      <FAQSection categories={["general", "hosting", "website"]} />
      <CTASection />
      <JsonLd data={websiteSchema} />
    </>
  );
}
