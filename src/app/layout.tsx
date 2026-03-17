import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fora — Travel Enquiry',
  description: 'Submit your travel enquiry',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
