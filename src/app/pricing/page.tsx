import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { PackageHighlight } from "@/components/PackageHighlight";
import { PageHero } from "@/components/PageHero";
import { PricingSection } from "@/components/PricingSection";
import { pages } from "@/data/pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.pricing.seoTitle,
  description: pages.pricing.metaDescription,
  path: "/pricing"
});

export default function PricingPage() {
  const hero = pages.pricing.hero;

  return (
    <>
      <PageHero {...hero} />
      <PricingSection showHeader={false} />
      <PackageHighlight compact />
      <FAQSection categories={["general", "hosting", "website"]} />
      <CTASection
        title="Choose Hosting or a Full Website Launch"
        description="Order hosting through WHMCS, or choose the £200 package if you want the full launch handled."
        primaryLabel="Open Client Area"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
