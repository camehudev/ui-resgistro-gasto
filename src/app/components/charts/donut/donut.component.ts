import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { GastoService } from '../../../services/gasto.service';

@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [CommonModule, ChartModule], // Adicionado CommonModule
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.css'
})
export class DonutComponent implements OnInit {

  data: any;
  options: any;
  totaisGastos: any[] = [];

  constructor(private gastoService: GastoService) {}

  ngOnInit() {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico() {
    // Chamada assíncrona ao serviço
    this.gastoService.resumoGastos().subscribe({
      next: (response) => {
        this.totaisGastos = response;

        // O processamento e a montagem do gráfico OCORREM AQUI DENTRO,
        // garantindo que os dados já estão disponíveis na memória.
        this.processarDadosParaGrafico(this.totaisGastos);
      },
      error: (err) => {
        console.error("Erro ao carregar dados do gráfico:", err);
      }
    });
  }

  private processarDadosParaGrafico(dados: any[]) {
    // 1. Extração dinâmica das Labels (Nomes das Categorias)
    const labels = dados.map(item => item.categoria);

    // 2. Extração dinâmica dos Dados (Valores Totais)
    const valores = dados.map(item => item.total);


    // 3. Paleta expandida de cores modernas
    const coresBase = [
      '#3B82F6', '#129166', '#F59E0B', '#EF4444',
      '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
      '#6366F1', '#84CC16', '#ccab16', '#0b0b0a'
    ];

    const coresHover = [
      '#2563EB', '#059669', '#D97706', '#DC2626',
      '#7C3AED', '#DB2777', '#0D9488', '#EA580C',
      '#4F46E5', '#65A30D', '#b39512', '#000000'
    ];

    // 4. Atribuição dinâmica de cores usando o operador módulo (%)
    const backgroundColor = labels.map((_, index) => coresBase[index % coresBase.length]);
    const hoverBackgroundColor = labels.map((_, index) => coresHover[index % coresHover.length]);

    // Montagem do objeto de configuração do gráfico exigido pelo PrimeNG
    this.data = {
      labels: labels,
      datasets: [
        {
          data: valores,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
        }
      ]
    };

    // Configurações de layout e comportamento do Donut
    this.options = {
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: '#495057',
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: { raw: any }) {
              let value = context.raw || 0;
              return ` R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            }
          }
        }
      }
    };
  }
}
