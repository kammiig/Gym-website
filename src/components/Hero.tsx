import { pages } from "@/data/pages";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

export function Hero() {
  const hero = pages.home.hero;

  return (
    <section className="hero-section">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <div className="hero-proof" aria-label="Planetic Solutions service highlights">
            <span>
              <Icon name="ShieldCheck" size={18} /> Free SSL
            </span>
            <span>
              <Icon name="PanelTop" size={18} /> cPanel
            </span>
            <span>
              <Icon name="LifeBuoy" size={18} /> WHMCS Support
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Hosting command centre visual">
          <div className="status-row">
            <span className="status-dot" />
            <span>Server status: operational</span>
          </div>
          <div className="server-stack">
            {["SSD Hosting", "Secure Domains", "WHMCS Billing"].map((label, index) => (
              <div className="server-row" key={label}>
                <span>{label}</span>
                <div className="server-bars" aria-hidden="true">
                  <i style={{ width: `${72 + index * 8}%` }} />
                  <i style={{ width: `${52 + index * 12}%` }} />
                  <i style={{ width: `${36 + index * 15}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="hero-metrics">
            <div>
              <strong>99.9%</strong>
              <span>uptime focus</span>
            </div>
            <div>
              <strong>£200</strong>
              <span>site package</span>
            </div>
            <div>
              <strong>SSL</strong>
              <span>included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
