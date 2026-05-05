import { Suspense } from 'react';

interface VizContainerProps {
  height?: number | string;
  children: React.ReactNode;
}

function Skeleton({ height = 160 }: { height?: number | string }) {
  return (
    <div
      className="animate-pulse"
      style={{ height, background: 'rgba(255,255,255,0.015)', borderRadius: '14px' }}
    >
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-evenly', padding: '12px 16px'
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    </div>
  );
}

export function VizContainer({ height = 160, children }: VizContainerProps) {
  return (
    <div
      className="viz-container relative overflow-hidden group/viz"
      style={{
        height,
        borderRadius: '14px',
        border: '0.5px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(180deg, #0c0d0a 0%, #080907 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      {/* Corner decorations */}
      <svg
        className="absolute top-0 left-0 pointer-events-none opacity-0 group-hover/viz:opacity-100 transition-opacity duration-700"
        width="16" height="16" viewBox="0 0 16 16"
      >
        <path d="M0 8V2a2 2 0 012-2h6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      </svg>
      <svg
        className="absolute top-0 right-0 pointer-events-none opacity-0 group-hover/viz:opacity-100 transition-opacity duration-700"
        width="16" height="16" viewBox="0 0 16 16"
      >
        <path d="M16 8V2a2 2 0 00-2-2h-6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 pointer-events-none opacity-0 group-hover/viz:opacity-100 transition-opacity duration-700"
        width="16" height="16" viewBox="0 0 16 16"
      >
        <path d="M0 8v6a2 2 0 002 2h6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 pointer-events-none opacity-0 group-hover/viz:opacity-100 transition-opacity duration-700"
        width="16" height="16" viewBox="0 0 16 16"
      >
        <path d="M16 8v6a2 2 0 01-2 2h-6" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      </svg>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      />

      {/* Subtle monogram badge */}
      <div className="absolute bottom-3 right-3 pointer-events-none opacity-0 group-hover/viz:opacity-100 transition-opacity duration-500">
        <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-white/8">
          DATA VIZ
        </span>
      </div>

      <Suspense fallback={<Skeleton height={height} />}>
        {children}
      </Suspense>
    </div>
  );
}
