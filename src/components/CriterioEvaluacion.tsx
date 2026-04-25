import type { CSSProperties } from 'react';

interface CriterioEvaluacionProps {
  codigo: string;
  texto: string;
  color?: string;
}

export default function CriterioEvaluacion({
  codigo,
  texto,
  color = '#3b82f6',
}: CriterioEvaluacionProps) {
  return (
    <div
      className="tp-criterio"
      style={
        {
          '--tp-criterio-surface': `linear-gradient(135deg, ${color}10 0%, ${color}18 100%)`,
          '--tp-criterio-accent': color,
        } as CSSProperties
      }
    >
      <span className="tp-criterio-icon" aria-hidden="true">
        📋
      </span>
      <div>
        <div className="tp-criterio-header">
          <span className="tp-criterio-badge">{codigo}</span>
          <span className="tp-criterio-label">Criterio de Evaluacion</span>
        </div>
        <p className="tp-criterio-text">{texto}</p>
      </div>
    </div>
  );
}
