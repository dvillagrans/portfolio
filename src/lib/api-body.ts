import { NextResponse } from 'next/server';

export interface ParsedJson<T = unknown> {
  ok: true;
  data: T;
}

export interface JsonParseError {
  ok: false;
  response: NextResponse;
}

export type ParseJsonResult<T = unknown> = ParsedJson<T> | JsonParseError;

function isJsonContentType(contentType: string): boolean {
  const mediaType = contentType.split(';')[0].trim().toLowerCase();
  return mediaType === 'application/json' || mediaType.endsWith('+json');
}

/**
 * Read a request body as JSON with a hard byte limit.
 *
 * - Content-Type: a present header must be JSON (application/json or
 *   application/*+json). Requests without a Content-Type header are allowed,
 *   since they are already compatible with body-as-JSON processing.
 * - Content-Length: rejected with 413 before reading when it exceeds `maxBytes`.
 * - Body bytes: re-checked after reading (guards chunked/missing
 *   Content-Length), also 413.
 * - Malformed or empty JSON bodies return 400.
 *
 * The caller must handle the response from a failed parse (ok: false).
 */
export async function readJsonBody<T = unknown>(
  req: Request,
  maxBytes: number
): Promise<ParseJsonResult<T>> {
  const contentType = req.headers.get('content-type');
  if (contentType && !isJsonContentType(contentType)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      ),
    };
  }

  const contentLength = req.headers.get('content-length');
  if (contentLength && Number(contentLength) > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `Request body too large (max ${maxBytes} bytes)` },
        { status: 413 }
      ),
    };
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid request body' }, { status: 400 }),
    };
  }

  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `Request body too large (max ${maxBytes} bytes)` },
        { status: 413 }
      ),
    };
  }

  if (text.length === 0) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid request body' }, { status: 400 }),
    };
  }

  try {
    return { ok: true, data: JSON.parse(text) as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid request body' }, { status: 400 }),
    };
  }
}
