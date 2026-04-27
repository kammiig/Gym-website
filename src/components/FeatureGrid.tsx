import { Icon } from "./Icon";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

type FeatureGridProps = {
  features: Feature[];
};

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="feature-grid">
      {features.map((feature) => (
        <article className="feature-card" key={feature.title}>
          <div className="icon-badge">
            <Icon name={feature.icon} />
          </div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </div>
  );
}
