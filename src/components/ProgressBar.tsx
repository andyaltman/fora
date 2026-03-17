interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const segments = [1, 2, 3, 4];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {segments.map((segment) => (
        <div
          key={segment}
          style={{
            width: '40px',
            height: '4px',
            borderRadius: '2px',
            background: currentStep >= segment ? 'var(--accent)' : 'var(--border-default)',
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
}
