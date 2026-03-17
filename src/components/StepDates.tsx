import type { TravelDates } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';

interface StepDatesProps {
  dates: TravelDates;
  onChange: (d: Partial<TravelDates>) => void;
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = ['2026', '2027'];

export default function StepDates({ dates, onChange }: StepDatesProps) {
  const handleYearSelect = (year: string) => {
    onChange({ year, undecided: false });
  };

  const handleMonthSelect = (month: string) => {
    onChange({ month, undecided: false });
  };

  const handleUndecided = () => {
    onChange({ undecided: true, year: null, month: null });
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600' }}>Travel Dates</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={dates.hasFixedDates}
            onChange={(e) => onChange({ hasFixedDates: e.target.checked })}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.875rem' }}>Client has fixed travel dates</span>
        </label>
      </div>

      {dates.hasFixedDates ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Start Date
            </label>
            <input
              type="date"
              value={dates.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
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
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              End Date
            </label>
            <input
              type="date"
              value={dates.endDate}
              onChange={(e) => onChange({ endDate: e.target.value })}
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
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Year
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {years.map((year) => (
                <PillButton
                  key={year}
                  label={year}
                  selected={dates.year === year}
                  onClick={() => handleYearSelect(year)}
                />
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Month
            </label>
            <PillGrid>
              {months.map((month) => (
                <PillButton
                  key={month}
                  label={month}
                  selected={dates.month === month}
                  onClick={() => handleMonthSelect(month)}
                />
              ))}
            </PillGrid>
          </div>

          <div style={{ width: '100%' }}>
            <PillButton
              label="UNDECIDED ON TRAVEL DATES"
              selected={dates.undecided}
              onClick={handleUndecided}
            />
          </div>
        </div>
      )}
    </div>
  );
}
