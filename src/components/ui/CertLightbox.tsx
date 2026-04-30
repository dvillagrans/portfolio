'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { gsap } from 'gsap';

interface CertLightboxProps {
  imageUrl: string;
  certName: string;
  issuer: string;
  credentialUrl?: string;
  onClose: () => void;
}

export function CertLightbox({
  imageUrl,
  certName,
  issuer,
  credentialUrl,
  onClose,
}: CertLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;

    gsap.to(imageRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      delay: 0.05,
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline();

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.93, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      '-=0.15'
    );
    tl.fromTo(controlsRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      '-=0.2'
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [handleClose, mounted]);

  const lightboxContent = (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(20px) saturate(0.7)',
        WebkitBackdropFilter: 'blur(20px) saturate(0.7)',
        background: 'rgba(0, 0, 0, 0.55)',
        padding: '32px',
      }}
    >
      {/* Controles flotantes — esquina superior derecha */}
      <div
        ref={controlsRef}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 100000,
        }}
      >
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              padding: '7px 12px',
              borderRadius: '6px',
              border: '0.5px solid rgba(255,255,255,0.15)',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'rgba(255,255,255,0.95)';
              el.style.borderColor = 'rgba(255,255,255,0.35)';
              el.style.background = 'rgba(0,0,0,0.6)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'rgba(255,255,255,0.6)';
              el.style.borderColor = 'rgba(255,255,255,0.15)';
              el.style.background = 'rgba(0,0,0,0.4)';
            }}
          >
            VERIFICAR
            <span style={{ fontSize: '13px', lineHeight: 1 }}>&#8599;</span>
          </a>
        )}

        <button
          onClick={handleClose}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            border: '0.5px solid rgba(255,255,255,0.15)',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            transition: 'color 0.2s, border-color 0.2s',
            fontFamily: 'monospace',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'rgba(255,255,255,0.95)';
            el.style.borderColor = 'rgba(255,255,255,0.35)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'rgba(255,255,255,0.6)';
            el.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
          aria-label="Cerrar"
        >
          &#10005;
        </button>
      </div>

      {/* Label flotante inferior — issuer + nombre */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '20px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          zIndex: 100000,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.1em',
        }}>
          {issuer.toUpperCase()}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>&#183;</span>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.7)',
        }}>
          {certName}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>&#183;</span>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.25)',
        }}>
          ESC para cerrar
        </span>
      </div>

      {/* LA IMAGEN — protagonista absoluto */}
      <div
        ref={imageRef}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(88vw, 900px)',
          maxHeight: '82vh',
          width: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.08)',
        }}
      >
        <Image
          src={imageUrl}
          alt={`Certificado: ${certName}`}
          width={1200}
          height={850}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '82vh',
            objectFit: 'contain',
            display: 'block',
          }}
          priority
          quality={95}
        />
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
