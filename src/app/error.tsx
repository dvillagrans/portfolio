"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-charcoal text-offwhite font-sans flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-warm/10 border border-warm/20">
          <AlertTriangle className="h-8 w-8 text-warm" />
        </div>

        <h1 className="font-display text-4xl md:text-5xl italic text-offwhite mb-4">
          Something broke
        </h1>

        <p className="text-offwhite/60 text-sm leading-relaxed mb-8">
          An unexpected error occurred. This is embarrassing — but we can try again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 bg-warm text-charcoal font-sans text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-warm/90 transition-colors spring-press"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 border border-offwhite/20 text-offwhite/70 font-sans text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:border-offwhite/40 hover:text-offwhite transition-colors spring-press"
          >
            <ArrowLeft className="h-4 w-4" />
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 font-mono text-[10px] text-offwhite/30 uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
