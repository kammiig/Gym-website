import { websitePackage } from "@/data/plans";

export function ProcessSteps() {
  return (
    <div className="process-grid">
      {websitePackage.process.map((step, index) => (
        <article className="process-card" key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
