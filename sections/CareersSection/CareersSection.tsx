'use client';

import { useEffect, useRef, useState } from 'react';
import './CareersSection.css';

export default function CareersSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`careers-section ${visible ? 'visible' : ''}`}
      aria-labelledby="careers-heading"
    >
      <div className="careers-stars" aria-hidden="true" />
      <div className="careers-grid">
        <div className="careers-astronaut" aria-hidden="true">
          <div className="astro-orbit">
            <div className="astro-body">👨‍🚀</div>
          </div>
        </div>

        <div className="careers-content">
          <p className="careers-kicker">ON TO THE MOON</p>
          <h2 id="careers-heading" className="careers-title">
            Join the crew.
          </h2>
          <div className="careers-positions">
            <div className="careers-position">
              <span className="careers-role">Developers</span>
              <span className="careers-desc">(who think in systems)</span>
            </div>
            <div className="careers-position">
              <span className="careers-role">Video Editors</span>
              <span className="careers-desc">(who tell stories)</span>
            </div>
            <div className="careers-position">
              <span className="careers-role">Dealmakers</span>
              <span className="careers-desc">(who close deals)</span>
            </div>
          </div>
          <a className="careers-cta" href="mailto:hello@bcon.club?subject=Join%20the%20Crew">
            APPLY NOW →
          </a>
        </div>
      </div>
    </section>
  );
}
