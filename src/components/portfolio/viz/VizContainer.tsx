import { Suspense } from 'react';

interface VizContainerProps {
  height?: number | string;
  children: React.ReactNode;
}

function Skeleton({ height = 160 }: { height?: number | string }) {
  return (
    <div
      className="animate-pulse"
      style={{ height, background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}
    >
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-evenly', padding: '12px 16px'
      }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
    </div>
  );
}

export function VizContainer({ height = 160, children }: VizContainerProps) {
  return (
    <div
      className="viz-container relative overflow-hidden"
      style={{
        height,
        borderRadius: '8px',
        border: '0.5px solid rgba(255,255,255,0.08)',
        background: '#0a0b08',
      }}
    >
      <Suspense fallback={<Skeleton height={height} />}>
        {children}
      </Suspense>
    </div>
  );
}
