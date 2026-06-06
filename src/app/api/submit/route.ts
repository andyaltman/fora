import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Flag submissions that originate from local development so they can be
    // filtered out in Zapier. Localhost host header (next dev / next start) or a
    // non-production NODE_ENV both indicate a test submission; Vercel deploys are
    // always NODE_ENV=production on their real domain.
    const host = req.headers.get('host') ?? '';
    const isLocalhost =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.startsWith('[::1]');
    const isTest = isLocalhost || process.env.NODE_ENV !== 'production';

    const outgoing = {
      ...payload,
      test: isTest,
      environment: isTest ? 'test' : 'production',
      submittedFrom: host,
    };

    const res = await fetch('https://hooks.zapier.com/hooks/catch/7993579/up6qc9d/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(outgoing),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Webhook failed: ${res.status}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
