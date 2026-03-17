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
          fontSize: '1.6rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
        }}
      >
        Contact Details
      </h2>

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
