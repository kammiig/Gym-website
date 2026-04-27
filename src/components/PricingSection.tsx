import { hostingPlans } from "@/data/plans";
import { PricingCard } from "./PricingCard";
import { SectionHeader } from "./SectionHeader";

type PricingSectionProps = {
  showHeader?: boolean;
};

export function PricingSection({ showHeader = true }: PricingSectionProps) {
  return (
    <section className="section">
      <div className="container">
        {showHeader ? (
          <SectionHeader
            eyebrow="Hosting plans"
            title="Dynamic Hosting Pricing"
            description="Plans are generated from one editable data file, so prices and features stay easy to maintain."
          />
        ) : null}
        <div className="pricing-grid">
          {hostingPlans.map((plan) => (
            <PricingCard plan={plan} key={plan.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
