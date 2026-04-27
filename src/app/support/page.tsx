import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SupportTicketForm } from "@/components/SupportTicketForm";
import { pages } from "@/data/pages";
import { supportDepartments, supportPriorities } from "@/data/services";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.support.seoTitle,
  description: pages.support.metaDescription,
  path: "/support"
});

export default function SupportPage() {
  const hero = pages.support.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container support-grid">
          <div className="support-panel">
            <span className="eyebrow">Email ticket system</span>
            <h2>How Support Tickets Work</h2>
            <p>
              Submit the form and a ticket email will be sent to Planetic Solutions at{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. The
              email is prepared with your address as the reply target, so the team can respond
              directly by email.
            </p>
            <div className="support-steps">
              <div>
                <strong>1</strong>
                <span>Create a ticket with your service details.</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Planetic Solutions receives the ticket by email.</span>
              </div>
              <div>
                <strong>3</strong>
                <span>You receive replies directly in your inbox.</span>
              </div>
            </div>
          </div>
          <SupportTicketForm departments={supportDepartments} priorities={supportPriorities} />
        </div>
      </section>
      <CTASection
        title="Need Billing or Service Access?"
        description="For invoices, orders, hosting services, and domain management, use the WHMCS client area."
        primaryLabel="Open Client Area"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
