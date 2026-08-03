import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'; // Ajuste o caminho conforme o seu projeto
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding() // Opcional: facilita a passagem de parâmetros de rotas como @Input()
    ),
    provideClientHydration(),
    MessageService,
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations()
  ]
};
