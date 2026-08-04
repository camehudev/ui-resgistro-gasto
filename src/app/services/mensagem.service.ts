import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  private messageService = inject(MessageService);

  /**
   * Exibe uma mensagem de sucesso
   * @param resumo Título do Toast (ex: 'Sucesso!')
   * @param detalhes Texto descritivo da mensagem
   */
  sucesso(detalhes: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detalhes,
      life: 2500 // Tempo em milissegundos que o toast fica visível
    });
  }

  /**
   * Exibe uma mensagem de erro
   * @param resumo Título do Toast (ex: 'Erro!')
   * @param detalhes Texto descritivo do erro
   */
  erro(detalhes: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detalhes,
      life: 1500
    });
  }

  /**
   * Exibe uma mensagem de alerta/aviso
   */
  alerta(detalhes: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Alerta',
      detail: detalhes,
      life: 1500
    });
  }

  /**
   * Exibe uma mensagem informativa
   */
  info(resumo: string, detalhes: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Informação',
      detail: detalhes,
      life: 3000
    });
  }
}
