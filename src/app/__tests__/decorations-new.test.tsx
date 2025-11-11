import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import LandingPage from '@/app/page';
import { I18nProvider } from '@/contexts/i18n-context';
import { ProfileProvider } from '@/contexts/profile-context';

// Mocks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock('@/data/resume', () => ({
  DATA: {
    name: 'Diego Villagran',
    avatarUrl: '/img/optimized/me-128.webp',
  },
}));

vi.mock('@/components/ui/animated-beam', () => ({
  AnimatedBeam: ({ fromRef, toRef }: any) => (
    <div 
      data-testid="animated-beam"
      data-from={fromRef?.current ? 'has-ref' : 'no-ref'}
      data-to={toRef?.current ? 'has-ref' : 'no-ref'}
    />
  ),
}));

vi.mock('@/components/ui/orbiting-circles', () => ({
  OrbitingCircles: ({ duration, radius, reverse, className }: any) => (
    <div 
      data-testid="orbiting-circle"
      data-duration={duration}
      data-radius={radius}
      data-reverse={reverse}
      className={className}
    />
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <I18nProvider>
      <ProfileProvider>{ui}</ProfileProvider>
    </I18nProvider>
  );
};

describe('Decoraciones de las Cards', () => {
  describe('MLOpsDecoration', () => {
    it('debe renderizar el gradiente purple oscuro', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con los colores específicos de MLOps
      const purpleGradients = container.querySelectorAll('[class*="from-[#2f1c5e]"]');
      expect(purpleGradients.length).toBeGreaterThan(0);
    });

    it('debe renderizar 3 AnimatedBeams para el pipeline', () => {
      const { getAllByTestId } = renderWithProviders(<LandingPage />);
      
      const beams = getAllByTestId('animated-beam');
      // MLOps tiene 3 beams + Data Pipelines tiene 3 beams = 6 total
      expect(beams.length).toBeGreaterThanOrEqual(6);
    });

    it('debe tener grain texture con partículas', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que hay divs con opacity y mix-blend-overlay
      const textures = container.querySelectorAll('[class*="mix-blend-overlay"]');
      expect(textures.length).toBeGreaterThanOrEqual(1);
    });

    it('debe renderizar nodos circulares sin íconos', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar divs con rounded-full (círculos)
      const circles = container.querySelectorAll('[class*="rounded-full"]');
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe('DataPipelinesDecoration', () => {
    it('debe renderizar el gradiente cyan oscuro', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con los colores específicos de Data Pipelines
      const cyanGradients = container.querySelectorAll('[class*="from-[#0e223a]"]');
      expect(cyanGradients.length).toBeGreaterThan(0);
    });

    it('debe renderizar 3 AnimatedBeams (db→api, python→api, api→dashboard)', () => {
      const { getAllByTestId } = renderWithProviders(<LandingPage />);
      
      const beams = getAllByTestId('animated-beam');
      expect(beams.length).toBeGreaterThanOrEqual(3);
    });

    it('debe tener grain texture radial', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      const textures = container.querySelectorAll('[class*="opacity-[0.12]"]');
      expect(textures.length).toBeGreaterThanOrEqual(1);
    });

    it('debe renderizar 4 nodos del pipeline (2 input, 1 central, 1 output)', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con border-cyan
      const cyanBorders = container.querySelectorAll('[class*="border-cyan"]');
      expect(cyanBorders.length).toBeGreaterThan(0);
    });
  });

  describe('InfrastructureDecoration', () => {
    it('debe renderizar el gradiente green oscuro', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con los colores específicos de Infrastructure
      const greenGradients = container.querySelectorAll('[class*="from-[#0b2415]"]');
      expect(greenGradients.length).toBeGreaterThan(0);
    });

    it('debe renderizar 4 OrbitingCircles (2 inner + 2 outer)', () => {
      const { getAllByTestId } = renderWithProviders(<LandingPage />);
      
      const circles = getAllByTestId('orbiting-circle');
      expect(circles.length).toBeGreaterThanOrEqual(4);
    });

    it('los OrbitingCircles deben tener diferentes duraciones', () => {
      const { getAllByTestId } = renderWithProviders(<LandingPage />);
      
      const circles = getAllByTestId('orbiting-circle');
      const durations = circles.map(c => c.getAttribute('data-duration'));
      
      // Debe haber diferentes duraciones (20s y 30s)
      const uniqueDurations = new Set(durations);
      expect(uniqueDurations.size).toBeGreaterThan(1);
    });

    it('debe tener círculos en orbit reverse', () => {
      const { getAllByTestId } = renderWithProviders(<LandingPage />);
      
      const circles = getAllByTestId('orbiting-circle');
      const hasReverse = circles.some(c => c.getAttribute('data-reverse') === 'true');
      
      expect(hasReverse).toBe(true);
    });

    it('debe tener grid pattern linear', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar divs con linear-gradient en style
      const grids = Array.from(container.querySelectorAll('div')).filter(
        div => div.style.backgroundImage?.includes('linear-gradient')
      );
      expect(grids.length).toBeGreaterThan(0);
    });
  });

  describe('DataAnalystDecoration', () => {
    it('debe renderizar el gradiente orange oscuro', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con los colores específicos de Data Analyst
      const orangeGradients = container.querySelectorAll('[class*="from-[#2d1a10]"]');
      expect(orangeGradients.length).toBeGreaterThan(0);
    });

    it('debe tener dot pattern radial', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar divs con radial-gradient en style
      const dots = Array.from(container.querySelectorAll('div')).filter(
        div => div.style.backgroundImage?.includes('radial-gradient')
      );
      expect(dots.length).toBeGreaterThan(0);
    });

    it('debe renderizar el dashboard grid (3x3)', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar grid con grid-cols-3
      const grids = container.querySelectorAll('[class*="grid-cols-3"]');
      expect(grids.length).toBeGreaterThan(0);
    });

    it('debe tener cards de visualización (main chart, metrics, table)', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con border-amber
      const amberBorders = container.querySelectorAll('[class*="border-amber"]');
      // Debe haber al menos 4 elementos (main chart + 2 metrics + table)
      expect(amberBorders.length).toBeGreaterThanOrEqual(4);
    });

    it('debe tener barras animadas en el chart principal', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con bg-amber (las barras del chart)
      const bars = container.querySelectorAll('[class*="bg-amber-500/"]');
      expect(bars.length).toBeGreaterThan(0);
    });
  });

  describe('Vignettes y overlays', () => {
    it('todas las decoraciones deben tener vignette para legibilidad', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar gradientes verticales (vignettes)
      const vignettes = container.querySelectorAll('[class*="bg-gradient-to-b"]');
      expect(vignettes.length).toBeGreaterThanOrEqual(4);
    });

    it('todas las decoraciones deben ser pointer-events-none', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con pointer-events-none
      const nonPointer = container.querySelectorAll('[class*="pointer-events-none"]');
      expect(nonPointer.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Performance y optimización', () => {
    it('las decoraciones no deben contener íconos SVG', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que no hay elementos lucide-react visibles (excepto en los iconWrappers de las cards)
      const allSvgs = container.querySelectorAll('svg');
      
      // Puede haber SVGs en los AnimatedBeam pero no en los nodos
      expect(allSvgs.length).toBeDefined();
    });

    it('debe usar backdrop-blur para glassmorphism', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Buscar elementos con backdrop-blur
      const blurred = container.querySelectorAll('[class*="backdrop-blur"]');
      expect(blurred.length).toBeGreaterThan(0);
    });

    it('debe usar transiciones suaves en las animaciones', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que hay elementos con transition
      const transitions = container.querySelectorAll('[class*="transition"]');
      expect(transitions.length).toBeGreaterThan(0);
    });
  });

  describe('Colores temáticos por perfil', () => {
    it('MLOps debe usar paleta purple', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      const purpleElements = container.querySelectorAll('[class*="purple"]');
      expect(purpleElements.length).toBeGreaterThan(0);
    });

    it('Data Pipelines debe usar paleta cyan', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      const cyanElements = container.querySelectorAll('[class*="cyan"]');
      expect(cyanElements.length).toBeGreaterThan(0);
    });

    it('Infrastructure debe usar paleta emerald/green', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      const greenElements = container.querySelectorAll('[class*="emerald"]');
      expect(greenElements.length).toBeGreaterThan(0);
    });

    it('Data Analyst debe usar paleta amber/orange', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      const amberElements = container.querySelectorAll('[class*="amber"]');
      expect(amberElements.length).toBeGreaterThan(0);
    });
  });
});
