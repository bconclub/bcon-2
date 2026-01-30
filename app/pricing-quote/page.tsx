'use client';

import dynamic from 'next/dynamic';
import PricingQuoteComponent from '@/sections/PricingQuote/PricingQuote';

// Dynamically import LiquidEther to avoid SSR issues with Three.js
const DynamicLiquidEther = dynamic(
  () => import('@/effects/LiquidEther/LiquidEther'),
  { ssr: false }
);

export default function PricingQuotePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000000' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <DynamicLiquidEther
          colors={['#CCFF00', '#CCFF00', '#CCFF00']}
          mouseForce={20}
          cursorSize={100}
          resolution={0.3}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={2.2}
          dt={0.04}
          iterationsPoisson={16}
          iterationsViscous={16}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '100px' }}>
        <PricingQuoteComponent />
      </div>
    </div>
  );
}
