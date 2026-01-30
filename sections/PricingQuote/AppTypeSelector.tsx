'use client';

import { getAppTypesForIndustry, AppTypePricing } from '@/lib/pricing/pricingConfig';
import './PricingQuote.css';

interface AppTypeSelectorProps {
  industry: string;
  selectedAppType: string | null;
  onSelect: (appType: string) => void;
  onBack: () => void;
}

export default function AppTypeSelector({ 
  industry, 
  selectedAppType, 
  onSelect, 
  onBack 
}: AppTypeSelectorProps) {
  const appTypes = getAppTypesForIndustry(industry);

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

      <h3 className="pricing-step-title">Select App Type</h3>
      <p className="pricing-step-description">
        Choose the type of business app you need. Each option includes different features and capabilities.
      </p>
      
      <div className="pricing-app-types-grid">
        {appTypes.map((appType: AppTypePricing) => (
          <button
            key={appType.type}
            type="button"
            className={`pricing-app-type-card ${selectedAppType === appType.type ? 'selected' : ''}`}
            onClick={() => onSelect(appType.type)}
          >
            <div className="pricing-app-type-header">
              <h4 className="pricing-app-type-title">{appType.label}</h4>
              {selectedAppType === appType.type && (
                <div className="pricing-option-check">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
            <p className="pricing-app-type-description">{appType.description}</p>
            <div className="pricing-app-type-features">
              <p className="pricing-features-label">Key Features:</p>
              <ul className="pricing-features-list">
                {appType.features.slice(0, 4).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
                {appType.features.length > 4 && (
                  <li className="pricing-features-more">+ {appType.features.length - 4} more</li>
                )}
              </ul>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
