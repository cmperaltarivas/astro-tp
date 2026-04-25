import type { CSSProperties } from 'react';

type SectionCardColor = 'green' | 'blue' | 'orange' | 'purple' | 'teal';

export interface SectionCard {
  icon: string;
  title: string;
  description: string;
  link?: string;
  badge?: string;
  color: SectionCardColor;
  actionLabel?: string;
}

interface SectionCardsProps {
  cards: SectionCard[];
  columns?: number;
}

const colorMap: Record<SectionCardColor, CSSProperties> = {
  green: {
    '--tp-card-bar': 'linear-gradient(90deg, #15803d, #22c55e)',
    '--tp-card-icon-bg': 'rgba(34, 197, 94, 0.15)',
    '--tp-card-icon-border': 'rgba(74, 222, 128, 0.3)',
    '--tp-card-badge-bg': 'rgba(34, 197, 94, 0.15)',
    '--tp-card-badge-border': 'rgba(74, 222, 128, 0.35)',
    '--tp-card-badge-color': '#14532d',
    '--tp-card-button-bg': 'linear-gradient(135deg, #15803d, #16a34a)',
    '--tp-card-button-shadow': 'rgba(34, 197, 94, 0.3)',
    '--tp-card-border-hover': 'rgba(74, 222, 128, 0.5)',
  },
  blue: {
    '--tp-card-bar': 'linear-gradient(90deg, #2563eb, #60a5fa)',
    '--tp-card-icon-bg': 'rgba(37, 99, 235, 0.12)',
    '--tp-card-icon-border': 'rgba(96, 165, 250, 0.28)',
    '--tp-card-badge-bg': 'rgba(37, 99, 235, 0.1)',
    '--tp-card-badge-border': 'rgba(96, 165, 250, 0.24)',
    '--tp-card-badge-color': '#1d4ed8',
    '--tp-card-button-bg': 'linear-gradient(135deg, #2563eb, #3b82f6)',
    '--tp-card-button-shadow': 'rgba(37, 99, 235, 0.24)',
    '--tp-card-border-hover': 'rgba(96, 165, 250, 0.38)',
  },
  orange: {
    '--tp-card-bar': 'linear-gradient(90deg, #ea7835, #fb923c)',
    '--tp-card-icon-bg': 'rgba(234, 120, 53, 0.15)',
    '--tp-card-icon-border': 'rgba(251, 146, 60, 0.25)',
    '--tp-card-badge-bg': 'rgba(234, 120, 53, 0.12)',
    '--tp-card-badge-border': 'rgba(251, 146, 60, 0.3)',
    '--tp-card-badge-color': '#b45309',
    '--tp-card-button-bg': 'linear-gradient(135deg, #ea7835, #f58d4a)',
    '--tp-card-button-shadow': 'rgba(234, 120, 53, 0.24)',
    '--tp-card-border-hover': 'rgba(251, 146, 60, 0.38)',
  },
  purple: {
    '--tp-card-bar': 'linear-gradient(90deg, #7c3aed, #a78bfa)',
    '--tp-card-icon-bg': 'rgba(124, 58, 237, 0.14)',
    '--tp-card-icon-border': 'rgba(167, 139, 250, 0.25)',
    '--tp-card-badge-bg': 'rgba(124, 58, 237, 0.12)',
    '--tp-card-badge-border': 'rgba(167, 139, 250, 0.28)',
    '--tp-card-badge-color': '#6d28d9',
    '--tp-card-button-bg': 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    '--tp-card-button-shadow': 'rgba(139, 92, 246, 0.24)',
    '--tp-card-border-hover': 'rgba(167, 139, 250, 0.4)',
  },
  teal: {
    '--tp-card-bar': 'linear-gradient(90deg, #0d9488, #2dd4bf)',
    '--tp-card-icon-bg': 'rgba(20, 184, 166, 0.15)',
    '--tp-card-icon-border': 'rgba(45, 212, 191, 0.25)',
    '--tp-card-badge-bg': 'rgba(20, 184, 166, 0.12)',
    '--tp-card-badge-border': 'rgba(45, 212, 191, 0.3)',
    '--tp-card-badge-color': '#0f766e',
    '--tp-card-button-bg': 'linear-gradient(135deg, #0d9488, #14b8a6)',
    '--tp-card-button-shadow': 'rgba(20, 184, 166, 0.24)',
    '--tp-card-border-hover': 'rgba(45, 212, 191, 0.38)',
  },
};

export default function SectionCards({ cards, columns }: SectionCardsProps) {
  const cols = columns ?? (cards.length <= 2 ? cards.length : 3);

  return (
    <div
      className="tp-sectioncards-grid"
      style={{ '--tp-sectioncards-columns': `repeat(${cols}, minmax(0, 1fr))` } as CSSProperties}
    >
      {cards.map((card) => (
        <article key={card.title} className="tp-card" style={colorMap[card.color]}>
          <div className="tp-card-header">
            <div className="tp-card-icon" aria-hidden="true">
              {card.icon}
            </div>
            {card.badge ? <span className="tp-card-badge">{card.badge}</span> : null}
          </div>
          <div>
            <h3 className="tp-card-title">{card.title}</h3>
            <p className="tp-card-description">{card.description}</p>
          </div>
          {card.link ? (
            <a href={card.link} className="tp-cta-link">
              {card.actionLabel ?? `Ver ${card.title}`} <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span className="tp-cta-link tp-cta-link-disabled">Proximamente</span>
          )}
        </article>
      ))}
    </div>
  );
}
