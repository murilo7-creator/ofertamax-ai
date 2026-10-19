import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-5xl p-4 pb-24 md:ml-56 md:p-8">{children}</main>
    </>
  );
}
