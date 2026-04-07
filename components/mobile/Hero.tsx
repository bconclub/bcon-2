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
      <div className="content">
        <p className="tagline">AI-FIRST MARKETING</p>
        <h1>On a mission to solve marketing with <span className="hero-accent">AI.</span></h1>
        <p className="description">
          <span className="service-item">Customer Acquisition</span>
          <span className="service-item">Brand Management</span>
          <span className="service-item">Content &amp; Ads</span>
          <span className="service-item">Business Apps</span>
        </p>
        <ShowReel />
      </div>
    </div>
  );
}
