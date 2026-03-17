'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

interface StepConfirmationProps {
  confirmClose?: string;
}

export default function StepConfirmation({ confirmClose = 'Your Travel Designer will be in touch within 1–2 business days.' }: StepConfirmationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF6E00', '#FAF8F4', '#f0a500', '#2a5054', '#ff6b6b'];
    const particles: Particle[] = [];

    // Create particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    const gravity = 0.15;
    const startTime = Date.now();
    const duration = 3000;

    function animate() {
      if (!canvas || !ctx) return;

      const elapsed = Date.now() - startTime;
      if (elapsed > duration) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div style={{ position: 'relative', textAlign: 'center', padding: '2rem 0' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: '400',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}
        >
          Enquiry Received
        </h2>
        <div
          style={{
            width: '40px',
            height: '2px',
            background: 'var(--accent)',
            margin: '0 auto 1rem',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: '300',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            maxWidth: '420px',
            margin: '0 auto',
          }}
        >
          We&apos;ll send a confirmation email shortly. {confirmClose}
        </p>
      </div>
    </div>
  );
}
