import type { ReactNode } from 'react';

interface LeadProps {
  children: ReactNode;
}

export default function Lead({ children }: LeadProps) {
  return <p className="tp-lead">{children}</p>;
}
