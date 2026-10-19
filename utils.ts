export const PLATAFORMAS = ["Shopee", "Amazon", "Mercado Livre", "Magalu", "Shein", "Temu"];

export const calcDesconto = (antigo: number, atual: number) =>
  antigo > 0 && atual > 0 && atual < antigo ? Math.round((1 - atual / antigo) * 100) : 0;

export const brl = (n: number) =>
  Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const num = (s: string) => parseFloat(s.replace(",", ".")) || 0;
