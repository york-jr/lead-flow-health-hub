
export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  bairro?: string;
  cidade: string;
  tipoPlano: string;
  urgencia: string;
  comentarios: string;
  classificacao: "quente" | "morno" | "frio";
  dataCaptura: string;
  status?: "novo" | "contatado" | "interesse" | "fechado" | "perdido";
  responsavel?: string;
  dataStatusChange?: string;
  renda?: string;
}
