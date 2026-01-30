/**
 * Pricing Calculator Utility
 * Handles pricing calculations and lookups
 */

import { getPricing, getAppTypesForIndustry, getIndustries, pricingMatrix, AppTypePricing } from './pricingConfig';

export interface PricingRange {
  min: number;
  max: number;
}

export interface PricingQuote {
  industry: string;
  industryLabel: string;
  appType: string;
  appTypeLabel: string;
  description: string;
  pricingRange: PricingRange;
  features: string[];
  timeline: string;
}

/**
 * Calculate pricing quote based on industry and app type
 */
export function calculatePricing(industry: string, appType: string): PricingQuote | null {
  const pricing = getPricing(industry, appType);
  
  if (!pricing) {
    return null;
  }

  // Find industry label
  const industryConfig = pricingMatrix.find(
    (config) => config.industry === industry
  );
  
  return {
    industry,
    industryLabel: industryConfig?.label || industry,
    appType,
    appTypeLabel: pricing.label,
    description: pricing.description,
    pricingRange: {
      min: pricing.minPrice,
      max: pricing.maxPrice
    },
    features: pricing.features,
    timeline: pricing.timeline
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M+`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format price range for display
 */
export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

/**
 * Get all app types for an industry
 */
export function getAvailableAppTypes(industry: string): AppTypePricing[] {
  return getAppTypesForIndustry(industry);
}

/**
 * Validate industry selection
 */
export function isValidIndustry(industry: string): boolean {
  const industries = getIndustries();
  return industries.some((ind) => ind.value === industry);
}

/**
 * Validate app type for industry
 */
export function isValidAppTypeForIndustry(industry: string, appType: string): boolean {
  const appTypes = getAppTypesForIndustry(industry);
  return appTypes.some(type => type.type === appType);
}
