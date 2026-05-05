export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-offwhite font-sans animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-32">
        <div className="h-8 w-32 bg-charcoal/5 rounded mb-20" />
        <div className="h-14 w-2/3 bg-charcoal/5 rounded mb-4" />
        <div className="h-5 w-1/3 bg-charcoal/5 rounded mb-16" />

        {/* Content blocks skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-12">
            <div className="h-8 w-1/3 bg-charcoal/5 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-charcoal/5 rounded" />
              <div className="h-4 w-5/6 bg-charcoal/5 rounded" />
              <div className="h-4 w-4/6 bg-charcoal/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
