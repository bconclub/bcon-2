'use client';

import { PricingQuote } from '@/lib/pricing/pricingCalculator';
import { formatPriceRange } from '@/lib/pricing/pricingCalculator';
import './PricingQuote.css';

interface PricingDisplayProps {
  quote: PricingQuote;
  onStartBuild: () => void;
  onBack: () => void;
  onStartOver: () => void;
}

export default function PricingDisplay({ 
  quote, 
  onStartBuild, 
  onBack, 
  onStartOver 
}: PricingDisplayProps) {
  return (
    <div className="pricing-step-content">
      <button 
        type="button"
        className="pricing-back-button"
        onClick={onBack}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back
      </button>

      <div className="pricing-quote-display">
        <div className="pricing-quote-header">
          <h3 className="pricing-quote-title">Your Pricing Quote</h3>
          <p className="pricing-quote-subtitle">
            {quote.industryLabel} • {quote.appTypeLabel}
          </p>
        </div>

        <div className="pricing-range-display">
          <div className="pricing-range-min">
            <span className="pricing-range-label">Starting from</span>
            <span className="pricing-range-amount pricing-range-min-amount">
              ${quote.pricingRange.min.toLocaleString()}
            </span>
          </div>
          <div className="pricing-range-separator">-</div>
          <div className="pricing-range-max">
            <span className="pricing-range-label">Up to</span>
            <span className="pricing-range-amount pricing-range-max-amount">
              ${quote.pricingRange.max.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="pricing-range-summary">
          <p className="pricing-range-text">
            {formatPriceRange(quote.pricingRange.min, quote.pricingRange.max)}
          </p>
          <p className="pricing-range-note">
            Final pricing depends on specific requirements, integrations, and customization needs.
          </p>
        </div>

        <div className="pricing-quote-details">
          <div className="pricing-detail-section">
            <h4 className="pricing-detail-title">What's Included</h4>
            <ul className="pricing-features-list-full">
              {quote.features.map((feature, index) => (
                <li key={index} className="pricing-feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="pricing-detail-section">
            <h4 className="pricing-detail-title">Estimated Timeline</h4>
            <p className="pricing-timeline">{quote.timeline}</p>
          </div>
        </div>

        <div className="pricing-quote-actions">
          <button
            type="button"
            className="pricing-cta-primary"
            onClick={onStartBuild}
          >
            Start Your Build
          </button>
          <button
            type="button"
            className="pricing-cta-secondary"
            onClick={onStartOver}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
