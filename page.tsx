import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PLATAFORMAS } from "@/lib/utils";
import { OfertaCard } from "@/components/OfertaCard";
import type { Oferta } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Vitrine({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;
  let q = supabase.from("ofertas").select("*").order("criado_em", { ascending: false }).limit(60);
  if (p) q = q.eq("plataforma", p);
  const { data } = await q;
  const ofertas = (data ?? []) as Oferta[];

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-1.5 text-sm ${active ? "border-neon bg-neon/15 text-neon-light" : "border-line text-muted hover:text-ink"}`;

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <header className="flex items-center justify-between py-4">
        <span className="text-xl font-bold">Oferta<span className="text-neon">Max</span></span>
        <Link href="/dashboard" className="btn-ghost">Área do afiliado</Link>
      </header>
      <section className="py-10 md:py-16">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
          Preço caiu. Achamos antes de você.
        </h1>
        <p className="mt-4 max-w-xl text-muted">Ofertas de Shopee, Amazon, Mercado Livre, Magalu, Shein e Temu, atualizadas todos os dias.</p>
      </section>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <Link href="/" className={chip(!p)}>Todas</Link>
        {PLATAFORMAS.map((n) => (
          <Link key={n} href={`/?p=${encodeURIComponent(n)}`} className={chip(p === n)}>{n}</Link>
        ))}
      </div>
      {ofertas.length === 0 ? (
        <p className="card text-muted">Nenhuma oferta publicada ainda. Cadastre a primeira em Gerar oferta.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {ofertas.map((o) => <OfertaCard key={o.id} o={o} />)}
        </div>
      )}
    </div>
  );
}
