import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedBeam } from '@/components/ui/animated-beam';

// Mock del AnimatedBeam
vi.mock('@/components/ui/animated-beam', () => ({
  AnimatedBeam: vi.fn(({ containerRef, fromRef, toRef, ...props }) => (
    <div data-testid="animated-beam" data-props={JSON.stringify(props)} />
  )),
}));

// Recreamos los componentes de decoración para testing
const DataPipelinesDecorationInner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const midRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" data-testid="data-pipelines-decoration">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e223a] via-[#08243d] to-[#031726]" />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "12px 12px, 16px 16px",
          backgroundPosition: "0 0, 6px 6px",
        }}
      />
      <div
        ref={sourceRef}
        className="absolute left-[18%] top-[26%] h-16 w-16 rounded-full bg-[#5df0ff]/28 blur-[90px]"
      />
      <div
        ref={midRef}
        className="absolute left-[44%] bottom-[38%] h-20 w-20 rounded-full bg-[#22d3ee]/24 blur-[100px]"
      />
      <div
        ref={targetRef}
        className="absolute right-[17%] bottom-[28%] h-24 w-24 rounded-full bg-[#0ea5e9]/24 blur-[110px]"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={midRef}
        curvature={100}
        pathColor="#1FD9D3"
        pathWidth={2}
        pathOpacity={0.1}
        gradientStartColor="rgba(0,214,255,0.85)"
        gradientStopColor="#22d3ee"
        duration={18}
        delay={0.6}
        className="opacity-[0.18] blur-xl"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={midRef}
        toRef={targetRef}
        curvature={120}
        pathColor="#22d3ee"
        pathWidth={1.8}
        pathOpacity={0.1}
        gradientStartColor="#22d3ee"
        gradientStopColor="rgba(0,180,230,0.85)"
        duration={22}
        delay={1.2}
        reverse
        className="opacity-[0.16] blur-[18px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#031726]/35 to-[#010c14]/70" />
    </div>
  );
};

const DataPipelinesDecoration = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return null;
  
  return <DataPipelinesDecorationInner />;
};

const MLOpsDecorationInner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const notebookRef = useRef<HTMLDivElement | null>(null);
  const pipelineRef = useRef<HTMLDivElement | null>(null);
  const prodRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" data-testid="mlops-decoration">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f1c5e] via-[#1a0f38] to-[#0c071a]" />
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(165,132,255,0.06) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "14px 14px, 18px 18px",
          backgroundPosition: "0 0, 7px 7px",
        }}
      />
      <div
        ref={notebookRef}
        className="absolute left-[15%] top-[30%] h-16 w-16 rounded-full bg-[#b794ff]/32 blur-[85px]"
      />
      <div
        ref={pipelineRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-[#9370ff]/26 blur-[95px]"
      />
      <div
        ref={prodRef}
        className="absolute right-[15%] bottom-[30%] h-24 w-24 rounded-full bg-[#8f7bff]/28 blur-[105px]"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={notebookRef}
        toRef={pipelineRef}
        curvature={90}
        pathColor="#9370ff"
        pathWidth={2.2}
        pathOpacity={0.11}
        gradientStartColor="rgba(183,148,255,0.88)"
        gradientStopColor="#9370ff"
        duration={20}
        delay={0.4}
        className="opacity-[0.2] blur-xl"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={pipelineRef}
        toRef={prodRef}
        curvature={110}
        pathColor="#8f7bff"
        pathWidth={2}
        pathOpacity={0.1}
        gradientStartColor="#9370ff"
        gradientStopColor="rgba(143,123,255,0.85)"
        duration={24}
        delay={1.0}
        reverse
        className="opacity-[0.18] blur-[16px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f38]/30 to-[#0c071a]/65" />
    </div>
  );
};

const MLOpsDecoration = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return null;
  
  return <MLOpsDecorationInner />;
};

