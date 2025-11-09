import Navbar from "@/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-24 px-6">
      {children}
      <Navbar />
    </div>
  );
}
