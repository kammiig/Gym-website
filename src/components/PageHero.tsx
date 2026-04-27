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
        <div className="page-hero-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Icon name="Server" size={30} />
            </div>
            <div>
              <span>Planetic hosting stack</span>
              <strong>Live support ready</strong>
            </div>
          </div>
          <div className="panel-services">
            <div className="panel-service">
              <Icon name="Zap" size={20} />
              <span>SSD hosting performance</span>
            </div>
            <div className="panel-service">
              <Icon name="ShieldCheck" size={20} />
              <span>SSL security included</span>
            </div>
            <div className="panel-service">
              <Icon name="PanelTop" size={20} />
              <span>cPanel website control</span>
            </div>
            <div className="panel-service">
              <Icon name="LifeBuoy" size={20} />
              <span>WHMCS client support</span>
            </div>
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
