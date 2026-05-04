'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  CERTS_BY_YEAR,
  CERTIFICATIONS,
  PLATFORM_STYLES,
  LEVEL_BADGE,
  certLabels,
  type Certification,
} from '@/data/certifications';
import { Award } from 'lucide-react';
import { CertLightbox } from '@/components/ui/CertLightbox';

gsap.registerPlugin(ScrollTrigger);

interface CertCardProps {
  cert: Certification;
  platformStyle: { bg: string; text: string; border: string };
  levelBadge: { label: string; style: React.CSSProperties };
  isTop: boolean;
  onClick: () => void;
}

function CertCard({ cert, platformStyle, levelBadge, isTop, onClick }: CertCardProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.borderColor = isTop
      ? 'rgba(139,92,246,0.4)'
      : 'var(--border-color)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.borderColor = isTop
      ? 'rgba(139,92,246,0.2)'
      : 'var(--border-color)';
  };

  return (
    <div
      id={`cert-${cert.id}`}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      className="cert-card group"
      role="button"
      tabIndex={0}
      style={{
        padding: isTop ? '16px 20px' : '12px 20px',
        borderRadius: '8px',
        border: isTop
          ? '0.5px solid rgba(139,92,246,0.2)'
          : '0.5px solid var(--border-color)',
        background: isTop ? 'rgba(139,92,246,0.04)' : 'transparent',
        textDecoration: 'none',
        display: 'block',
        transition: 'border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Badge del issuer */}
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: platformStyle.bg,
            border: `0.5px solid ${platformStyle.border}`,
            fontFamily: 'monospace',
            fontSize: '11px',
            fontWeight: 700,
            color: platformStyle.text,
            letterSpacing: '0.05em',
          }}
        >
          {cert.issuerInitials}
        </div>

        {/* Nombre y issuer */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '3px',
            }}
          >
            <span
              style={{
                fontFamily: 'inherit',
                fontSize: isTop ? '14px' : '13px',
                fontWeight: isTop ? 500 : 400,
                color: isTop
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {cert.name}
            </span>

            {/* Badge de nivel */}
            <span
              style={{
                ...levelBadge.style,
                fontFamily: 'monospace',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '3px',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}
            >
              {levelBadge.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: platformStyle.text,
                opacity: 0.8,
              }}
            >
              {cert.issuer}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
              &middot;
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              {cert.month} {cert.year}
            </span>

            {/* Skills inline */}
            <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
              &middot;
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {cert.skills.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        {/* Arrow — indica "ver certificado" */}
        <span
          className="cert-arrow"
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            color: 'var(--text-muted)',
            opacity: 0,
            transform: 'translateX(-4px)',
            transition: 'opacity 0.2s, transform 0.2s',
            flexShrink: 0,
          }}
        >
          &#9104;
        </span>
      </div>
    </div>
  );
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const labels = certLabels[language];
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const initialHashHandled = useRef(false);

  const openCert = useCallback((cert: Certification) => {
    setActiveCert(cert);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${cert.id}`);
    }
  }, []);

  const closeCert = useCallback(() => {
    setActiveCert(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '#certificaciones');
    }
  }, []);

  // Open cert from URL hash on mount
  useEffect(() => {
    if (initialHashHandled.current) return;

    const hash = window.location.hash.replace('#', '').trim();
    if (!hash || hash === 'certificaciones') {
      initialHashHandled.current = true;
      return;
    }

    const cert = CERTIFICATIONS.find(c => c.id === hash);
    if (cert) {
      initialHashHandled.current = true;
      // Scroll to section first, then open
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
      setTimeout(() => {
        openCert(cert);
      }, 600);
    }
  }, [openCert]);

  // Listen for hashchange (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'certificaciones') {
        if (activeCert) setActiveCert(null);
        return;
      }
      const cert = CERTIFICATIONS.find(c => c.id === hash);
      if (cert && cert.id !== activeCert?.id) {
        setActiveCert(cert);
      } else if (!cert && activeCert) {
        setActiveCert(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeCert]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.cert-year-label', { opacity: 1, x: 0 });
        gsap.set('.cert-timeline-line', { scaleY: 1 });
        gsap.set('.cert-card', { opacity: 1, x: 0 });
        return;
      }

      // Año label: entra desde la izquierda
      gsap.from('.cert-year-label', {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.certs-timeline',
          start: 'top 80%',
          once: true,
        },
      });

      // La línea vertical crece de arriba a abajo
      gsap.from('.cert-timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.certs-timeline',
          start: 'top 75%',
          once: true,
        },
      });

      // Cards entran escalonadas
      gsap.from('.cert-card', {
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.certs-timeline',
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Años en orden descendente
  const years = Object.keys(CERTS_BY_YEAR)
    .map(Number)
    .sort((a, b) => b - a);

  const maxYear = Math.max(...years);

  return (
    <section
      ref={sectionRef}
      id="certificaciones"
      className="py-24 scroll-mt-24 border-t border-[var(--border-color)]"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header de sección */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-3.5 w-3.5 text-warm" />
              <span className="text-xs font-mono tracking-widest text-warm">
                {labels.sectionLabel}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-serif text-[var(--text-primary)] leading-snug">
              {labels.title}
              <br />
              <span className="opacity-50">{labels.subtitle}</span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="certs-timeline relative grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-12">
          {/* Línea vertical — solo en desktop */}
          <div
            className="cert-timeline-line absolute hidden md:block"
            style={{
              left: '239px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--border-color)',
            }}
          />

          {/* Columna izquierda: años — desktop */}
          <div className="relative hidden md:block">
            {years.map((year) => {
              const certsInYear = CERTS_BY_YEAR[year];
              const isMaxYear = year === maxYear;

              return (
                <div
                  key={year}
                  className="cert-year-label"
                  style={{
                    position: 'sticky',
                    top: '120px',
                    marginBottom: `${certsInYear.length * 80}px`,
                  }}
                >
                  {/* Dot en la línea */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-13px',
                      top: '6px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isMaxYear
                        ? '#8b5cf6'
                        : 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                      zIndex: 1,
                    }}
                  />

                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: isMaxYear
                        ? 'var(--text-primary)'
                        : 'var(--text-muted)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {year}
                  </span>

                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.1em',
                      marginTop: '4px',
                    }}
                  >
                    {labels.yearCerts(certsInYear.length)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: años como headers con sus cards */}
          <div className="md:hidden">
            {years.map((year) => {
              const certsInYear = CERTS_BY_YEAR[year];
              const isMaxYear = year === maxYear;

              return (
                <div key={`mobile-${year}`} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: isMaxYear
                          ? '#8b5cf6'
                          : 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                      }}
                    />
                    <span
                      className="font-mono text-2xl font-bold"
                      style={{
                        color: isMaxYear
                          ? 'var(--text-primary)'
                          : 'var(--text-muted)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {year}
                    </span>
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {labels.yearCerts(certsInYear.length)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pl-5 border-l border-[var(--border-color)]">
                    {certsInYear.map((cert) => (
                      <CertCard
                        key={cert.id}
                        cert={cert}
                        platformStyle={PLATFORM_STYLES[cert.platform]}
                        levelBadge={LEVEL_BADGE[cert.level]}
                        isTop={cert.level === 'specialization'}
                        onClick={() => openCert(cert)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Columna derecha: cards desktop */}
          <div className="hidden md:flex flex-col gap-2">
            {years.map((year) =>
              CERTS_BY_YEAR[year].map((cert) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  platformStyle={PLATFORM_STYLES[cert.platform]}
                  levelBadge={LEVEL_BADGE[cert.level]}
                  isTop={cert.level === 'specialization'}
                  onClick={() => openCert(cert)}
                />
              ))
            )}
          </div>
        </div>

        {/* Footer: total count */}
        <div
          className="mt-8 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{
            borderTop: '0.5px solid var(--border-color)',
          }}
        >
          <span
            className="font-mono text-[11px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {labels.footerCount(CERTIFICATIONS.length, years.length)}
          </span>
          <span
            className="font-mono text-[11px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {labels.footerVerify}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {activeCert && (
        <CertLightbox
          imageUrl={activeCert.imageUrl}
          certName={activeCert.name}
          issuer={activeCert.issuer}
          credentialUrl={activeCert.credentialUrl}
          onClose={closeCert}
        />
      )}
    </section>
  );
}
