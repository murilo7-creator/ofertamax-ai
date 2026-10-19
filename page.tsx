"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Agendamento } from "@/lib/types";

const DIAS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function Agendamentos() {
  const [itens, setItens] = useState<Agendamento[]>([]);
  const [mes, setMes] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");

  const carregar = useCallback(async () => {
    const { data } = await supabase.from("agendamentos").select("*").order("data_publicacao");
    setItens((data ?? []) as Agendamento[]);
  }, []);
  useEffect(() => { carregar(); }, [carregar]);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("agendamentos").insert({ titulo, data_publicacao: new Date(data).toISOString(), status: "agendado" });
    setTitulo(""); setData(""); carregar();
  }
  async function status(id: string, s: string) { await supabase.from("agendamentos").update({ status: s }).eq("id", id); carregar(); }
  async function apagar(id: string) { await supabase.from("agendamentos").delete().eq("id", id); carregar(); }

  const vazios = mes.getDay();
  const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  const doDia = (d: number) => itens.filter((a) => {
    const x = new Date(a.data_publicacao);
    return x.getFullYear() === mes.getFullYear() && x.getMonth() === mes.getMonth() && x.getDate() === d;
  });
  const mover = (n: number) => setMes(new Date(mes.getFullYear(), mes.getMonth() + n, 1));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold md:text-3xl">Agenda de publicações</h1>
      <form onSubmit={salvar} className="card grid gap-3 md:grid-cols-3">
        <input required placeholder="O que vai publicar?" className="input" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input required type="datetime-local" className="input" value={data} onChange={(e) => setData(e.target.value)} />
        <button className="btn">Agendar</button>
      </form>

      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <button className="btn-ghost" onClick={() => mover(-1)}>Anterior</button>
          <p className="font-semibold capitalize">{mes.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</p>
          <button className="btn-ghost" onClick={() => mover(1)}>Próximo</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">{DIAS.map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: vazios }).map((_, i) => <span key={`v${i}`} />)}
          {Array.from({ length: total }, (_, i) => i + 1).map((d) => {
            const n = doDia(d).length;
            return (
              <div key={d} className={`flex h-12 flex-col items-center justify-center rounded-lg border text-sm ${n ? "border-neon bg-neon/15 text-neon-light" : "border-line"}`}>
                {d}{n > 0 && <span className="text-[10px]">{n}x</span>}
              </div>
            );
          })}
        </div>
      </div>

      {itens.length === 0 && <p className="card text-muted">Nenhuma publicação agendada.</p>}
      <ul className="space-y-3">
        {itens.map((a) => (
          <li key={a.id} className="card flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{a.titulo}</p>
              <p className="text-sm text-muted">{new Date(a.data_publicacao).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })} · {a.status}</p>
            </div>
            {a.status === "agendado" && <button className="btn-ghost" onClick={() => status(a.id, "publicado")}>Marcar como publicado</button>}
            <button className="btn-ghost" onClick={() => apagar(a.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
