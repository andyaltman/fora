import type { FormState } from '@/types/form';

export async function submitEnquiry(state: FormState, itinerary: string): Promise<void> {
  const payload = {
    itinerary,
    travelDates: state.travelDates,
    travelers: state.travelers,
    budget: state.budget,
    contact: state.contact,
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch('https://hooks.zapier.com/hooks/catch/7993579/up6qc9d/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
}
