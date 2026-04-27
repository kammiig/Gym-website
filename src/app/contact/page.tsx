import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { contactServiceOptions } from "@/data/services";
import { pages } from "@/data/pages";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.contact.seoTitle,
  description: pages.contact.metaDescription,
  path: "/contact"
});

export default function ContactPage() {
  const hero = pages.contact.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-panel">
            <span className="eyebrow">Contact information</span>
            <h2>Planetic Solutions Support</h2>
            <p>
              Use the form for project enquiries, or open the WHMCS client area for billing,
              invoices, support tickets, hosting orders, and domain management.
            </p>
            <div className="contact-details">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href="/support">Create Support Ticket</a>
              <a href={siteConfig.clientAreaUrl}>Client Area and Support</a>
            </div>
          </div>
          <ContactForm serviceOptions={contactServiceOptions} />
        </div>
      </section>
      <CTASection
        title="Prefer the Client Area?"
        description="Existing customers can manage billing, services, tickets, and invoices directly through WHMCS."
        primaryLabel="Open Client Area"
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
