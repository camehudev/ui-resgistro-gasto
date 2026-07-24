import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  // Ajuste a URL base conforme a porta e rota do seu Spring Boot
  private apiUrl = 'http://localhost:8080/gastos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`http://localhost:8080/gastos`);
  }

  resumoGastos(): Observable<any> {
    return this.http.get<Gasto[]>(`http://localhost:8080/gastos/resumo`);
  }
}
