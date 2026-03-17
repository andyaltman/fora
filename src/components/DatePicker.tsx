'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

interface DatePickerProps {
  label: string;
  value: string;           // ISO: YYYY-MM-DD
  onChange: (v: string) => void;
  min?: string;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

function parseISO(iso: string): Date | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function toDisplay(iso: string): string {
  const d = parseISO(iso);
  if (!d) return '';
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
}

function parseDisplay(s: string): string {
  // Accept mm/dd/yyyy
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return '';
  const dt = new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]));
  if (isNaN(dt.getTime())) return '';
  return toISO(dt);
}

export default function DatePicker({ label, value, onChange, min }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(toDisplay(value));
  const [viewYear, setViewYear] = useState(() => {
    const d = parseISO(value);
    return d ? d.getFullYear() : new Date().getFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const d = parseISO(value);
    return d ? d.getMonth() : new Date().getMonth();
  });

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync text when value changes externally
  useEffect(() => {
    setText(toDisplay(value));
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selectDate = useCallback((iso: string) => {
    onChange(iso);
    setText(toDisplay(iso));
    setOpen(false);
  }, [onChange]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setText(raw);
    const iso = parseDisplay(raw);
    if (iso) {
      onChange(iso);
      const d = parseISO(iso)!;
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  };

  const handleTextBlur = () => {
    // Reformat on blur if valid, else keep as-is
    const iso = parseDisplay(text);
    if (iso) {
      setText(toDisplay(iso));
    } else if (!text) {
      onChange('');
    }
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const today = toISO(new Date());
  const selectedISO = value;
  const minDate = min || '';

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cellISO = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    return cellISO(day) < minDate;
  };

  // Styles
  const inputWrap: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${open ? 'var(--accent)' : 'var(--border-default)'}`,
    borderRadius: '8px',
    transition: 'border-color 0.15s',
    cursor: 'text',
  };

  const calendarStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    zIndex: 200,
    background: '#1a4a4e',
    border: '1px solid var(--border-hover)',
    borderRadius: '10px',
    padding: '1rem',
    width: '280px',
    maxWidth: 'calc(100vw - 2rem)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
  };

  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontFamily: 'var(--font-body)',
        fontSize: '0.68rem',
        fontWeight: '600',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-sage)',
      }}>
        {label}
      </label>

      <div ref={wrapRef} style={{ position: 'relative' }}>
        <div
          style={inputWrap}
          onClick={() => { setOpen(true); inputRef.current?.focus(); }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="MM/DD/YYYY"
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onFocus={() => setOpen(true)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: '11px 14px',
              fontFamily: 'var(--font-body)',
              fontWeight: '300',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
            }}
          />
          {/* Calendar icon */}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ marginRight: '12px', opacity: 0.5, flexShrink: 0, cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
          >
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {open && (
          <div style={calendarStyle}>
            {/* Month/year navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.875rem',
            }}>
              <button
                type="button"
                onClick={prevMonth}
                style={{
                  background: 'none', border: 'none', color: 'var(--text-primary)',
                  cursor: 'pointer', padding: '4px 8px', borderRadius: '4px',
                  fontSize: '1rem', lineHeight: 1, opacity: 0.7,
                }}
              >
                ‹
              </button>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: '400',
                color: 'var(--text-primary)',
              }}>
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                style={{
                  background: 'none', border: 'none', color: 'var(--text-primary)',
                  cursor: 'pointer', padding: '4px 8px', borderRadius: '4px',
                  fontSize: '1rem', lineHeight: 1, opacity: 0.7,
                }}
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.25rem' }}>
              {DAYS.map(d => (
                <div key={d} style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  fontWeight: '600',
                  letterSpacing: '0.06em',
                  color: 'var(--text-sage)',
                  padding: '4px 0',
                }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const iso = cellISO(day);
                const isSelected = iso === selectedISO;
                const isToday = iso === today;
                const disabled = isDisabled(day);
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && selectDate(iso)}
                    style={{
                      background: isSelected ? 'var(--accent)' : 'none',
                      border: isToday && !isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                      borderRadius: '6px',
                      color: isSelected ? '#fff' : disabled ? 'rgba(255,255,255,0.2)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: isSelected ? '600' : '300',
                      fontSize: '0.8rem',
                      padding: '5px 2px',
                      textAlign: 'center',
                      cursor: disabled ? 'default' : 'pointer',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected && !disabled)
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = 'none';
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
