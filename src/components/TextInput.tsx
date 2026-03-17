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
    padding: '11px 14px',
    borderRadius: '8px',
    border: error ? '1px solid var(--accent)' : '1px solid var(--border-default)',
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    fontWeight: '300',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const focusStyle = error
    ? {}
    : {
        borderColor: 'var(--accent)',
        boxShadow: '0 0 0 3px rgba(255,110,0,0.12)',
      };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-sage)',
        }}
      >
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
            if (!error) {
              Object.assign(e.currentTarget.style, focusStyle);
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.boxShadow = 'none';
            }
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
            if (!error) {
              Object.assign(e.currentTarget.style, focusStyle);
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        />
      )}
      {error && (
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
