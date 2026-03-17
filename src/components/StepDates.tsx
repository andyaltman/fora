import type { TravelDates } from '@/types/form';
import PillButton from './PillButton';
import PillGrid from './PillGrid';

interface StepDatesProps {
  dates: TravelDates;
  onChange: (d: Partial<TravelDates>) => void;
  subtitle?: string;
}

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const years = ['2026', '2027'];

const modeButtonStyle = {
  width: '100%',
  padding: '1.1rem 1.5rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid var(--border-default)',
  borderRadius: '10px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontWeight: '500' as const,
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  textAlign: 'center' as const,
};

const modeButtonSelectedStyle = {
  ...modeButtonStyle,
  background: 'var(--accent-bg)',
  border: '1px solid var(--accent)',
};

export default function StepDates({ dates, onChange, subtitle = 'Help us plan the perfect trip' }: StepDatesProps) {
  const handleMonthToggle = (month: string) => {
    const current = dates.months;
    const next = current.includes(month)
      ? current.filter((m) => m !== month)
      : [...current, month];
    onChange({ months: next, undecided: false });
  };

  const handleYearSelect = (year: string) => {
    onChange({ year, undecided: false });
  };

  const handleUndecided = () => {
    onChange({ undecided: true, year: null, months: [] });
  };

  const dateInputStyle = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border-default)',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '300' as const,
    outline: 'none',
  };

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
        When would you like to travel?
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: '300',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
      }}>
        {subtitle}
      </p>

      {/* Mode selection — shown until a mode is chosen */}
      {dates.hasFixedDates === null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            style={modeButtonStyle}
            onClick={() => onChange({ hasFixedDates: true })}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'var(--accent-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            Client has fixed travel dates
          </button>
          <button
            style={modeButtonStyle}
            onClick={() => onChange({ hasFixedDates: false })}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'var(--accent-bg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            }}
          >
            Client has a rough idea of dates
          </button>
        </div>
      )}

      {/* Fixed dates — show date pickers */}
      {dates.hasFixedDates === true && (
        <div style={{ textAlign: 'left' }}>
          <button
            onClick={() => onChange({ hasFixedDates: null })}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              padding: 0,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            ← change
          </button>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ ...microLabel, textAlign: 'left' }}>START DATE</label>
              <input
                type="date"
                value={dates.startDate}
                onChange={(e) => onChange({ startDate: e.target.value })}
                style={dateInputStyle}
              />
            </div>
            <div>
              <label style={{ ...microLabel, textAlign: 'left' }}>END DATE</label>
              <input
                type="date"
                value={dates.endDate}
                onChange={(e) => onChange({ endDate: e.target.value })}
                style={dateInputStyle}
              />
            </div>
          </div>
        </div>
      )}

      {/* Rough idea — show year + multi-month + undecided */}
      {dates.hasFixedDates === false && (
        <div>
          <button
            onClick={() => onChange({ hasFixedDates: null })}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              padding: 0,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              margin: '0 auto 1.5rem',
            }}
          >
            ← change
          </button>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={microLabel}>TRAVEL YEAR</label>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
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

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={microLabel}>TRAVEL MONTH <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>(select all that apply)</span></label>
            <PillGrid>
              {months.map((month) => (
                <PillButton
                  key={month}
                  label={month}
                  selected={dates.months.includes(month)}
                  onClick={() => handleMonthToggle(month)}
                />
              ))}
            </PillGrid>
          </div>

          <div>
            <button
              onClick={handleUndecided}
              style={dates.undecided ? modeButtonSelectedStyle : {
                ...modeButtonStyle,
                borderRadius: '999px',
                padding: '0.5rem 1.25rem',
                width: 'auto',
              }}
            >
              UNDECIDED ON TRAVEL DATES
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
