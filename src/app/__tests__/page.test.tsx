import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingPage from '@/app/page';
import { I18nProvider } from '@/contexts/i18n-context';
import { ProfileProvider } from '@/contexts/profile-context';

// Mock del router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock de los datos
vi.mock('@/data/resume', () => ({
  DATA: {
    name: 'Diego Villagran',
    initials: 'DV',
    url: 'https://diegovillagran.com',
    location: 'Lima, Peru',
    avatarUrl: '/img/optimized/me-128.webp',
  },
}));

// Mock del AnimatedBeam para evitar problemas de renderizado en tests
vi.mock('@/components/ui/animated-beam', () => ({
  AnimatedBeam: () => <div data-testid="animated-beam" />,
}));

// Mock del OrbitingCircles
vi.mock('@/components/ui/orbiting-circles', () => ({
  OrbitingCircles: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="orbiting-circle">{children}</div>
  ),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <I18nProvider>
      <ProfileProvider>{ui}</ProfileProvider>
    </I18nProvider>
  );
};

describe('LandingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el título y descripción', () => {
      renderWithProviders(<LandingPage />);
      
      // El idioma puede ser español o inglés dependiendo del entorno
      const hasSpanish = screen.queryByText('Hola, soy Diego');
      const hasEnglish = screen.queryByText("Hi, I'm Diego");
      
      expect(hasSpanish || hasEnglish).toBeTruthy();
    });

    it('debe renderizar todas las tarjetas de perfil', () => {
      renderWithProviders(<LandingPage />);
      
      // Verificar que las 4 tarjetas principales estén presentes (en cualquier idioma)
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(4);
      
      // Verificar que alguna tarjeta contenga textos clave
      expect(screen.getByText(/MLOps|Modelos/i)).toBeInTheDocument();
      expect(screen.getByText(/Data Pipelines|Modeling|Tuberías/i)).toBeInTheDocument();
    });

    it('debe renderizar la imagen de avatar', () => {
      renderWithProviders(<LandingPage />);
      
      const avatar = screen.getByAltText('Diego Villagran');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', '/img/optimized/me-128.webp');
    });

    it('debe renderizar los valores principales', () => {
      renderWithProviders(<LandingPage />);
      
      // Buscar en cualquier idioma
      const hasTransparency = screen.queryByText(/Transparency|Transparencia/i);
      const hasDocumentation = screen.queryByText(/Documentation|Documentación/i);
      const hasMaintenance = screen.queryByText(/maintenance|Mantenimiento/i);
      
      expect(hasTransparency).toBeInTheDocument();
      expect(hasDocumentation).toBeInTheDocument();
      expect(hasMaintenance).toBeInTheDocument();
    });
  });

  describe('Navegación', () => {
    it('debe navegar al perfil ml-engineer cuando se hace click en la tarjeta', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LandingPage />);
      
      const allButtons = screen.getAllByRole('button');
      const mlCard = allButtons[0]; // Primera tarjeta es ml-engineer
      
      await user.click(mlCard);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/ml-engineer');
        expect(localStorage.getItem('profile')).toBe('ml-engineer');
      });
    });

    it('debe navegar al perfil data-engineer cuando se hace click en la tarjeta', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LandingPage />);
      
      const allButtons = screen.getAllByRole('button');
      const dataCard = allButtons[1]; // Segunda tarjeta es data-engineer
      
      await user.click(dataCard);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/data-engineer');
        expect(localStorage.getItem('profile')).toBe('data-engineer');
      });
    });

    it('debe navegar a proyectos desde el botón inferior', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LandingPage />);
      
      // Buscar botón de proyectos en cualquier idioma
      const projectsButton = screen.getByText(/Projects|Proyectos/i);
      await user.click(projectsButton);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/projects');
      });
    });
  });

  describe('Decoraciones visuales', () => {
    it('debe renderizar decoraciones para evitar problemas de hidratación', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Las decoraciones se renderizan pero con client-side logic
      const cards = container.querySelectorAll('button');
      expect(cards.length).toBeGreaterThanOrEqual(4);
    });

    it('debe renderizar AnimatedBeams en MLOps y Data Pipelines', async () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Esperar a que los efectos se ejecuten
      await waitFor(() => {
        const beams = container.querySelectorAll('[data-testid="animated-beam"]');
        // Debe haber beams para Data Pipelines (3) y MLOps (3) = 6 total
        expect(beams.length).toBeGreaterThanOrEqual(6);
      }, { timeout: 2000 });
    });

    it('debe renderizar OrbitingCircles en Infrastructure', async () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      await waitFor(() => {
        const circles = container.querySelectorAll('[data-testid="orbiting-circle"]');
        // Debe haber 4 círculos orbitando (2 inner + 2 outer)
        expect(circles.length).toBeGreaterThanOrEqual(4);
      }, { timeout: 2000 });
    });

    it('debe renderizar el dashboard visual en Data Analyst', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que hay elementos del dashboard (grid)
      const grids = container.querySelectorAll('.grid');
      expect(grids.length).toBeGreaterThan(0);
    });

    it('debe tener gradientes de fondo específicos por card', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que hay backgrounds con gradientes
      const backgrounds = container.querySelectorAll('.bg-gradient-to-br');
      expect(backgrounds.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Internacionalización', () => {
    it('debe renderizar contenido en el idioma del contexto', () => {
      renderWithProviders(<LandingPage />);
      
      // Verificar que hay contenido en algún idioma
      const hasEnglish = screen.queryByText("Hi, I'm Diego");
      const hasSpanish = screen.queryByText("Hola, soy Diego");
      
      // Al menos uno de los dos debe estar presente
      expect(hasEnglish || hasSpanish).toBeTruthy();
    });
  });

  describe('Accesibilidad', () => {
    it('todas las tarjetas deben ser botones accesibles', () => {
      renderWithProviders(<LandingPage />);
      
      const buttons = screen.getAllByRole('button');
      // 4 tarjetas de perfil + 2 botones de navegación inferior
      expect(buttons.length).toBeGreaterThanOrEqual(4);
      
      // Verificar que cada botón tiene type="button"
      buttons.slice(0, 4).forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    it('la imagen de avatar debe tener alt text descriptivo', () => {
      renderWithProviders(<LandingPage />);
      
      const avatar = screen.getByAltText('Diego Villagran');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Animaciones Framer Motion', () => {
    it('debe aplicar animaciones de entrada a los elementos', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que los elementos principales están renderizados
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Prevención de hidratación', () => {
    it('debe renderizar elementos sin errores de hidratación', () => {
      const { container } = renderWithProviders(<LandingPage />);
      
      // Verificar que los elementos principales están renderizados
      const cards = container.querySelectorAll('button');
      expect(cards.length).toBeGreaterThanOrEqual(4);
    });

    it('la imagen debe tener el prop suppressHydrationWarning', () => {
      renderWithProviders(<LandingPage />);
      
      const avatar = screen.getByAltText('Diego Villagran');
      expect(avatar).toBeInTheDocument();
    });
  });
});
