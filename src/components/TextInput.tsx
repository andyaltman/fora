interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
}

export default function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required,
  multiline,
}: TextInputProps) {
  const baseStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: error ? '1px solid var(--accent)' : '1px solid var(--border-default)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    fontFamily: 'system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        {label}
        {required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          style={{
            ...baseStyle,
            resize: 'vertical',
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--hover-border)';
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--border-default)';
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--hover-border)';
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--border-default)';
          }}
        />
      )}
      {error && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--accent)' }}>
          {error}
        </div>
      )}
    </div>
  );
}
