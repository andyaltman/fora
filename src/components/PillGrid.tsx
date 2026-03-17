import { ReactNode } from 'react';

interface PillGridProps {
  children: ReactNode;
}

export default function PillGrid({ children }: PillGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '0.75rem',
      }}
    >
      {children}
    </div>
  );
}
