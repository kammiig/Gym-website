import Link from "next/link";
import { footerLinkGroups, siteConfig } from "@/data/site";
import { ButtonLink } from "./ButtonLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand footer-logo">
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          <p>{siteConfig.description}</p>
          <div className="footer-contact">
            <span>{siteConfig.email}</span>
            <span>{siteConfig.supportLabel}</span>
          </div>
          <ButtonLink href={siteConfig.clientAreaUrl} variant="light">
            Open Client Area
          </ButtonLink>
        </div>

        {footerLinkGroups.map((group) => (
          <div className="footer-links" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) =>
              link.href.startsWith("http") ? (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>{siteConfig.copyright}</span>
        <span>Fast hosting. Secure domains. Practical website support.</span>
      </div>
    </footer>
  );
}
