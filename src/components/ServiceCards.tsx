import Link from "next/link";
import { Icon } from "./Icon";

type Service = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

type ServiceCardsProps = {
  services: Service[];
};

export function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <div className="service-grid">
      {services.map((service) => {
        const content = (
          <>
            <div className="icon-badge">
              <Icon name={service.icon} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="text-link">
              Learn more <Icon name="ArrowRight" size={16} />
            </span>
          </>
        );

        return service.href.startsWith("http") ? (
          <a className="service-card" href={service.href} key={service.title}>
            {content}
          </a>
        ) : (
          <Link className="service-card" href={service.href} key={service.title}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
