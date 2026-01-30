'use client';

import { getIndustries } from '@/lib/pricing/pricingConfig';
import './PricingQuote.css';

interface IndustrySelectorProps {
  selectedIndustry: string | null;
  onSelect: (industry: string) => void;
}

export default function IndustrySelector({ selectedIndustry, onSelect }: IndustrySelectorProps) {
  const industries = getIndustries();

  return (
    <div className="pricing-step-content">
      <h3 className="pricing-step-title">Select Your Industry</h3>
      <p className="pricing-step-description">
        Choose the industry that best matches your business to see relevant app types and pricing.
      </p>
      
      <div className="pricing-options-grid">
        {industries.map((industry) => (
          <button
            key={industry.value}
            type="button"
            className={`pricing-option-card ${selectedIndustry === industry.value ? 'selected' : ''}`}
            onClick={() => onSelect(industry.value)}
          >
            <div className="pricing-option-content">
              <h4 className="pricing-option-title">{industry.label}</h4>
            </div>
            {selectedIndustry === industry.value && (
              <div className="pricing-option-check">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
