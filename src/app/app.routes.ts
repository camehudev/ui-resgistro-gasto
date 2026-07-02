import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
        .then(m => m.DashboardComponent)
    }

];
