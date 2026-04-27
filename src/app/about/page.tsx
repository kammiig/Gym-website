import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCards } from "@/components/ServiceCards";
import { Testimonials } from "@/components/Testimonials";
import { pages } from "@/data/pages";
import { aboutStats, serviceCards } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pages.about.seoTitle,
  description: pages.about.metaDescription,
  path: "/about"
});

export default function AboutPage() {
  const hero = pages.about.hero;

  return (
    <>
      <PageHero {...hero} />
      <section className="section">
        <div className="container about-grid">
          <div>
            <SectionHeader
              align="left"
              eyebrow="What we do"
              title="Practical Hosting and Website Support"
              description="Planetic Solutions focuses on the essentials businesses need to get online: hosting, domains, client area support, and professional website development."
            />
            <p className="body-copy">
              The service is built for customers who want a fast, secure, and manageable online presence without dealing with disconnected suppliers or confusing setup steps.
            </p>
          </div>
          <div className="stats-grid">
            {aboutStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="Support From Hosting to Launch"
            description="The same website can use Planetic Solutions for hosting, domain registration, development, and ongoing client area support."
          />
          <ServiceCards services={serviceCards} />
        </div>
      </section>
      <Testimonials />
      <CTASection />
    </>
  );
}
