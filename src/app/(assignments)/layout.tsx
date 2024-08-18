'use client'
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center pt-10">
      <div className="w-3/4  px-16">
        {children}
      </div>
    </div>
  );
}
