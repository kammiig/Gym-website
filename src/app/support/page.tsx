import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SupportTicketForm } from "@/components/SupportTicketForm";
import { pages } from "@/data/pages";
import { supportDepartments, supportPriorities } from "@/data/services";
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
      <section className="section support-portal-section">
        <div className="container">
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
