interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.62rem',
          fontWeight: '600',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-sage)',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        STEP {currentStep} OF {totalSteps}
      </div>
      <div
        style={{
          height: '3px',
          background: 'rgba(255,255,255,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--accent)',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