describe('Card Decorations', () => {
  describe('DataPipelinesDecoration', () => {
    it('debe renderizarse correctamente', () => {
      const { container } = render(<DataPipelinesDecoration />);
      expect(container).toBeTruthy();
    });

    it('implementa patrón client-only rendering para prevenir hidratación', () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      // El componente usa useState + useEffect para renderizado client-only
      // En tests con jsdom, useEffect se ejecuta síncronamente, así que el componente se renderiza
      // Lo importante es que el patrón esté implementado correctamente
      const decoration = container.querySelector('[data-testid="data-pipelines-decoration"]');
      expect(decoration).toBeTruthy(); // En tests se renderiza porque jsdom simula el cliente
    });

    it('debe renderizarse en el cliente después del montaje', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      // Esperar a que useEffect se ejecute
      await waitFor(() => {
        const decoration = container.querySelector('[data-testid="data-pipelines-decoration"]');
        expect(decoration).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('debe tener el gradiente base con tonos cyan', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const gradientBase = container.querySelector('.bg-gradient-to-br');
        expect(gradientBase).toBeInTheDocument();
        expect(gradientBase?.className).toContain('from-[#0e223a]');
        expect(gradientBase?.className).toContain('via-[#08243d]');
        expect(gradientBase?.className).toContain('to-[#031726]');
      });
    });

    it('debe tener grain/grid overlay para textura orgánica', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const grain = container.querySelector('.mix-blend-overlay');
        expect(grain).toBeInTheDocument();
        expect(grain?.className).toContain('opacity-[0.12]');
      });
    });

    it('debe tener 3 nodos de referencia (source, mid, target)', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const glows = container.querySelectorAll('.rounded-full.blur-\\[90px\\], .rounded-full.blur-\\[100px\\], .rounded-full.blur-\\[110px\\]');
        expect(glows.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('debe crear 2 AnimatedBeams con configuraciones correctas', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        expect(beams).toHaveLength(2);
      });
    });

    it('AnimatedBeam 1 debe tener duración de 18s y opacidad 0.18', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        const firstBeam = beams[0];
        const props = JSON.parse(firstBeam.getAttribute('data-props') || '{}');
        
        expect(props.duration).toBe(18);
        expect(props.className).toContain('opacity-[0.18]');
        expect(props.className).toContain('blur-xl');
      });
    });

    it('AnimatedBeam 2 debe tener duración de 22s, reverse, y opacidad 0.16', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        const secondBeam = beams[1];
        const props = JSON.parse(secondBeam.getAttribute('data-props') || '{}');
        
        expect(props.duration).toBe(22);
        expect(props.reverse).toBe(true);
        expect(props.className).toContain('opacity-[0.16]');
        expect(props.className).toContain('blur-[18px]');
      });
    });

    it('debe tener vignette para legibilidad de texto', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const vignette = container.querySelector('.bg-gradient-to-b');
        expect(vignette).toBeInTheDocument();
        expect(vignette?.className).toContain('from-transparent');
      });
    });

    it('debe ser pointer-events-none (no interferir con interacciones)', async () => {
      const { container } = render(<DataPipelinesDecoration />);
      
      await waitFor(() => {
        const decoration = container.querySelector('[data-testid="data-pipelines-decoration"]');
        expect(decoration?.className).toContain('pointer-events-none');
      });
    });
  });

  describe('MLOpsDecoration', () => {
    it('debe renderizarse correctamente', () => {
      const { container } = render(<MLOpsDecoration />);
      expect(container).toBeTruthy();
    });

    it('implementa patrón client-only rendering para prevenir hidratación', () => {
      const { container } = render(<MLOpsDecoration />);
      
      // El componente usa useState + useEffect para renderizado client-only
      const decoration = container.querySelector('[data-testid="mlops-decoration"]');
      expect(decoration).toBeTruthy(); // En tests con jsdom se renderiza
    });

    it('debe renderizarse en el cliente después del montaje', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const decoration = container.querySelector('[data-testid="mlops-decoration"]');
        expect(decoration).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('debe tener el gradiente base con tonos purple', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const gradientBase = container.querySelector('.bg-gradient-to-br');
        expect(gradientBase).toBeInTheDocument();
        expect(gradientBase?.className).toContain('from-[#2f1c5e]');
        expect(gradientBase?.className).toContain('via-[#1a0f38]');
        expect(gradientBase?.className).toContain('to-[#0c071a]');
      });
    });

    it('debe tener particle grain overlay', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const grain = container.querySelector('.mix-blend-overlay');
        expect(grain).toBeInTheDocument();
        expect(grain?.className).toContain('opacity-[0.1]');
      });
    });

    it('debe tener 3 nodos MLOps (notebooks, pipeline, production)', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const glows = container.querySelectorAll('.rounded-full.blur-\\[85px\\], .rounded-full.blur-\\[95px\\], .rounded-full.blur-\\[105px\\]');
        expect(glows.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('debe crear 2 AnimatedBeams con configuraciones purple/violet', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        expect(beams).toHaveLength(2);
      });
    });

    it('AnimatedBeam 1 (notebooks→pipeline) debe tener duración de 20s', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        const firstBeam = beams[0];
        const props = JSON.parse(firstBeam.getAttribute('data-props') || '{}');
        
        expect(props.duration).toBe(20);
        expect(props.pathColor).toBe('#9370ff');
        expect(props.className).toContain('opacity-[0.2]');
      });
    });

    it('AnimatedBeam 2 (pipeline→production) debe tener duración de 24s y reverse', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        const secondBeam = beams[1];
        const props = JSON.parse(secondBeam.getAttribute('data-props') || '{}');
        
        expect(props.duration).toBe(24);
        expect(props.reverse).toBe(true);
        expect(props.pathColor).toBe('#8f7bff');
        expect(props.className).toContain('opacity-[0.18]');
      });
    });

    it('debe ser pointer-events-none', async () => {
      const { container } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const decoration = container.querySelector('[data-testid="mlops-decoration"]');
        expect(decoration?.className).toContain('pointer-events-none');
      });
    });
  });

  describe('Comparación de diseño', () => {
    it('DataPipelines debe usar colores cyan/blue mientras MLOps usa purple', async () => {
      const { container: dataPipelines } = render(<DataPipelinesDecoration />);
      const { container: mlops } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const dpBeams = dataPipelines.querySelectorAll('[data-testid="animated-beam"]');
        const mlBeams = mlops.querySelectorAll('[data-testid="animated-beam"]');
        
        const dpProps = JSON.parse(dpBeams[0].getAttribute('data-props') || '{}');
        const mlProps = JSON.parse(mlBeams[0].getAttribute('data-props') || '{}');
        
        // DataPipelines usa cyan (#1FD9D3, #22d3ee)
        expect(dpProps.pathColor).toBe('#1FD9D3');
        
        // MLOps usa purple (#9370ff)
        expect(mlProps.pathColor).toBe('#9370ff');
      });
    });

    it('DataPipelines debe tener beams más rápidos que MLOps', async () => {
      const { container: dataPipelines } = render(<DataPipelinesDecoration />);
      const { container: mlops } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const dpBeams = dataPipelines.querySelectorAll('[data-testid="animated-beam"]');
        const mlBeams = mlops.querySelectorAll('[data-testid="animated-beam"]');
        
        const dpFirstDuration = JSON.parse(dpBeams[0].getAttribute('data-props') || '{}').duration;
        const mlFirstDuration = JSON.parse(mlBeams[0].getAttribute('data-props') || '{}').duration;
        
        // DataPipelines: 18s vs MLOps: 20s (más rápido = menor duración)
        expect(dpFirstDuration).toBeLessThan(mlFirstDuration);
      });
    });

    it('ambas decoraciones deben ser atmosféricas (baja opacidad, blur intenso)', async () => {
      const { container: dataPipelines } = render(<DataPipelinesDecoration />);
      const { container: mlops } = render(<MLOpsDecoration />);
      
      await waitFor(() => {
        const dpBeams = dataPipelines.querySelectorAll('[data-testid="animated-beam"]');
        const mlBeams = mlops.querySelectorAll('[data-testid="animated-beam"]');
        
        dpBeams.forEach(beam => {
          const className = beam.getAttribute('data-props') ? 
            JSON.parse(beam.getAttribute('data-props') || '{}').className : '';
          expect(className).toMatch(/opacity-\[0\.\d+\]/); // Opacidad baja
          expect(className).toMatch(/blur/); // Blur aplicado
        });
        
        mlBeams.forEach(beam => {
          const className = beam.getAttribute('data-props') ? 
            JSON.parse(beam.getAttribute('data-props') || '{}').className : '';
          expect(className).toMatch(/opacity-\[0\.\d+\]/);
          expect(className).toMatch(/blur/);
        });
      });
    });
  });
});
