import { siteConfig } from "@/data/site";
import { ButtonLink } from "./ButtonLink";

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title = "Ready to Launch With Planetic Solutions?",
  description = "Start with hosting, register a domain, or choose the complete £200 website package and get practical support from setup to launch.",
  primaryLabel = "Open Client Area",
  primaryHref = siteConfig.clientAreaUrl,
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact"
}: CTASectionProps) {
  return (
    <section className="section cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cta-actions">
          <ButtonLink href={primaryHref} variant="light">
            {primaryLabel}
          </ButtonLink>
          <ButtonLink href={secondaryHref} variant="ghost">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
