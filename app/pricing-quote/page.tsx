'use client';

import PricingQuoteComponent from '@/sections/PricingQuote/PricingQuote';
import LiquidEther from '@/components/LiquidEther';

export default function PricingQuotePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000000' }}>
      <LiquidEther />
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '100px' }}>
        <PricingQuoteComponent />
      </div>
    </div>
  );
}
