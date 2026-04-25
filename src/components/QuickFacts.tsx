interface QuickFactItem {
  label: string;
  value: string;
}

interface QuickFactsProps {
  items: QuickFactItem[];
}

export default function QuickFacts({ items }: QuickFactsProps) {
  if (!items.length) return null;

  return (
    <div className="tp-quickfacts-grid">
      {items.map((item) => (
        <article key={`${item.label}-${item.value}`} className="tp-quickfacts-card">
          <span className="tp-quickfacts-label">{item.label}</span>
          <strong className="tp-quickfacts-value">{item.value}</strong>
        </article>
      ))}
    </div>
  );
}
