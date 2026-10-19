"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Painel" },
  { href: "/gerador", label: "Gerar oferta" },
  { href: "/historico", label: "Histórico" },
  { href: "/cupons", label: "Cupons" },
  { href: "/agendamentos", label: "Agenda" },
];

export function Sidebar() {
  const path = usePathname();
  const item = (l: (typeof links)[number], cls: string) => (
    <Link key={l.href} href={l.href}
      className={`${cls} ${path === l.href ? "bg-neon/15 text-neon-light" : "text-muted hover:text-ink"}`}>
      {l.label}
    </Link>
  );
  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-line bg-surface/60 p-4 md:flex">
        <Link href="/" className="mb-8 text-xl font-bold">Oferta<span className="text-neon">Max</span> AI</Link>
        <nav className="flex flex-col gap-1">{links.map((l) => item(l, "rounded-xl px-3 py-2 text-sm"))}</nav>
        <Link href="/" className="mt-auto text-sm text-muted hover:text-ink">Ver vitrine</Link>
      </aside>
      <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-surface/95 p-1 backdrop-blur md:hidden">
        {links.map((l) => item(l, "rounded-lg px-2 py-2 text-xs"))}
      </nav>
    </>
  );
}
