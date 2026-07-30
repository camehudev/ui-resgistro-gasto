import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loadingService';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Exponde diretamente o observable do serviço
  isLoading$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Se houver lógica baseada em rota que altera o estado do componente raiz,
      // envolva em setTimeout ou force a detecção de forma segura se necessário.
    });

    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.authService.checkSession().subscribe();

    // Atribui o observable diretamente, sem .subscribe() manual
    this.isLoading$ = this.loadingService.loading$;
  }
}
