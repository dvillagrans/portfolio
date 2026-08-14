import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sitemap from './sitemap';

const PUBLIC_DIR = join(process.cwd(), 'public');

describe('sitemap()', () => {
  it('returns absolute URLs for every entry', () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/www\./);
    }
  });

  it('references only images that exist under public/', () => {
    for (const entry of sitemap()) {
      for (const image of entry.images ?? []) {
        const { pathname } = new URL(image);
        expect(
          existsSync(join(PUBLIC_DIR, pathname)),
          `${pathname} should exist under public/`
        ).toBe(true);
      }
    }
  });

  it('does not include /cv-builder', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes('/cv-builder'))).toBe(false);
  });
});
