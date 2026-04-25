import type { CSSProperties } from 'react';

const cards = [
  {
    icon: '📚',
    title: 'Niveles',
    description:
      'Accede al contenido organizado por nivel academico: modulos, guias y recursos para tercero medio.',
    link: '/conectividad-y-redes/niveles/tercero-medio/',
    badge: '3 Medio',
    style: {
      '--tp-card-bar': 'linear-gradient(90deg, #2e8555, #5de097)',
      '--tp-card-icon-bg': 'rgba(46, 133, 85, 0.13)',
      '--tp-card-icon-border': 'rgba(93, 224, 151, 0.28)',
      '--tp-card-badge-bg': 'rgba(46, 133, 85, 0.1)',
      '--tp-card-badge-border': 'rgba(93, 224, 151, 0.24)',
      '--tp-card-badge-color': '#1f6b3a',
      '--tp-card-button-bg': 'linear-gradient(135deg, #2e8555, #3da86b)',
      '--tp-card-button-shadow': 'rgba(46, 133, 85, 0.24)',
      '--tp-card-border-hover': 'rgba(93, 224, 151, 0.4)',
    } as CSSProperties,
  },
  {
    icon: '🗓',
    title: 'Planificacion',
    description:
      'Planificacion anual del Modulo 2 con distribucion de semanas, actividades, criterios y evaluaciones.',
    link: '/conectividad-y-redes/planificacion/modulo-2-ensamblado-computadores/',
    badge: 'Modulo 2',
    style: {
      '--tp-card-bar': 'linear-gradient(90deg, #2563eb, #60a5fa)',
      '--tp-card-icon-bg': 'rgba(37, 99, 235, 0.13)',
      '--tp-card-icon-border': 'rgba(96, 165, 250, 0.28)',
      '--tp-card-badge-bg': 'rgba(37, 99, 235, 0.1)',
      '--tp-card-badge-border': 'rgba(96, 165, 250, 0.24)',
      '--tp-card-badge-color': '#1d4ed8',
      '--tp-card-button-bg': 'linear-gradient(135deg, #2563eb, #3b82f6)',
      '--tp-card-button-shadow': 'rgba(37, 99, 235, 0.24)',
      '--tp-card-border-hover': 'rgba(96, 165, 250, 0.38)',
    } as CSSProperties,
  },
  {
    icon: '🧭',
    title: 'Ruta de modulo',
    description:
      'Ingreso directo al modulo de ensamblado y a la primera experiencia de aprendizaje migrada a Starlight.',
    link: '/conectividad-y-redes/niveles/tercero-medio/ensamblado/',
    badge: 'Guia larga',
    style: {
      '--tp-card-bar': 'linear-gradient(90deg, #ea7835, #fb923c)',
      '--tp-card-icon-bg': 'rgba(234, 120, 53, 0.13)',
      '--tp-card-icon-border': 'rgba(251, 146, 60, 0.28)',
      '--tp-card-badge-bg': 'rgba(234, 120, 53, 0.1)',
      '--tp-card-badge-border': 'rgba(251, 146, 60, 0.24)',
      '--tp-card-badge-color': '#b45309',
      '--tp-card-button-bg': 'linear-gradient(135deg, #ea7835, #f58d4a)',
      '--tp-card-button-shadow': 'rgba(234, 120, 53, 0.24)',
      '--tp-card-border-hover': 'rgba(251, 146, 60, 0.38)',
    } as CSSProperties,
  },
];

export default function RedesCards() {
  return (
    <div className="tp-redes-grid">
      {cards.map((card) => (
        <article key={card.title} className="tp-redes-card tp-card" style={card.style}>
          <div className="tp-redes-header">
            <span className="tp-redes-icon" aria-hidden="true">
              {card.icon}
            </span>
            <span className="tp-redes-badge">{card.badge}</span>
          </div>
          <div>
            <h3 className="tp-redes-title">{card.title}</h3>
            <p className="tp-redes-description">{card.description}</p>
          </div>
          <a href={card.link} className="tp-cta-link">
            Ir a {card.title} <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </div>
  );
}
