import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pessoal-proj-java-registro.sjj3wv.easypanel.host';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

 /**
   * Consulta o endpoint no back-end para validar se a sessão do cookie HttpOnly ainda está ativa.
   * Tipado explicitamente como Observable<boolean> para satisfazer o TypeScript.
   */
  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-session`, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true), // Garante que o fluxo bem-sucedido emita explicitamente true
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false); // Retorna um Observable<boolean> contendo false
      })
    );
  }
}
