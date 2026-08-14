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

vi.mock('@/hooks/useMagnetic', () => ({
  useMagnetic: () => ({ ref: { current: null } }),
}));

// Mock language context with enough translation coverage
vi.mock('@/i18n/LanguageContext', () => ({
  useLanguage: () => ({
    t: {
      contact: {
        eyebrow: 'Contact',
        title: "Let's work together",
        subtitle: 'Open to collaborations and technical work.',
        focusLine: 'Freelance · contract · full-time',
        email: 'hello@example.com',
        bookSession: 'Send a message',
        formLabel: 'Message',
        bookDesc: 'Tell me about your project.',
        formName: 'Name',
        formEmail: 'Email',
        formMessage: 'Message',
        formSubmit: 'Send message',
        formLoading: 'Sending...',
        formSuccess: 'Message sent successfully!',
        formError: 'Something went wrong.',
        labelSocial: 'Elsewhere',
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
    expect(screen.getByText("Let's work together")).toBeInTheDocument();
  });

  it('shows the email link', () => {
    render(<Contact />);
    const emailLink = screen.getByRole('link', { name: /hello@example.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('shows the "Send a message" button', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /send a message/i });
    expect(button).toBeInTheDocument();
  });

  it('shows the form when clicking the button', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /send a message/i });
    fireEvent.click(button);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('closes the form when clicking the × button', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close form'));
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  });

  it('shows validation error for empty name on submit', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    // All three fields show the required error — check at least one appears
    const errors = screen.getAllByText('This field is required');
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it('shows validation error for short name', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);

    expect(screen.getByText('Name is too short')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows validation error for short message', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    const msgInput = screen.getByLabelText(/message/i);
    fireEvent.change(msgInput, { target: { value: 'Hi' } });
    fireEvent.blur(msgInput);

    expect(screen.getByText('Message is too short')).toBeInTheDocument();
  });

  it('does not show errors before user interaction', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('marks invalid fields with aria-invalid and links errors via aria-describedby', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const msgInput = screen.getByLabelText(/message/i);

    expect(nameInput).not.toHaveAttribute('aria-invalid');
    expect(nameInput).not.toHaveAttribute('aria-describedby');
    expect(emailInput).not.toHaveAttribute('aria-invalid');
    expect(msgInput).not.toHaveAttribute('aria-invalid');

    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
    const error = screen.getByText('Name is too short');
    expect(error).toHaveAttribute('id', 'name-error');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('announces successful submission through a live status region', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Diego' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'diego@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello, this message is long enough.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent('Message sent successfully!');
    vi.unstubAllGlobals();
  });

  it('sets aria-busy on the form while submitting', async () => {
    let resolveFetch: (value: { ok: boolean }) => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          })
      )
    );
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Diego' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'diego@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello, this message is long enough.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    const form = document.querySelector('form');
    expect(form).toHaveAttribute('aria-busy', 'true');

    resolveFetch({ ok: true });
    await screen.findByRole('status');
    expect(form).toHaveAttribute('aria-busy', 'false');
    vi.unstubAllGlobals();
  });

  it('renders the section title', () => {
    render(<Contact />);
    expect(screen.getByText("Let's work together")).toBeInTheDocument();
  });

  it('includes a hidden honeypot field that is never visible to users', () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    const container = document.querySelector('div[aria-hidden="true"]');
    expect(container).not.toBeNull();
    const honeypot = container?.querySelector('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveAttribute('autocomplete', 'off');
    expect(screen.queryByRole('textbox', { name: /website/i })).toBeNull();
  });

  it('submits an empty honeypot field for real users', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: /send a message/i }));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Diego' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'diego@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello, this message is long enough.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await screen.findByRole('status');
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(init.body)).toMatchObject({ website: '' });
    vi.unstubAllGlobals();
  });
});
