import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto.model';
import { CategoriaSomaDTO } from '../interfaces/categoria-soma.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  // Ajuste a URL base conforme a porta e rota do seu Spring Boot
  //private apiUrl = 'http://localhost:5000/gastos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`https://pessoal-proj-java-registro.sjj3wv.easypanel.host/gastos`);
    //return this.http.get<Gasto[]>(`https://pessoal-proj-java-registro.sjj3wv.easypanel.host/gastos`);
  }

  resumoGastos(): Observable<any> {
    //return this.http.get<any>(`http://localhost:5000/gastos/resumo`);
    return this.http.get<Gasto[]>(`https://pessoal-proj-java-registro.sjj3wv.easypanel.host/gastos/resumo`);
  }
}
