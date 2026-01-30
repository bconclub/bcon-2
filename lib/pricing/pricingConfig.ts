/**
 * Pricing Configuration Matrix
 * Defines pricing ranges for different industry + app type combinations
 */

export interface AppTypePricing {
  type: string;
  label: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  features: string[];
  timeline: string;
}

export interface IndustryPricing {
  industry: string;
  label: string;
  appTypes: AppTypePricing[];
}

export const pricingMatrix: IndustryPricing[] = [
  {
    industry: 'retail',
    label: 'Retail',
    appTypes: [
      {
        type: 'e-commerce',
        label: 'E-commerce Platform',
        description: 'Complete online store with product catalog, shopping cart, payment integration, and order management',
        minPrice: 25000,
        maxPrice: 80000,
        features: [
          'Product catalog & inventory',
          'Shopping cart & checkout',
          'Payment gateway integration',
          'Order management system',
          'Customer accounts',
          'Admin dashboard'
        ],
        timeline: '8-16 weeks'
      },
      {
        type: 'inventory-management',
        label: 'Inventory Management System',
        description: 'Real-time inventory tracking, stock alerts, supplier management, and reporting',
        minPrice: 20000,
        maxPrice: 60000,
        features: [
          'Real-time stock tracking',
          'Automated reorder alerts',
          'Supplier management',
          'Multi-location support',
          'Analytics & reporting',
          'Barcode scanning integration'
        ],
        timeline: '6-12 weeks'
      },
      {
        type: 'customer-portal',
        label: 'Customer Portal',
        description: 'Self-service portal for order tracking, account management, and support',
        minPrice: 15000,
        maxPrice: 45000,
        features: [
          'Order history & tracking',
          'Account management',
          'Support ticket system',
          'Loyalty program integration',
          'Document access',
          'Mobile responsive'
        ],
        timeline: '4-10 weeks'
      }
    ]
  },
  {
    industry: 'travel',
    label: 'Travel & Hospitality',
    appTypes: [
      {
        type: 'booking-system',
        label: 'Booking & Reservation System',
        description: 'Complete booking platform for hotels, flights, tours, and activities with real-time availability',
        minPrice: 30000,
        maxPrice: 90000,
        features: [
          'Real-time availability calendar',
          'Multi-property management',
          'Payment processing',
          'Email confirmations',
          'Cancellation management',
          'Reporting dashboard'
        ],
        timeline: '10-18 weeks'
      },
      {
        type: 'travel-platform',
        label: 'Travel Management Platform',
        description: 'Comprehensive travel platform with trip planning, itinerary management, and booking integration',
        minPrice: 40000,
        maxPrice: 120000,
        features: [
          'Trip planning & itinerary builder',
          'Flight & hotel booking',
          'Activity recommendations',
          'Real-time flight tracking',
          'Social sharing',
          'Mobile app integration'
        ],
        timeline: '12-20 weeks'
      }
    ]
  },
  {
    industry: 'restaurant',
    label: 'Food & Restaurant',
    appTypes: [
      {
        type: 'restaurant-management',
        label: 'Restaurant Management System',
        description: 'Complete restaurant solution with table reservations, menu management, order tracking, and POS integration',
        minPrice: 25000,
        maxPrice: 75000,
        features: [
          'Table reservation system',
          'Menu management',
          'Order tracking',
          'POS integration',
          'Customer loyalty program',
          'Kitchen display system'
        ],
        timeline: '8-16 weeks'
      },
      {
        type: 'online-ordering',
        label: 'Online Ordering Platform',
        description: 'Direct ordering system with WhatsApp integration, delivery tracking, and payment processing',
        minPrice: 20000,
        maxPrice: 60000,
        features: [
          'WhatsApp ordering',
          'Menu customization',
          'Order tracking',
          'Payment integration',
          'Delivery management',
          'Customer accounts'
        ],
        timeline: '6-12 weeks'
      }
    ]
  },
  {
    industry: 'education',
    label: 'Education',
    appTypes: [
      {
        type: 'learning-management',
        label: 'Learning Management System',
        description: 'Complete LMS with course creation, student enrollment, assessments, and progress tracking',
        minPrice: 35000,
        maxPrice: 100000,
        features: [
          'Course creation & management',
          'Student enrollment',
          'Assessment engine',
          'Progress tracking',
          'Video streaming',
          'Certification system'
        ],
        timeline: '10-18 weeks'
      },
      {
        type: 'student-portal',
        label: 'Student Portal',
        description: 'Onboarding and management portal for students with tests, booking, and progress tracking',
        minPrice: 20000,
        maxPrice: 60000,
        features: [
          'Student onboarding',
          'Assessment tests',
          'Booking system',
          'Progress dashboard',
          'Instructor dashboard',
          'Conversion tracking'
        ],
        timeline: '6-14 weeks'
      }
    ]
  },
  {
    industry: 'healthcare',
    label: 'Healthcare',
    appTypes: [
      {
        type: 'patient-portal',
        label: 'Patient Portal',
        description: 'Secure patient portal for appointments, medical records, prescriptions, and communication',
        minPrice: 40000,
        maxPrice: 120000,
        features: [
          'Appointment scheduling',
          'Medical records access',
          'Prescription management',
          'Secure messaging',
          'HIPAA compliance',
          'Telemedicine integration'
        ],
        timeline: '12-20 weeks'
      },
      {
        type: 'appointment-system',
        label: 'Appointment Management System',
        description: 'Scheduling system with automated reminders, waitlist management, and calendar integration',
        minPrice: 20000,
        maxPrice: 60000,
        features: [
          'Online scheduling',
          'Automated reminders',
          'Waitlist management',
          'Calendar sync',
          'Multi-provider support',
          'Reporting dashboard'
        ],
        timeline: '6-12 weeks'
      }
    ]
  },
  {
    industry: 'real-estate',
    label: 'Real Estate',
    appTypes: [
      {
        type: 'property-management',
        label: 'Property Management Platform',
        description: 'Complete property management with listings, tenant management, maintenance requests, and payments',
        minPrice: 30000,
        maxPrice: 90000,
        features: [
          'Property listings',
          'Tenant management',
          'Maintenance requests',
          'Payment processing',
          'Document management',
          'Reporting & analytics'
        ],
        timeline: '10-18 weeks'
      },
      {
        type: 'crm-system',
        label: 'Real Estate CRM',
        description: 'CRM system for agents with lead management, property tracking, and client communication',
        minPrice: 25000,
        maxPrice: 70000,
        features: [
          'Lead management',
          'Property tracking',
          'Client communication',
          'Deal pipeline',
          'Email integration',
          'Analytics dashboard'
        ],
        timeline: '8-16 weeks'
      }
    ]
  },
  {
    industry: 'professional-services',
    label: 'Professional Services',
    appTypes: [
      {
        type: 'crm-system',
        label: 'CRM System',
        description: 'Customer relationship management with lead tracking, pipeline management, and reporting',
        minPrice: 25000,
        maxPrice: 70000,
        features: [
          'Lead management',
          'Pipeline tracking',
          'Contact management',
          'Email integration',
          'Task management',
          'Analytics & reporting'
        ],
        timeline: '8-16 weeks'
      },
      {
        type: 'client-portal',
        label: 'Client Portal',
        description: 'Secure client portal for project collaboration, document sharing, and communication',
        minPrice: 20000,
        maxPrice: 60000,
        features: [
          'Project collaboration',
          'Document sharing',
          'Secure messaging',
          'Invoice & payment',
          'Time tracking',
          'Mobile access'
        ],
        timeline: '6-14 weeks'
      }
    ]
  },
  {
    industry: 'manufacturing',
    label: 'Manufacturing',
    appTypes: [
      {
        type: 'production-management',
        label: 'Production Management System',
        description: 'Manufacturing operations management with production planning, quality control, and inventory',
        minPrice: 40000,
        maxPrice: 120000,
        features: [
          'Production planning',
          'Quality control tracking',
          'Inventory management',
          'Equipment monitoring',
          'Work order management',
          'Analytics dashboard'
        ],
        timeline: '12-20 weeks'
      },
      {
        type: 'supply-chain',
        label: 'Supply Chain Management',
        description: 'End-to-end supply chain visibility with supplier management, logistics tracking, and forecasting',
        minPrice: 35000,
        maxPrice: 100000,
        features: [
          'Supplier management',
          'Logistics tracking',
          'Demand forecasting',
          'Purchase order management',
          'Warehouse management',
          'Analytics & reporting'
        ],
        timeline: '10-18 weeks'
      }
    ]
  },
  {
    industry: 'other',
    label: 'Other',
    appTypes: [
      {
        type: 'ai-automation',
        label: 'AI-Powered Automation System',
        description: 'Intelligent business automation with AI assistants, workflow automation, and analytics',
        minPrice: 40000,
        maxPrice: 150000,
        features: [
          'AI-powered automation',
          '24/7 AI assistants',
          'Workflow builder',
          'Multi-channel integration',
          'Real-time analytics',
          'Custom AI training'
        ],
        timeline: '12-24 weeks'
      },
      {
        type: 'custom-app',
        label: 'Custom Business App',
        description: 'Fully customized business application tailored to your specific needs and requirements',
        minPrice: 30000,
        maxPrice: 200000,
        features: [
          'Custom features & functionality',
          'Tailored user experience',
          'Integration capabilities',
          'Scalable architecture',
          'Ongoing support',
          'Custom development'
        ],
        timeline: '10-24 weeks'
      }
    ]
  }
];

/**
 * Get all available industries
 */
export function getIndustries(): Array<{ value: string; label: string }> {
  return pricingMatrix.map(industry => ({
    value: industry.industry,
    label: industry.label
  }));
}

/**
 * Get app types for a specific industry
 */
export function getAppTypesForIndustry(industry: string): AppTypePricing[] {
  const industryConfig = pricingMatrix.find(config => config.industry === industry);
  return industryConfig?.appTypes || [];
}

/**
 * Get pricing for specific industry + app type combination
 */
export function getPricing(industry: string, appType: string): AppTypePricing | null {
  const industryConfig = pricingMatrix.find(config => config.industry === industry);
  if (!industryConfig) return null;
  
  const appTypeConfig = industryConfig.appTypes.find(type => type.type === appType);
  return appTypeConfig || null;
}
