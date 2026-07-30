import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  private apiUrl = 'https://pessoal-proj-java-registro.sjj3wv.easypanel.host';
  private apiUrl2 = 'https://local';

  // Mantemos o BehaviorSubject.
  // Dica de Arquiteto: Se quisermos evitar que o menu suma no F5,
  // podemos assumir um estado inicial ou tratar o carregamento.
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

  checkSession(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/check-session`, {
      withCredentials: true,
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }
}
