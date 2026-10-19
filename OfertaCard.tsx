import type { Oferta } from "@/lib/types";
import { brl } from "@/lib/utils";

export function OfertaCard({ o }: { o: Oferta }) {
  return (
    <a href={o.link} target="_blank" rel="nofollow sponsored noopener noreferrer"
       className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-neon hover:shadow-neon">
      <div className="relative aspect-square bg-bg">
        {o.imagem && <img src={o.imagem} alt={o.titulo} className="h-full w-full object-cover" loading="lazy" />}
        {o.desconto > 0 && (
          <span className="absolute left-3 top-3 rounded-lg bg-off px-2 py-1 text-xs font-bold text-black">-{o.desconto}%</span>
        )}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-xs text-muted">{o.plataforma}</p>
        <h3 className="line-clamp-2 text-sm font-medium">{o.titulo}</h3>
        <p className="text-xs text-muted line-through">{brl(o.preco_antigo)}</p>
        <p className="text-lg font-bold text-neon-light">{brl(o.preco_atual)}</p>
      </div>
    </a>
  );
}
