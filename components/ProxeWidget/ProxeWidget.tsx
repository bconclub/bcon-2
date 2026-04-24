'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

const HIDDEN_ROUTES = ['/proxe', '/proxe-cfs'];

export default function ProxeWidget() {
  const pathname = usePathname();
  const shouldHide = HIDDEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldHide) return null;

  return (
    <Script
      src="https://proxe.bconclub.com/api/widget/embed.js"
      strategy="afterInteractive"
    />
  );
}
