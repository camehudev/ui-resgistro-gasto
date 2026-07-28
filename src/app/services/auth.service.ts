import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pessoal-proj-java-registro.sjj3wv.easypanel.host';

  constructor(private http: HttpClient) {}

  /**
   * Realiza a autenticação enviando as credenciais.
   * O back-end define o cookie HttpOnly na resposta.
   */
  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true // Essencial para o navegador aceitar o cookie HttpOnly da API
    });
  }

  /**
   * Envia uma requisição de logout para o back-end limpar o cookie de sessão.
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    });
  }

  /**
   * Como o token está em um cookie HttpOnly, o front-end não consegue ler o seu valor por JavaScript.
   * A validação de estado logado geralmente depende de um endpoint de status (/me) ou de uma flag booleana leve.
   */
  isLoggedIn(): Observable<boolean> {
    // Exemplo arquitetural: Opcionalmente consulte um endpoint /api/usuarios/me para validar a sessão
    // Ou gerencie o estado visual via BehaviorSubject no client-side após o login bem-sucedido.
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-session`, {
      withCredentials: true
    });
  }
}
