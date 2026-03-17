'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FormWizard from '@/components/FormWizard';

function FormWithParams() {
  const params = useSearchParams();
  const itinerary = params.get('itinerary') ?? '';
  return <FormWizard itinerary={itinerary} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ color: 'white', padding: '2rem' }}>Loading...</div>}>
      <FormWithParams />
    </Suspense>
  );
}
