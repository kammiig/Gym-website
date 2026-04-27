import { websitePackage } from "@/data/plans";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { SectionHeader } from "./SectionHeader";

type PackageHighlightProps = {
  compact?: boolean;
};

export function PackageHighlight({ compact = false }: PackageHighlightProps) {
  return (
    <section className={compact ? "section package-section compact" : "section package-section"}>
      <div className="container package-grid">
        <div className="package-copy">
          <SectionHeader
            align="left"
            eyebrow="Website development offer"
            title={`${websitePackage.name} - Only ${websitePackage.price}`}
            description={websitePackage.description}
          />
          <div className="package-actions">
            <ButtonLink href={websitePackage.ctaHref}>{websitePackage.ctaLabel}</ButtonLink>
            <ButtonLink href={websitePackage.secondaryCtaHref} variant="secondary">
              {websitePackage.secondaryCtaLabel}
            </ButtonLink>
          </div>
        </div>
        <div className="package-feature-list">
          {websitePackage.features.map((feature) => (
            <div className="package-feature" key={feature}>
              <Icon name="Check" size={18} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
