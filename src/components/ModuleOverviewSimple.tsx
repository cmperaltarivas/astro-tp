interface ModuleLink {
  label: string;
  href: string;
}

interface CriteriaEntry {
  title: string;
  href: string;
}

interface ModuleOverviewSimpleProps {
  title: string;
  description: string;
  levelLabel: string;
  moduleLabel: string;
  criteriaCount: number;
  links?: ModuleLink[];
  criteria?: CriteriaEntry[];
}

export default function ModuleOverviewSimple({
  title,
  description,
  levelLabel,
  moduleLabel,
  criteriaCount,
  links = [],
  criteria = [],
}: ModuleOverviewSimpleProps) {
  return (
    <section className="tp-module" aria-labelledby="tp-module-overview-title">
      <div className="tp-module-header">
        <div>
          <h2 id="tp-module-overview-title" className="tp-module-title">
            {title}
          </h2>
          <p className="tp-module-description">{description}</p>
        </div>
        <div className="tp-module-meta">
          <span className="tp-module-pill">{levelLabel}</span>
          <span className="tp-module-pill">{moduleLabel}</span>
          <span className="tp-module-pill">{criteriaCount} criterios</span>
        </div>
      </div>

      {links.length ? (
        <div className="tp-module-links">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="tp-module-link">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      {criteria.length ? (
        <ol className="tp-module-list">
          {criteria.map((criterion) => (
            <li key={criterion.href}>
              <a href={criterion.href}>{criterion.title}</a>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
