'use client';

import ShowReel from '@/sections/ShowReel/ShowReel';
import './Hero.css';

export default function MobileHero() {
  return (
    <div className="mobile-hero">
      {/* Solid black background - no LiquidEther on mobile */}
      <div className="mobile-hero-bg" />
      
      {/* Content container */}
      <div className="mobile-hero-content">
        <div className="mobile-hero-text">
          <p className="mobile-hero-tagline">AI-FIRST MARKETING</p>
          <h1>Solve Marketing <br />With <span className="hero-accent">AI</span></h1>
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
