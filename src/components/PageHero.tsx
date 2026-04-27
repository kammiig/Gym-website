import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="hero-actions">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="page-hero-panel" aria-hidden="true">
          <div className="panel-icon">
            <Icon name="Server" size={30} />
          </div>
          <div className="panel-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="panel-badges">
            <span>Fast</span>
            <span>Secure</span>
            <span>Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
