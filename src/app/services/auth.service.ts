import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly baseUrl = `${environment.apiUrl}`;
  private readonly TOKEN_KEY = 'token';

  // Migrado de BehaviorSubject para Angular Signal para total alinhamento moderno
  public isAuthenticated = signal<boolean>(this.hasTokenInSession());

  private hasTokenInSession(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem(this.TOKEN_KEY);
    }
    return false;
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
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this.isAuthenticated.set(false);

    return this.http.post(`${this.baseUrl}/auth/logout`, {}, {
      withCredentials: true
    }).pipe(
      catchError(() => of(true))
    );
  }

  checkSession(): Observable<boolean> {
    if (!this.hasTokenInSession()) {
      this.isAuthenticated.set(false);
      return of(false);
    }

    return this.http.get(`${this.baseUrl}/auth/check-session`, {
      withCredentials: true,
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => {
        this.isAuthenticated.set(true);
      }),
      map(() => true),
      catchError(() => {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.removeItem(this.TOKEN_KEY);
        }
        this.isAuthenticated.set(false);
        return of(false);
      })
    );
  }
}
