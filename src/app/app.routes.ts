import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuarios/usuarios.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
 // Redireciona a raiz ('') para a rota de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rota definida para o componente de Login
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
      path: 'usuarios',
      loadComponent: () => import('./pages/usuarios/usuarios.component')
          .then(m => m.UsuarioComponent),
          canActivate: [authGuard]
    }

];
