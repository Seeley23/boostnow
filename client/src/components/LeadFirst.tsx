import React from 'react';

interface LeadFirstProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Lead-First Paragraph (Princeton / GEO guidelines)
 * Exactly 20–40 words, self-contained answer under H2/H3.
 */
export function LeadFirst({ children, className = '' }: LeadFirstProps) {
  return (
    <p className={`text-lg md:text-xl leading-relaxed mb-6 ${className}`} style={{ color: 'rgba(247,248,250,0.75)' }}>
      {children}
    </p>
  );
}

export default LeadFirst;
