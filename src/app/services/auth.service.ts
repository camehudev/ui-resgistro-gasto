import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of, map } from 'rxjs';
import { environment } from '../../environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly baseUrl = `${environment.apiUrl}`;
  private readonly TOKEN_KEY = 'token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasTokenInSession());
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private hasTokenInSession(): boolean {
    // Garante que só executa o sessionStorage se estiver rodando no navegador (Browser)
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem(this.TOKEN_KEY);
    }
    return false; // No servidor, assume inicialmente como falso
  }

  isLoggedIn(): boolean {
    return this.hasTokenInSession();
  }

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        if (response && response.token && isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem(this.TOKEN_KEY, response.token);
        }
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticatedSubject.next(false);

    return this.http.post(`${this.baseUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      catchError(() => of(true))
    );
  }

  checkSession(): Observable<boolean> {
    if (!this.hasTokenInSession()) {
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }

    return this.http.get(`${this.baseUrl}/auth/check-session`, {
      withCredentials: true,
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true),
      catchError(() => {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.removeItem(this.TOKEN_KEY);
        }
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }
}
