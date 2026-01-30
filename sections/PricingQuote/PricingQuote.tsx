'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculatePricing, PricingQuote } from '@/lib/pricing/pricingCalculator';
import IndustrySelector from './IndustrySelector';
import AppTypeSelector from './AppTypeSelector';
import PricingDisplay from './PricingDisplay';
import './PricingQuote.css';

interface PricingQuoteProps {
  onStartBuild?: (quoteData: {
    industry: string;
    appType: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

export default function PricingQuoteComponent({ onStartBuild }: PricingQuoteProps = {}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedAppType, setSelectedAppType] = useState<string | null>(null);
  const [quote, setQuote] = useState<PricingQuote | null>(null);

  // Track quote started
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'pricing_quote_started'
      });
    }
  }, []);

  // Load from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedIndustry = sessionStorage.getItem('pricing_quote_industry');
      const savedAppType = sessionStorage.getItem('pricing_quote_app_type');
      
      if (savedIndustry && savedAppType) {
        setSelectedIndustry(savedIndustry);
        setSelectedAppType(savedAppType);
        const calculatedQuote = calculatePricing(savedIndustry, savedAppType);
        if (calculatedQuote) {
          setQuote(calculatedQuote);
          setCurrentStep(3);
        }
      } else if (savedIndustry) {
        setSelectedIndustry(savedIndustry);
        setCurrentStep(2);
      }
    }
  }, []);

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pricing_quote_industry', industry);
    }
    setCurrentStep(2);
  };

  const handleAppTypeSelect = (appType: string) => {
    if (!selectedIndustry) return;
    
    setSelectedAppType(appType);
    const calculatedQuote = calculatePricing(selectedIndustry, appType);
    
    if (calculatedQuote) {
      setQuote(calculatedQuote);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('pricing_quote_app_type', appType);
        
        // Track quote completed
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            'event': 'pricing_quote_completed',
            'industry': selectedIndustry,
            'appType': appType,
            'minPrice': calculatedQuote.pricingRange.min,
            'maxPrice': calculatedQuote.pricingRange.max
          });
        }
      }
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedAppType(null);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedIndustry(null);
    setSelectedAppType(null);
    setQuote(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pricing_quote_industry');
      sessionStorage.removeItem('pricing_quote_app_type');
    }
  };

  const handleStartBuild = () => {
    if (!quote) return;

    // Track build started
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'pricing_quote_build_started',
        'industry': quote.industry,
        'appType': quote.appType,
        'minPrice': quote.pricingRange.min,
        'maxPrice': quote.pricingRange.max
      });
    }

    // Store quote data for contact form pre-fill
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pricing_quote_min_price', quote.pricingRange.min.toString());
      sessionStorage.setItem('pricing_quote_max_price', quote.pricingRange.max.toString());
    }

    // Call custom handler or redirect to contact form
    if (onStartBuild) {
      onStartBuild({
        industry: quote.industry,
        appType: quote.appType,
        minPrice: quote.pricingRange.min,
        maxPrice: quote.pricingRange.max
      });
    } else {
      // Redirect to contact form with hash for pre-fill
      router.push('/#contact');
      
      // Scroll to contact form after a short delay
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  return (
    <div className="pricing-quote-container">
      <div className="pricing-quote-wrapper">
        {/* Progress Indicator */}
        <div className="pricing-progress">
          <div className="pricing-progress-steps">
            <div className={`pricing-progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="pricing-progress-step-number">1</div>
              <span className="pricing-progress-step-label">Industry</span>
            </div>
            <div className={`pricing-progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="pricing-progress-step-number">2</div>
              <span className="pricing-progress-step-label">App Type</span>
            </div>
            <div className={`pricing-progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="pricing-progress-step-number">3</div>
              <span className="pricing-progress-step-label">Quote</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="pricing-quote-content">
          {currentStep === 1 && (
            <IndustrySelector
              selectedIndustry={selectedIndustry}
              onSelect={handleIndustrySelect}
            />
          )}

          {currentStep === 2 && selectedIndustry && (
            <AppTypeSelector
              industry={selectedIndustry}
              selectedAppType={selectedAppType}
              onSelect={handleAppTypeSelect}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && quote && (
            <PricingDisplay
              quote={quote}
              onStartBuild={handleStartBuild}
              onBack={handleBack}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
}
