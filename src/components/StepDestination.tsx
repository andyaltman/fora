import type { Destination } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';

interface StepDestinationProps {
  destination: Destination;
  onChange: (d: Partial<Destination>) => void;
}

const destinations = [
  'BOTSWANA',
  'KENYA',
  'NAMIBIA',
  'RWANDA',
  'SOUTH AFRICA',
  'TANZANIA',
  'ZAMBIA',
  'ZIMBABWE',
  'OTHER',
];

export default function StepDestination({ destination, onChange }: StepDestinationProps) {
  // Selecting a destination clears "undecided"; multi-select toggle otherwise.
  const handleToggle = (value: string) => {
    const isSelected = destination.selected.includes(value);
    const selected = isSelected
      ? destination.selected.filter((d) => d !== value)
      : [...destination.selected, value];
    onChange({ selected, undecided: false });
  };

  // "I haven't decided yet" is mutually exclusive with any destination.
  const handleUndecided = () => {
    if (destination.undecided) {
      onChange({ undecided: false });
    } else {
      onChange({ undecided: true, selected: [] });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.7rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: '1.2',
        }}
      >
        Where would you like to travel?
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: '300',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}
      >
        Select one or more, or let us help you decide
      </p>

      <div style={{ marginBottom: '0.75rem' }}>
        <PillGrid>
          {destinations.map((value) => (
            <PillButton
              key={value}
              label={value}
              selected={destination.selected.includes(value)}
              onClick={() => handleToggle(value)}
            />
          ))}
        </PillGrid>
      </div>

      <button
        type="button"
        onClick={handleUndecided}
        style={{
          width: '100%',
          background: destination.undecided ? 'var(--accent-bg)' : 'transparent',
          border: destination.undecided
            ? '1px solid var(--accent)'
            : '1px solid var(--border-default)',
          borderRadius: '999px',
          padding: '0.4rem 1rem',
          fontFamily: 'var(--font-body)',
          fontWeight: destination.undecided ? '600' : '500',
          fontSize: '0.8rem',
          letterSpacing: '0.03em',
          color: destination.undecided ? 'var(--text-primary)' : 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (!destination.undecided) {
            e.currentTarget.style.borderColor = 'var(--border-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          }
        }}
        onMouseLeave={(e) => {
          if (!destination.undecided) {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        I HAVEN&apos;T DECIDED YET
      </button>
    </div>
  );
}
