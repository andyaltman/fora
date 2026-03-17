'use client';
import { useEffect, useRef } from 'react';
import type { FormState } from '@/types/form';

interface StepConfirmationProps {
  confirmClose?: string;
  formState: FormState;
  destinationLabel?: string;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; rotationSpeed: number;
}

function formatDates(dates: FormState['travelDates']): string {
  if (dates.hasFixedDates) {
    const fmt = (iso: string) => {
      if (!iso) return '—';
      const [y, m, d] = iso.split('-');
      return `${m}/${d}/${y}`;
    };
    return `${fmt(dates.startDate)} – ${fmt(dates.endDate)}`;
  }
  if (dates.undecided) return 'Undecided';
  const parts = [];
  if (dates.year) parts.push(dates.year);
  if (dates.months.length) parts.push(dates.months.join(', '));
  return parts.join(' · ') || '—';
}

function formatTravelers(t: FormState['travelers']): string {
  const parts: string[] = [];
  parts.push(`${t.adults} adult${t.adults !== 1 ? 's' : ''}`);
  if (t.children > 0) {
    const ages = t.childAges.length ? ` (ages ${t.childAges.join(', ')})` : '';
    parts.push(`${t.children} child${t.children !== 1 ? 'ren' : ''}${ages}`);
  }
  return parts.join(', ');
}

const row = (label: string, value: string, isLast = false) => (
  <div key={label} style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '0.65rem 0',
    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.07)',
  }}>
    <span style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.65rem',
      fontWeight: '600',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-sage)',
      flexShrink: 0,
      paddingTop: '1px',
    }}>
      {label}
    </span>
    <span style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.875rem',
      fontWeight: '300',
      color: 'var(--text-primary)',
      textAlign: 'right',
    }}>
      {value}
    </span>
  </div>
);

export default function StepConfirmation({
  confirmClose = 'Your Travel Designer will be in touch within 1–2 business days.',
  formState,
  destinationLabel,
}: StepConfirmationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#FF6E00', '#FAF8F4', '#f0a500', '#2a5054', '#a8d5a2'];
    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
    let animId: number;
    const startTime = Date.now();
    const animate = () => {
      if (Date.now() - startTime > 3500) { ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const { travelDates, travelers, budget, contact } = formState;

  const rows: Array<[string, string]> = [
    ...(destinationLabel ? [['Destination', destinationLabel] as [string, string]] : []),
    ['Dates', formatDates(travelDates)],
    ['Party', travelers.partyName],
    ['Travelers', formatTravelers(travelers)],
    ['Type', travelers.types.join(', ') || '—'],
    ['Budget', budget.perPerson || '—'],
    ['Tier', budget.tier || '—'],
    ['Contact', contact.name],
    ['Email', contact.email],
    ...(contact.notes ? [['Notes', contact.notes] as [string, string]] : []),
  ];

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}
      />

      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: '400',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem',
        }}>
          Enquiry Received
        </h2>
        <div style={{ width: '40px', height: '2px', background: 'var(--accent)', margin: '0 auto 1rem' }} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          fontWeight: '300',
          color: 'var(--text-muted)',
          lineHeight: '1.6',
          maxWidth: '380px',
          margin: '0 auto',
        }}>
          We&apos;ll send a confirmation email shortly. {confirmClose}
        </p>
      </div>

      {/* Summary card */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '0.25rem 1.25rem',
        marginBottom: '0.5rem',
      }}>
        {rows.map(([label, value], i) => row(label, value, i === rows.length - 1))}
      </div>
    </div>
  );
}
