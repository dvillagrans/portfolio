// Server component fine, purely visual overlay
export default function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-15 overflow-hidden mix-blend-overlay">
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundSize: "100px 100px",
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
        }}
      />
      {/* Target Crosshairs styling */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border-t border-l border-offwhite/20" />
      <div className="absolute top-1/4 right-1/4 w-4 h-4 border-t border-r border-offwhite/20" />
      <div className="absolute bottom-1/4 left-1/4 w-4 h-4 border-b border-l border-offwhite/20" />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 border-b border-r border-offwhite/20" />
    </div>
  );
}
