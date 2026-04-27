import { pages } from "@/data/pages";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

export function Hero() {
  const hero = pages.home.hero;
  const dashboardItems = [
    {
      title: "SSD Hosting",
      description: "Fast storage, cPanel tools, and free SSL for business websites.",
      icon: "Zap",
      badge: "Performance"
    },
    {
      title: "Secure Domains",
      description: "Register, renew, and manage domains from the WHMCS client area.",
      icon: "Globe2",
      badge: "Management"
    },
    {
      title: "WHMCS Billing",
      description: "Invoices, orders, support tickets, and services in one portal.",
      icon: "CreditCard",
      badge: "Client area"
    }
  ];

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
            {dashboardItems.map((item) => (
              <div className="server-row" key={item.title}>
                <div className="server-row-icon">
                  <Icon name={item.icon} size={22} />
                </div>
                <div>
                  <div className="server-row-heading">
                    <strong>{item.title}</strong>
                    <span>{item.badge}</span>
                  </div>
                  <p>{item.description}</p>
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
