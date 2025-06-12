import Navbar from "@/components/navbar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
      <Navbar />
    </div>
  );
}
