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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600' }}>Travelers</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <TextInput
          label="Party Name (Optional)"
          value={travelers.partyName}
          onChange={(v) => onChange({ partyName: v })}
          placeholder="e.g., The Smith Family"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Traveler Type
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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Number of Adults
          </label>
          <input
            type="number"
            min="1"
            value={travelers.adults || ''}
            onChange={(e) => onChange({ adults: parseInt(e.target.value) || 0 })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
            }}
          />
        </div>
      )}

      {showChildren && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Number of Children
          </label>
          <input
            type="number"
            min="0"
            value={travelers.children || ''}
            onChange={(e) => onChange({ children: parseInt(e.target.value) || 0 })}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontFamily: 'system-ui, sans-serif',
            }}
          />
        </div>
      )}
    </div>
  );
}
