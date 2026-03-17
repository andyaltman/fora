import type { Contact } from '@/types/form';
import TextInput from './TextInput';

interface StepDetailsProps {
  contact: Contact;
  onChange: (c: Partial<Contact>) => void;
  error?: string;
}

export default function StepDetails({ contact, onChange, error }: StepDetailsProps) {
  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.7rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: '1.2',
          textAlign: 'center',
        }}
      >
        Your Details
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: '300',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        We&apos;ll be in touch within 1–2 business days
      </p>

      <TextInput
        label="Name"
        value={contact.name}
        onChange={(v) => onChange({ name: v })}
        placeholder="Your full name"
        required
      />

      <TextInput
        label="Email"
        value={contact.email}
        onChange={(v) => onChange({ email: v })}
        type="email"
        placeholder="your@email.com"
        required
        error={error}
      />

      <TextInput
        label="Additional Notes"
        value={contact.notes}
        onChange={(v) => onChange({ notes: v })}
        placeholder="Any special requests or information..."
        multiline
      />
    </div>
  );
}
