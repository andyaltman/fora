interface PillButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function PillButton({ label, selected, onClick, disabled }: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: selected ? 'var(--accent-bg)' : 'transparent',
        border: selected ? '1px solid var(--accent)' : '1px solid var(--border-default)',
        borderRadius: '999px',
        padding: '0.4rem 1rem',
        fontFamily: 'var(--font-body)',
        fontWeight: selected ? '600' : '500',
        fontSize: '0.8rem',
        letterSpacing: '0.03em',
        color: selected ? 'var(--text-primary)' : 'var(--text-muted)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = 'var(--border-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {label}
    </button>
  );
}
