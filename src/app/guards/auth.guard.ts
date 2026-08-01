import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajuste o caminho do seu AuthService

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o usuário está logado
  if (authService.isLoggedIn()) {
    return true; // Libera o acesso à rota
  }

  // Se não estiver autenticado, redireciona para a tela de login
  router.navigate(['/login']);
  return false;
};
