import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';

afterEach(() => {
  cleanup();
});

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
  },
}));

vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => true,
}));

vi.mock('@/hooks/ThemeContext', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn(), setTheme: vi.fn() }),
}));

vi.mock('@/hooks/CommandPaletteContext', () => ({
  useCommandPalette: () => ({ open: false, setOpen: vi.fn(), toggle: vi.fn() }),
}));

vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
    setLanguage: vi.fn(),
    t: {
      nav: {
        projects: 'Projects',
        systems: 'Systems',
        about: 'About',
        contact: 'Contact',
      },
    },
  }),
}));

vi.mock('next-view-transitions', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar mobile menu accessibility', () => {
  it('toggles aria-expanded on the hamburger button', () => {
    render(<Navbar />);
    const openButton = screen.getByRole('button', { name: /open menu/i });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');
    expect(openButton).toHaveAttribute('aria-controls', 'nav-mobile-menu');

    fireEvent.click(openButton);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens the menu as a modal dialog and moves focus to the first link', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(within(dialog).getByRole('link', { name: /projects/i })).toHaveFocus();
  });

  it('returns focus to the hamburger button when the menu closes via Escape', () => {
    render(<Navbar />);
    const openButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(openButton);
    expect(within(screen.getByRole('dialog')).getByRole('link', { name: /projects/i })).toHaveFocus();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(openButton).toHaveFocus();
    expect(openButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('returns focus to the hamburger button when a menu link is clicked', () => {
    render(<Navbar />);
    const openButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(openButton);

    fireEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: /about/i }));

    expect(openButton).toHaveFocus();
    expect(openButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('wraps focus back to the first element when Tab is pressed on the last item', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));

    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    const lastButton = within(dialog).getByRole('button', { name: /switch to light mode/i });
    lastButton.focus();

    fireEvent.keyDown(dialog, { key: 'Tab' });

    expect(within(dialog).getByRole('link', { name: /projects/i })).toHaveFocus();
  });
});
