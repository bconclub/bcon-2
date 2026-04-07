'use client';

import dynamic from 'next/dynamic';

import ShowReel from '@/sections/ShowReel/ShowReel';
import './Hero.css';

// Dynamically import LiquidEther to avoid SSR issues with Three.js
const DynamicLiquidEther = dynamic(
  () => import('@/effects/LiquidEther/LiquidEther'),
  { ssr: false }
);

export default function MobileHero() {
  return (
    <div className="container mobile-hero">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <DynamicLiquidEther
          colors={['#6B2FE8', '#CCFF00', '#CDFC2E']}
          mouseForce={25}
          cursorSize={120}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={2.8}
          dt={0.04}
          iterationsPoisson={20}
          iterationsViscous={16}
        />
      </div>
      <div className="content">
        <div className="hero-text-col">
          <p className="tagline">AI-FIRST MARKETING</p>
          <h1>On a mission to solve marketing with <span className="hero-accent">AI.</span></h1>
          <p className="description">
            <span className="service-item">Customer Acquisition</span>
            <span className="service-item">Brand Management</span>
            <span className="service-item">Content &amp; Ads</span>
            <span className="service-item">Business Apps</span>
          </p>
        </div>
        <div className="hero-reel-col">
          <ShowReel />
        </div>
      </div>
    </div>
  );
}
