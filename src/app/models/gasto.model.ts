export interface Gasto {
  id?: number;
  categoria: string;
  valor: string;
  descricao: string;
  data_gasto: string;
  data_criacao?: string;
}
