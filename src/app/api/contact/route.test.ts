import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

const mockSend = vi.fn();

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: (...args: unknown[]) => mockSend(...args) } };
  }),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
  getRequestIdentifier: vi.fn().mockReturnValue('test-ip'),
  getScopedRequestIdentifier: vi.fn().mockReturnValue('contact:test-ip'),
}));

import { rateLimit } from '@/lib/rate-limit';

const mockedRateLimit = vi.mocked(rateLimit);

const allowed = { allowed: true, remaining: 2, resetAt: Date.now() + 60_000 };

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.RESEND_API = 're_test_key';
    process.env.RESEND_FROM = 'Portfolio Contact <test@example.com>';
    process.env.CONTACT_EMAIL = 'owner@example.com';
    mockSend.mockResolvedValue({ data: { id: 'msg_123' }, error: null });
  });

  it('returns 429 when rate limited', async () => {
    mockedRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      message: 'Rate limit exceeded. Try again in 60s.',
    });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', email: 'test@example.com', message: 'Hello' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);

    const json = await res.json();
    expect(json.error).toContain('Rate limit exceeded');
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });

  it('returns 400 for invalid fields', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: '', email: 'test@example.com', message: 'Hello' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Invalid form data');
  });

  it('returns 400 when all fields are missing', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Invalid form data');
  });

  it('returns 400 for malformed JSON body', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: 'not-json',
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Invalid request body');
  });

  it('sends escaped HTML and validated replyTo on success', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '<script>alert(1)</script> Diego',
        email: 'attacker@example.com',
        message: 'Hello <b>there</b> & welcome',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const [sendArgs] = mockSend.mock.calls[0];
    expect(sendArgs.replyTo).toBe('attacker@example.com');
    expect(sendArgs.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt; Diego');
    expect(sendArgs.html).toContain('&lt;b&gt;there&lt;/b&gt; &amp; welcome');
    expect(sendArgs.html).not.toContain('<script>alert(1)</script>');
    expect(sendArgs.subject).not.toContain('<script>');
  });

  it('does not leak Resend error message to the client', async () => {
    mockedRateLimit.mockReturnValue(allowed);
    mockSend.mockResolvedValue({ data: null, error: { message: 'rate limit secret detail' } });

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'A valid message with enough length',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toBe('Failed to send message. Please try again later.');
    expect(JSON.stringify(json)).not.toContain('secret');
  });

  it('treats a filled honeypot as success without sending an email', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bot',
        email: 'bot@spam.example.com',
        message: 'Buy cheap SEO services now',
        website: 'http://spam.example.com',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('absorbs a honeypot submission even when other fields are invalid', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ website: '  http://spam.example.com  ' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('does not treat an empty honeypot field as spam', async () => {
    mockedRateLimit.mockReturnValue(allowed);

    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Real User',
        email: 'real@example.com',
        message: 'A real message with enough length',
        website: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const [sendArgs] = mockSend.mock.calls[0];
    expect(sendArgs.replyTo).toBe('real@example.com');
  });
});
