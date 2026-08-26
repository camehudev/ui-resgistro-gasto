import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 1. Importe estas duas linhas para registrar o pt-BR
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// 2. Execute o registro antes do bootstrap
registerLocaleData(localePt);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
