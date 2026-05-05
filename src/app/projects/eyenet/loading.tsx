export default function EyeNetLoading() {
  return (
    <div className="min-h-screen bg-charcoal font-sans animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-32">
        {/* Nav skeleton */}
        <div className="h-8 w-32 bg-white/5 rounded mb-20" />

        {/* Title skeleton */}
        <div className="h-12 w-3/4 bg-white/5 rounded mb-4" />
        <div className="h-6 w-1/2 bg-white/5 rounded mb-16" />

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-2xl" />
          ))}
        </div>

        {/* Content blocks skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-12">
            <div className="h-8 w-1/3 bg-white/5 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-5/6 bg-white/5 rounded" />
              <div className="h-4 w-4/6 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
