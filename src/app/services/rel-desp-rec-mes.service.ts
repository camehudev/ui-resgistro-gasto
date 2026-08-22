import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelDespRecMesService {

   private readonly apiUrl = `${environment.apiUrl}/relatorios`;

    constructor(private http: HttpClient) {}

    // Listar todas as receitas
    despRecMes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/receitas-despesas-mes`);
    }
}
