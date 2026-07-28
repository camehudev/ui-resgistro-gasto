import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loadingService';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Ativa o spinner de carregamento antes de enviar a requisição
  loadingService.show();

  // Clona a requisição garantindo o envio de credenciais (cookies HttpOnly)
  const clonedReq = req.clone({
    withCredentials: true
  });

  // O operador finalize garante que o spinner será escondido
  // tanto em caso de sucesso quanto em caso de erro da API
  return next(clonedReq).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
