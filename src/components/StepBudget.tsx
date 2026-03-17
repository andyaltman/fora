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

export default function StepBudget({ budget, onChange }: StepBudgetProps) {
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
        Budget
      </h2>

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
          PER PERSON BUDGET
        </label>
        <PillGrid>
          {budgetRanges.map((range) => (
            <PillButton
              key={range}
              label={range}
              selected={budget.perPerson === range}
              onClick={() => onChange({ perPerson: range })}
            />
          ))}
        </PillGrid>
      </div>

      <div>
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
          TIER
        </label>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
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
