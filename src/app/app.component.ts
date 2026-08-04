import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loadingService';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuBarComponent,ToastModule],
  providers:[MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;


  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);

   // Declaramos o tipo do signal ou deixamos a inferência do TypeScript agir
  isLoggedIn = this.authService.isAuthenticated;


  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Lógica de navegação se necessário
    });

    // Verifica a sessão ao inicializar a aplicação
    this.authService.checkSession().subscribe();

    // Atribui o observable do loading
    this.isLoading$ = this.loadingService.loading$;
  }
}
