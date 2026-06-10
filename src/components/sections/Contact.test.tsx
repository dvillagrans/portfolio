import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Contact from './Contact';

afterEach(() => {
  cleanup();
});

// Mock GSAP to avoid animation dependencies in unit tests
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn().mockReturnValue({ revert: vi.fn() }),
    set: vi.fn(),
    fromTo: vi.fn(),
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(),
    getAll: vi.fn().mockReturnValue([]),
  },
}));

// Mock reduced motion to skip animation hooks
vi.mock('@/hooks/useReducedMotion', () => ({
  useReducedMotion: () => true,
}));

// Mock language context with enough translation coverage
vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      contact: {
        title1: 'Get in Touch',
        title2: "Let's build together",
        email: 'hello@example.com',
        bookSession: "Let's talk",
        formLabel: 'Contact Form',
        bookDesc: 'Tell me about your project.',
        formName: 'Name',
        formEmail: 'Email',
        formMessage: 'Message',
        formSubmit: 'Send Message',
        formLoading: 'Sending...',
        formSuccess: 'Message sent successfully!',
        formError: 'Something went wrong.',
        errorRequired: 'This field is required',
        errorNameShort: 'Name is too short',
        errorEmailInvalid: 'Invalid email',
        errorMessageShort: 'Message is too short',
        footerText: 'All rights reserved.',
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
      },
      colophon: {
        fontCredit: 'Typography: EB Garamond',
        deployLabel: 'Last deploy',
        scoreLabel: 'Lighthouse',
      },
    },
  }),
}));

describe('Contact section', () => {
  it('renders without crashing', () => {
    render(<Contact />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('shows the email link', () => {
    render(<Contact />);
    const emailLink = screen.getByRole('link', { name: /hello@example.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('shows the "Let\'s talk" button', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /let's talk/i });
    expect(button).toBeInTheDocument();
  });

  it('shows the form when clicking the button', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /let's talk/i });
    fireEvent.click(button);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('closes the form when clicking the × button', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close form'));
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it('shows validation error for empty name on submit', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // All three fields show the required error — check at least one appears
    const errors = screen.getAllByText('This field is required');
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it('shows validation error for short name', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);

    expect(screen.getByText('Name is too short')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows validation error for short message', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    const msgInput = screen.getByLabelText(/message/i);
    fireEvent.change(msgInput, { target: { value: 'Hi' } });
    fireEvent.blur(msgInput);

    expect(screen.getByText('Message is too short')).toBeInTheDocument();
  });

  it('does not show errors before user interaction', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('renders the cta section title', () => {
    render(<Contact />);
    expect(screen.getByText("Let's build together")).toBeInTheDocument();
  });
});
