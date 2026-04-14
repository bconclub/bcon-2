'use client';

import dynamic from 'next/dynamic';

import ShowReel from '@/sections/ShowReel/ShowReel';

// Dynamically import LiquidEther to avoid SSR issues with Three.js
const DynamicLiquidEther = dynamic(
  () => import('@/effects/LiquidEther/LiquidEther'),
  { ssr: false }
);

export default function DesktopHero() {
  return (
    <div className="container">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <DynamicLiquidEther
          colors={['#6B2FE8', '#CCFF00', '#CDFC2E']}
          mouseForce={25}
          cursorSize={120}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.35}
          autoIntensity={3.0}
          dt={0.04}
          iterationsPoisson={20}
          iterationsViscous={16}
        />
      </div>
      <div className="content">
        <p className="tagline">AI-FIRST MARKETING</p>
        <h1>On a mission to solve marketing with <span className="hero-accent">AI.</span></h1>
        <p className="description">
          Customer Acquisition · Brand Management · Content & Ads · Business Apps
        </p>
        <ShowReel />
      </div>
    </div>
  );
}
