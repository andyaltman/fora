import type { Travelers } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';
import TextInput from './TextInput';

interface StepTravelersProps {
  travelers: Travelers;
  onChange: (t: Partial<Travelers>) => void;
}

const travelerTypes = ['SOLO', 'COUPLE', 'FAMILY', 'FRIENDS', 'GROUP', 'OTHER'];

export default function StepTravelers({ travelers, onChange }: StepTravelersProps) {
  const handleTypeToggle = (type: string) => {
    const isSelected = travelers.types.includes(type);
    let newTypes: string[];
    let newAdults = travelers.adults;

    if (isSelected) {
      newTypes = travelers.types.filter((t) => t !== type);
    } else {
      newTypes = [...travelers.types, type];
      // Auto-fill adults based on type
      if (type === 'SOLO' && newAdults === 0) {
        newAdults = 1;
      } else if (type === 'COUPLE' && newAdults === 0) {
        newAdults = 2;
      }
    }

    onChange({ types: newTypes, adults: newAdults });
  };

  const showAdults = travelers.types.length > 0;
  const showChildren = travelers.types.includes('FAMILY');

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
        }}
      >
        Who is Traveling?
      </h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <TextInput
          label="Party Name (Optional)"
          value={travelers.partyName}
          onChange={(v) => onChange({ partyName: v })}
          placeholder="e.g., The Smith Family"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            fontWeight: '600',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-sage)',
          }}
        >
          TRAVELER TYPE
        </label>
        <PillGrid>
          {travelerTypes.map((type) => (
            <PillButton
              key={type}
              label={type}
              selected={travelers.types.includes(type)}
              onClick={() => handleTypeToggle(type)}
            />
          ))}
        </PillGrid>
      </div>

      {showAdults && (
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-sage)',
            }}
          >
            NUMBER OF ADULTS
          </label>
          <input
            type="number"
            min="1"
            value={travelers.adults || ''}
            onChange={(e) => onChange({ adults: parseInt(e.target.value) || 0 })}
            style={{
              width: '100%',
              minWidth: '80px',
              padding: '11px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: '300',
            }}
          />
        </div>
      )}

      {showChildren && (
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-sage)',
            }}
          >
            NUMBER OF CHILDREN
          </label>
          <input
            type="number"
            min="0"
            value={travelers.children || ''}
            onChange={(e) => onChange({ children: parseInt(e.target.value) || 0 })}
            style={{
              width: '100%',
              minWidth: '80px',
              padding: '11px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: '300',
            }}
          />
        </div>
      )}
    </div>
  );
}
