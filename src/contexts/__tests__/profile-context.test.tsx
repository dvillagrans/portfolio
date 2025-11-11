import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfileProvider, useProfile } from '@/contexts/profile-context';

// Componente de prueba
function TestComponent() {
  const { profile, setProfile } = useProfile();
  
  return (
    <div>
      <div data-testid="profile">{profile}</div>
      <button onClick={() => setProfile('ml-engineer')}>ML Engineer</button>
      <button onClick={() => setProfile('data-engineer')}>Data Engineer</button>
      <button onClick={() => setProfile('devops-engineer')}>DevOps Engineer</button>
      <button onClick={() => setProfile('data-analyst')}>Data Analyst</button>
    </div>
  );
}

describe('ProfileContext', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Inicialización', () => {
    it('debe inicializarse con ml-engineer por defecto', () => {
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      expect(screen.getByTestId('profile')).toHaveTextContent('ml-engineer');
    });

    it('debe leer el perfil de localStorage si existe', () => {
      localStorage.setItem('profile', 'data-engineer');
      
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      expect(screen.getByTestId('profile')).toHaveTextContent('data-engineer');
    });

    it('debe usar ml-engineer si localStorage tiene un valor inválido', () => {
      localStorage.setItem('profile', 'invalid-profile');
      
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      expect(screen.getByTestId('profile')).toHaveTextContent('ml-engineer');
    });
  });

  describe('Cambio de perfil', () => {
    it('debe cambiar al perfil ml-engineer', async () => {
      const user = userEvent.setup();
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const mlButton = screen.getByText('ML Engineer');
      await user.click(mlButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('profile')).toHaveTextContent('ml-engineer');
        expect(localStorage.getItem('profile')).toBe('ml-engineer');
      });
    });

    it('debe cambiar al perfil data-engineer', async () => {
      const user = userEvent.setup();
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const dataButton = screen.getByText('Data Engineer');
      await user.click(dataButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('profile')).toHaveTextContent('data-engineer');
        expect(localStorage.getItem('profile')).toBe('data-engineer');
      });
    });

    it('debe cambiar al perfil devops-engineer', async () => {
      const user = userEvent.setup();
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const devopsButton = screen.getByText('DevOps Engineer');
      await user.click(devopsButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('profile')).toHaveTextContent('devops-engineer');
        expect(localStorage.getItem('profile')).toBe('devops-engineer');
      });
    });

    it('debe cambiar al perfil data-analyst', async () => {
      const user = userEvent.setup();
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const analystButton = screen.getByText('Data Analyst');
      await user.click(analystButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('profile')).toHaveTextContent('data-analyst');
        expect(localStorage.getItem('profile')).toBe('data-analyst');
      });
    });

    it('debe persistir el perfil en localStorage', async () => {
      const user = userEvent.setup();
      const { unmount } = render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const dataButton = screen.getByText('Data Engineer');
      await user.click(dataButton);
      
      await waitFor(() => {
        expect(localStorage.getItem('profile')).toBe('data-engineer');
      });
      
      // Desmontar y crear nuevo render para verificar persistencia
      unmount();
      
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('profile')).toHaveTextContent('data-engineer');
      });
    });
  });

  describe('SSR Safety', () => {
    it('debe funcionar correctamente en el entorno de tests', () => {
      const { container } = render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      expect(container).toBeTruthy();
      expect(screen.getByTestId('profile')).toBeInTheDocument();
    });
  });

  describe('Validación de tipos', () => {
    it('debe aceptar todos los perfiles válidos', async () => {
      const user = userEvent.setup();
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
      
      const validProfiles = [
        { button: 'ML Engineer', value: 'ml-engineer' },
        { button: 'Data Engineer', value: 'data-engineer' },
        { button: 'DevOps Engineer', value: 'devops-engineer' },
        { button: 'Data Analyst', value: 'data-analyst' },
      ];
      
      for (const { button, value } of validProfiles) {
        const profileButton = screen.getByText(button);
        await user.click(profileButton);
        
        await waitFor(() => {
          expect(screen.getByTestId('profile')).toHaveTextContent(value);
        });
      }
    });
  });
});
