import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loadingService';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub!: Subscription;
  isLoggedIn$!: Observable<boolean>;

  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // 1. Inicializa o observável de autenticação
    this.isLoggedIn$ = this.authService.isAuthenticated$;

    // 2. Valida a sessão ativa ao carregar a aplicação (no início, e não na destruição)
    this.authService.checkSession().subscribe();

    // 3. Inscreve-se no serviço de loading
    this.loadingSub = this.loadingService.loading$.subscribe((status: boolean) => {
      this.isLoading = status;
    });
  }

  ngOnDestroy(): void {
    // Apenas limpa as inscrições ativas para evitar vazamento de memória (Memory Leak)
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
