import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";

type PricingCardProps = {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    highlighted?: boolean;
  };
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article className={plan.highlighted ? "pricing-card highlighted" : "pricing-card"}>
      {plan.highlighted ? <span className="plan-pill">Popular</span> : null}
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <div className="price">
        <strong>{plan.price}</strong>
        <span>{plan.period}</span>
      </div>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>
            <Icon name="Check" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <ButtonLink href={plan.ctaHref} variant={plan.highlighted ? "primary" : "secondary"}>
        {plan.ctaLabel}
      </ButtonLink>
    </article>
  );
}
