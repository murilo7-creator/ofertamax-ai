export type Oferta = {
  id: string; titulo: string; preco_antigo: number; preco_atual: number;
  desconto: number; link: string; imagem: string | null; plataforma: string; criado_em: string;
};
export type Cupom = {
  id: string; codigo: string; plataforma: string; descricao: string | null; validade: string | null;
};
export type Agendamento = {
  id: string; titulo: string; data_publicacao: string; status: "agendado" | "publicado" | "cancelado";
};
