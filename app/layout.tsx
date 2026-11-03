import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: { default: 'Memory Lane — Notes on building for the web', template: '%s · Memory Lane' }, description: 'A small collection of notes on web architecture, thoughtful technology choices, and taking a website live.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><div className="site-shell"><header className="site-header"><Link href="/" className="brand" aria-label="Memory Lane home"><span className="brand-icon" aria-hidden="true">m.</span>memory lane</Link><nav aria-label="Main navigation"><Link href="/">Journal</Link><Link href="/about/">About</Link><span className="edition">VOL. 01 / 2026</span></nav></header>{children}<footer className="site-footer"><div><Link href="/" className="footer-brand">memory lane.</Link><p>A place to keep what clicks.</p></div><div className="footer-meta"><span>Notes by Luis Vega Torres</span><span>Built with care. Made for the web.</span><a href="#top">Back to top ↑</a></div></footer></div></body></html>;
}
