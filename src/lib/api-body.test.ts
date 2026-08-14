import { describe, it, expect } from 'vitest';
import { readJsonBody } from '@/lib/api-body';

const url = 'http://localhost/api/contact';

describe('readJsonBody', () => {
  it('parses a valid JSON body', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await readJsonBody<{ name: string }>(req, 1024);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual({ name: 'Test' });
  });

  it('allows requests without a Content-Type header', async () => {
    // Uint8Array body: undici/jsdom do not auto-assign a Content-Type header
    // for it (a string body would become text/plain).
    const req = new Request(url, {
      method: 'POST',
      body: new TextEncoder().encode(JSON.stringify({ name: 'Test' })),
    });

    const result = await readJsonBody<{ name: string }>(req, 1024);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual({ name: 'Test' });
  });

  it('rejects a non-JSON Content-Type with 415', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: 'name=test',
      headers: { 'Content-Type': 'text/plain' },
    });

    const result = await readJsonBody(req, 1024);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(415);
      const json = await result.response.json();
      expect(json.error).toBe('Content-Type must be application/json');
    }
  });

  it('accepts application/json with charset suffix', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: JSON.stringify({ ok: true }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });

    const result = await readJsonBody(req, 1024);
    expect(result.ok).toBe(true);
  });

  it('rejects bodies over the Content-Length limit with 413', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: JSON.stringify({ name: 'x'.repeat(500) }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await readJsonBody(req, 100);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(413);
      const json = await result.response.json();
      expect(json.error).toContain('Request body too large');
    }
  });

  it('rejects bodies over the limit without a Content-Length header', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: new TextEncoder().encode(JSON.stringify({ name: 'x'.repeat(500) })),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await readJsonBody(req, 100);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(413);
  });

  it('returns 400 for malformed JSON', async () => {
    const req = new Request(url, {
      method: 'POST',
      body: 'not-json',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await readJsonBody(req, 1024);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(400);
      const json = await result.response.json();
      expect(json.error).toBe('Invalid request body');
    }
  });
});
