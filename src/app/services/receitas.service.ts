import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../models/receita.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  // URL base da sua API Spring Boot
  private readonly apiUrl = `${environment.apiUrl}/receitas`;

  constructor(private http: HttpClient) {}

  // Listar todas as receitas
  listarTodas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl);
  }

  // Buscar receita por ID
  buscarPorId(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.apiUrl}/${id}`);
  }

  // Salvar nova receita (ou atualizar se enviar ID)
  salvar(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.apiUrl, receita);
  }

  // Deletar receita por ID
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
