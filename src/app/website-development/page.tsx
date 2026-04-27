import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { PackageHighlight } from "@/components/PackageHighlight";
import { PageHero } from "@/components/PageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SectionHeader } from "@/components/SectionHeader";
import { websitePackage } from "@/data/plans";
import { pages } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.websiteDevelopment.seoTitle,
  description: pages.websiteDevelopment.metaDescription,
  path: "/website-development"
});

const packageSchema = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Complete Website Development Package",
  price: "200",
  priceCurrency: "GBP",
  url: `${siteConfig.url}/website-development`,
  seller: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  },
  itemOffered: {
    "@type": "Service",
    name: websitePackage.name,
    description: websitePackage.description
  }
};

export default function WebsiteDevelopmentPage() {
  const hero = pages.websiteDevelopment.hero;

  return (
    <>
      <PageHero {...hero} />
      <PackageHighlight compact />
      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="A Straightforward Website Launch Process"
            description="The package is designed for businesses that want a professional launch without handling every setup task alone."
          />
          <ProcessSteps />
        </div>
      </section>
      <FAQSection categories={["general", "website"]} />
      <CTASection
        title="Start Your Complete Website for £200"
        description="Order the package through the client area or send your requirements through the contact page."
        primaryLabel="Order Website Package"
        secondaryLabel="Contact Us"
      />
      <JsonLd data={packageSchema} />
    </>
  );
}
