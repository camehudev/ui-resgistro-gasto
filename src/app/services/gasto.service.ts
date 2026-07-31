import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto.model';
import { CategoriaSomaDTO } from '../interfaces/categoria-soma.model';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class GastoService {
  // Ajuste a URL base conforme a porta e rota do seu Spring Boot
  //private apiUrl = 'http://localhost:5000/gastos';
  // Pega a URL dinamicamente do environment configurado
  private readonly baseUrl = `${environment.apiUrl}`;



  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Gasto[]> {
      console.log('(1=> ', this.baseUrl)
    return this.http.get<Gasto[]>(`${this.baseUrl}/gastos`);
  }

  resumoGastos(): Observable<any> {
    console.log('2 => ', this.baseUrl)
    return this.http.get<any>(`${this.baseUrl}/gastos/resumo`);
  }
}
