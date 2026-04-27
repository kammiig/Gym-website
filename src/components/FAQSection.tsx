import { faqs } from "@/data/faqs";
import { SectionHeader } from "./SectionHeader";

type FAQSectionProps = {
  categories?: string[];
  title?: string;
  description?: string;
};

export function FAQSection({
  categories,
  title = "Frequently Asked Questions",
  description = "Answers to common questions about hosting, domains, client area support, and website development."
}: FAQSectionProps) {
  const items = categories
    ? faqs.filter((faq) => categories.includes(faq.category))
    : faqs;

  return (
    <section className="section faq-section">
      <div className="container narrow">
        <SectionHeader eyebrow="FAQs" title={title} description={description} />
        <div className="faq-list">
          {items.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
