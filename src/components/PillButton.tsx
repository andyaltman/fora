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
        padding: '0.6rem 1.2rem',
        borderRadius: '999px',
        border: selected ? '1px solid var(--accent)' : '1px solid var(--border-default)',
        background: selected ? 'var(--accent-bg)' : 'var(--bg-card)',
        color: selected ? 'var(--text-primary)' : 'var(--text-muted)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem',
        fontWeight: selected ? '600' : '400',
        transition: 'all 0.2s',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.background = 'var(--hover-bg)';
          e.currentTarget.style.borderColor = 'var(--hover-border)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !selected) {
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.borderColor = 'var(--border-default)';
        }
      }}
    >
      {label}
    </button>
  );
}
