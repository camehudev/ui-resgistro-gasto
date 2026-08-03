import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto.model';
import { CategoriaSomaDTO } from '../interfaces/categoria-soma.model';
import { environment } from '../../environments/environment.production'; // Ajuste conforme o padrão do seu angular.json para environments

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private http = inject(HttpClient);

  // A baseUrl já deve conter a raiz da API (ex: https://seu-backend.onrender.com ou http://localhost:5000)
  private readonly baseUrl = `${environment.apiUrl}/gastos`;

  listarTodos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.baseUrl, { withCredentials: true });
  }

  resumoGastos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/resumo`, { withCredentials: true });
  }

  criarGasto(gasto: any): Observable<Gasto> {
    return this.http.post<any>(`${this.baseUrl}`, gasto, {
      withCredentials: true // Mantém o suporte a cookies/sessão se a sua API exigir
    });
}
}
