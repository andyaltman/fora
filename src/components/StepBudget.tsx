import type { Budget } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';

interface StepBudgetProps {
  budget: Budget;
  onChange: (b: Partial<Budget>) => void;
}

const budgetRanges = [
  'UNDER $10K',
  '$10K–$15K',
  '$15K–$20K',
  '$20K–$25K',
  'ABOVE $25K',
  'UNDECIDED',
];

const tiers = ['VALUE', 'MEDIUM', 'HIGH'];

const microLabel = {
  display: 'block',
  marginBottom: '0.75rem',
  fontFamily: 'var(--font-body)',
  fontSize: '0.68rem',
  fontWeight: '600' as const,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-sage)',
  textAlign: 'center' as const,
};

export default function StepBudget({ budget, onChange }: StepBudgetProps) {
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
        What&apos;s the budget?
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: '300',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
      }}>
        Per person, excluding flights
      </p>

      <div style={{ marginBottom: '1.75rem' }}>
        <label style={microLabel}>PER PERSON BUDGET</label>
        <div className="budget-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {budgetRanges.map((range) => (
            <PillButton
              key={range}
              label={range}
              selected={budget.perPerson === range}
              onClick={() => onChange({ perPerson: range })}
            />
          ))}
        </div>
      </div>

      <div>
        <label style={microLabel}>ITINERARY TIER</label>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          {tiers.map((tier) => (
            <PillButton
              key={tier}
              label={tier}
              selected={budget.tier === tier}
              onClick={() => onChange({ tier })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
