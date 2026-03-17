import type { Travelers } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';
import TextInput from './TextInput';

interface StepTravelersProps {
  travelers: Travelers;
  onChange: (t: Partial<Travelers>) => void;
}

const travelerTypes = ['SOLO', 'COUPLE', 'FAMILY', 'FRIENDS', 'GROUP', 'OTHER'];

// ── Stepper component ─────────────────────────────────────────────────────────
interface StepperProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

function Stepper({ label, sublabel, value, min = 0, max = 20, onChange }: StepperProps) {
  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
    border: '1px solid var(--border-default)',
    borderRadius: '6px',
    color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '1.1rem',
    lineHeight: 1,
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all 0.12s',
    flexShrink: 0,
  });

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid var(--border-default)',
      borderRadius: '10px',
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontWeight: '500',
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
        }}>
          {label}
        </div>
        {sublabel && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: '300',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            marginTop: '1px',
          }}>
            {sublabel}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <button
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          style={btnStyle(value <= min)}
          onMouseEnter={(e) => { if (value > min) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
        >
          −
        </button>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          minWidth: '20px',
          textAlign: 'center',
        }}>
          {value}
        </span>
        <button
          type="button"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          style={btnStyle(value >= max)}
          onMouseEnter={(e) => { if (value < max) e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function StepTravelers({ travelers, onChange }: StepTravelersProps) {
  const handleTypeToggle = (type: string) => {
    const isSelected = travelers.types.includes(type);
    let newTypes: string[];
    let newAdults = travelers.adults;

    if (isSelected) {
      newTypes = travelers.types.filter((t) => t !== type);
    } else {
      newTypes = [...travelers.types, type];
      if (type === 'SOLO' && newAdults === 0) newAdults = 1;
      else if (type === 'COUPLE' && newAdults === 0) newAdults = 2;
    }

    onChange({ types: newTypes, adults: newAdults });
  };

  const handleChildrenChange = (count: number) => {
    const current = travelers.childAges;
    let newAges: number[];
    if (count > current.length) {
      newAges = [...current, ...Array(count - current.length).fill(5)];
    } else {
      newAges = current.slice(0, count);
    }
    onChange({ children: count, childAges: newAges });
  };

  const handleChildAge = (index: number, age: number) => {
    const newAges = [...travelers.childAges];
    newAges[index] = age;
    onChange({ childAges: newAges });
  };

  const showAdults = travelers.types.length > 0;
  const showChildren = travelers.types.includes('FAMILY');

  const microLabel: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.68rem',
    fontWeight: '600',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-sage)',
    textAlign: 'center',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.7rem',
        fontWeight: '400',
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
        lineHeight: '1.2',
      }}>
        Who is Traveling?
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: '300',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
      }}>
        Tell us about the travel party
      </p>

      <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <TextInput
          label="Party Name"
          value={travelers.partyName}
          onChange={(v) => onChange({ partyName: v })}
          placeholder="e.g., The Smith Family"
          required
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={microLabel}>TRAVELER TYPE</label>
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
        <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
          <label style={{ ...microLabel, textAlign: 'left' }}>TRAVELERS</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Stepper
              label="Adults"
              sublabel="Ages 13+"
              value={travelers.adults}
              min={1}
              onChange={(v) => onChange({ adults: v })}
            />
            {showChildren && (
              <Stepper
                label="Children"
                sublabel="Ages 2–12"
                value={travelers.children}
                min={0}
                onChange={handleChildrenChange}
              />
            )}
          </div>
        </div>
      )}

      {showChildren && travelers.children > 0 && (
        <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
          <label style={{ ...microLabel, textAlign: 'left' }}>CHILD AGES</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {travelers.childAges.map((age, i) => (
              <Stepper
                key={i}
                label={`Child ${i + 1}`}
                sublabel="Years old"
                value={age}
                min={1}
                max={12}
                onChange={(v) => handleChildAge(i, v)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
