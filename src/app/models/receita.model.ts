export interface Receita{
  id?: number;
  categoria: string;
  valor: number; // No TypeScript/JavaScript, mapeamos BigDecimal para number
  descricao: string;
  data: string;  // Formato "YYYY-MM-DD" compatível com LocalDate
}
