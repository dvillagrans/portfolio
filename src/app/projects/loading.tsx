export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-charcoal font-sans animate-pulse">
      <div className="mx-auto max-w-5xl px-6 py-32">
        <div className="h-8 w-32 bg-white/5 rounded mb-20" />
        <div className="h-14 w-2/3 bg-white/5 rounded mb-4" />
        <div className="h-5 w-1/3 bg-white/5 rounded mb-16" />

        {/* Year sections skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-12">
            <div className="h-6 w-16 bg-white/5 rounded mb-4" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-16 bg-white/5 rounded-lg mb-2" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
