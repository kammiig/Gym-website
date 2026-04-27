import { testimonials } from "@/data/testimonials";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeader
          eyebrow="Customer focus"
          title="Built for Simple Website Launches"
          description="Supportive hosting, practical website packages, and client area tools for businesses that want a clear path online."
        />
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial-card" key={testimonial.name}>
              <blockquote>&quot;{testimonial.quote}&quot;</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
