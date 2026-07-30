import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingService } from '../services/loadingService';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const platformId = inject(PLATFORM_ID);
  const TOKEN_KEY = 'token';

  // 1. Ativa o spinner de carregamento antes de enviar a requisição
  loadingService.show();

  // 2. Prepara a requisição base clonando-a com withCredentials
  let clonedReq = req.clone({
    withCredentials: true
  });

  // 3. Se estivermos no navegador, tenta resgatar o token do sessionStorage
  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem(TOKEN_KEY);

    // Se o token existir, injeta no cabeçalho Authorization no formato Bearer
    if (token) {
      clonedReq = clonedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  // 4. Executa a requisição e garante que o loading será escondido no final
  return next(clonedReq).pipe(
    finalize(() => {
      loadingService.hide();
    })
  );
};
