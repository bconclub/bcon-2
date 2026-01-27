'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import './privacy.css';

// Dynamically import LiquidEther to avoid SSR issues with Three.js
const DynamicLiquidEther = dynamic(
  () => import('@/effects/LiquidEther/LiquidEther'),
  { ssr: false }
);

export default function PrivacyPage() {
  return (
    <div className="privacy-container">
      {/* Background effect - same as homepage */}
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
      
      {/* Content container */}
      <div className="privacy-content">
        <div className="privacy-header">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-last-updated">Last Updated: January 27, 2026</p>
        </div>

        <div className="privacy-body">
          <section className="privacy-section">
            <h2 className="privacy-section-title">1. Introduction</h2>
            <p>
              BCON Club ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://bconclub.com" className="privacy-link">bconclub.com</a> (the "Website").
            </p>
            <p>
              By using our Website, you consent to the data practices described in this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our Website.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">2. Information We Collect</h2>
            
            <h3 className="privacy-subsection-title">2.1 Information You Provide</h3>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out contact forms or lead generation forms</li>
              <li>Subscribe to our newsletter</li>
              <li>Request information about our services</li>
              <li>Communicate with us via email or other methods</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company/Brand name</li>
              <li>Service interests</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="privacy-subsection-title">2.2 Automatically Collected Information</h3>
            <p>When you visit our Website, we automatically collect certain information about your device and browsing behavior, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of visits</li>
              <li>Screen resolution and viewport size</li>
              <li>Language preferences</li>
              <li>Timezone</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li><strong>To provide and improve our services:</strong> To respond to your inquiries, provide requested information, and improve our Website and services</li>
              <li><strong>Marketing and communications:</strong> To send you newsletters, marketing materials, and other communications (with your consent where required)</li>
              <li><strong>Analytics and performance:</strong> To analyze Website usage, track user behavior, and improve user experience</li>
              <li><strong>Legal compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              <li><strong>Business operations:</strong> To manage our business operations, prevent fraud, and ensure security</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies, web beacons, and similar tracking technologies to collect and store information about your interactions with our Website. These technologies help us:
            </p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze Website traffic and usage patterns</li>
              <li>Provide personalized content and advertisements</li>
              <li>Improve Website functionality</li>
            </ul>

            <h3 className="privacy-subsection-title">4.1 Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the Website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website</li>
              <li><strong>Marketing Cookies:</strong> Used to track visitors across websites for marketing purposes</li>
            </ul>

            <h3 className="privacy-subsection-title">4.2 Third-Party Tracking Services</h3>
            <p>We use the following third-party services that may set cookies and collect information:</p>
            <ul>
              <li><strong>Google Analytics 4:</strong> Web analytics service (Measurement ID: G-4VCRN5SNVT)</li>
              <li><strong>Google Tag Manager:</strong> Tag management system (Container ID: GTM-KT7RKT5)</li>
              <li><strong>Microsoft Clarity:</strong> Website analytics and user behavior tracking (Project ID: i1r2rc40oc)</li>
              <li><strong>Meta Pixel (Facebook Pixel):</strong> Advertising and analytics service (Pixel ID: 915761229111306)</li>
            </ul>
            <p>
              These services may collect information such as your IP address, browser type, pages visited, and other browsing data. You can opt out of certain tracking by adjusting your browser settings or using opt-out tools provided by these services.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">5. Data Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as web hosting, analytics, email delivery, and customer support</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government regulation</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others</li>
              <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
            </ul>
            <p>
              We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            <p>
              Security measures we employ include:
            </p>
            <ul>
              <li>Encryption of data in transit using SSL/TLS</li>
              <li>Secure server infrastructure</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">8. Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of certain data collection and processing activities</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where consent is the legal basis</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
            <p>
              You can also manage cookie preferences through your browser settings. Note that disabling certain cookies may affect Website functionality.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">9. Children's Privacy</h2>
            <p>
              Our Website is not intended for children under the age of 13 (or the applicable age of majority in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our Website, you consent to the transfer of your information to these countries.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">11. Links to Third-Party Websites</h2>
            <p>
              Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p>
              Your continued use of the Website after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">13. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="privacy-contact-info">
              <p><strong>BCON Club</strong></p>
              <p>
                Email: <a href="mailto:info@bconclub.com" className="privacy-link">info@bconclub.com</a>
              </p>
              <p>
                Website: <a href="https://bconclub.com" className="privacy-link">https://bconclub.com</a>
              </p>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">14. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul>
              <li>The right to know what personal information is collected, used, shared, or sold</li>
              <li>The right to delete personal information held by us</li>
              <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">15. European Privacy Rights (GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR), including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure ("right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </section>
        </div>

        <div className="privacy-footer">
          <Link href="/" className="privacy-home-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
