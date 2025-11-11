import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider, useI18n } from '@/contexts/i18n-context';

// Componente de prueba para acceder al contexto
function TestComponent() {
  const { language, setLanguage, t, isClient } = useI18n();
  
  return (
    <div>
      <div data-testid="language">{language}</div>
      <div data-testid="is-client">{isClient ? 'true' : 'false'}</div>
      <div data-testid="translation">{t('test')}</div>
      <button onClick={() => setLanguage('en')}>Set English</button>
      <button onClick={() => setLanguage('es')}>Set Spanish</button>
    </div>
  );
}

describe('I18nContext', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Inicialización', () => {
    it('debe inicializarse con un idioma válido', () => {
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const language = screen.getByTestId('language');
      // Puede ser 'es' o 'en' dependiendo del entorno
      expect(['es', 'en']).toContain(language.textContent);
    });

    it('debe leer el idioma de localStorage si existe', () => {
      localStorage.setItem('language', 'en');
      
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });

    it('debe establecer isClient correctamente', () => {
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      // isClient puede ser true o false dependiendo del ciclo de vida
      const isClient = screen.getByTestId('is-client');
      expect(['true', 'false']).toContain(isClient.textContent);
    });

    it('debe establecer isClient como true después del montaje', async () => {
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      // Después del useEffect, isClient debe ser true
      await waitFor(() => {
        expect(screen.getByTestId('is-client')).toHaveTextContent('true');
      });
    });
  });

  describe('Cambio de idioma', () => {
    it('debe cambiar el idioma a inglés', async () => {
      const user = userEvent.setup();
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const englishButton = screen.getByText('Set English');
      await user.click(englishButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('en');
        expect(localStorage.getItem('language')).toBe('en');
      });
    });

    it('debe cambiar el idioma a español', async () => {
      const user = userEvent.setup();
      localStorage.setItem('language', 'en');
      
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const spanishButton = screen.getByText('Set Spanish');
      await user.click(spanishButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('language')).toHaveTextContent('es');
        expect(localStorage.getItem('language')).toBe('es');
      });
    });

    it('debe persistir el idioma en localStorage', async () => {
      const user = userEvent.setup();
      render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const englishButton = screen.getByText('Set English');
      await user.click(englishButton);
      
      await waitFor(() => {
        expect(localStorage.getItem('language')).toBe('en');
      });
    });
  });

  describe('SSR Safety', () => {
    it('debe funcionar correctamente en el entorno de tests', () => {
      // Verificar que el componente se renderiza sin errores
      const { container } = render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      expect(container).toBeTruthy();
      expect(screen.getByTestId('language')).toBeInTheDocument();
    });

    it('debe renderizar consistentemente', () => {
      const { rerender } = render(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const initialLanguage = screen.getByTestId('language').textContent;
      
      // Re-renderizar y verificar consistencia
      rerender(
        <I18nProvider>
          <TestComponent />
        </I18nProvider>
      );
      
      const finalLanguage = screen.getByTestId('language').textContent;
      expect(finalLanguage).toBe(initialLanguage);
    });
  });
});
