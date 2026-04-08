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
    <div className="mobile-hero">
      {/* Full-screen background */}
      <div className="mobile-hero-bg">
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
      
      {/* Content container */}
      <div className="mobile-hero-content">
        <div className="mobile-hero-text">
          <p className="mobile-hero-tagline">AI-FIRST MARKETING</p>
          <h1>On a mission to solve marketing with <span className="hero-accent">AI.</span></h1>
          <div className="mobile-hero-pillars">
            <span>Customer Acquisition</span>
            <span>Brand Management</span>
            <span>Content & Ads</span>
            <span>Business Apps</span>
          </div>
        </div>
        
        {/* ShowReel positioned at bottom-right */}
        <div className="mobile-hero-showreel">
          <ShowReel />
        </div>
      </div>
    </div>
  );
}
