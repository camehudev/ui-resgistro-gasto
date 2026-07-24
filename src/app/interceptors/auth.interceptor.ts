import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loadingService';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const token = localStorage.getItem('auth_token');

  // Ativa o spinner antes de enviar a requisição
  loadingService.show();

  // Clona a requisição se o token existir
  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // O operador finalize garante que o spinner será escondido
  // tanto em caso de sucesso quanto em caso de erro da API
  return next(clonedReq).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
