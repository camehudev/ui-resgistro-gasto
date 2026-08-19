import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ResumoService {

  // URL base da sua API Spring Boot
  private readonly apiUrl = `${environment.apiUrl}/saldo`;

  constructor(private http: HttpClient) {}

   // Listar todas as receitas
    listarTotais(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }






}
