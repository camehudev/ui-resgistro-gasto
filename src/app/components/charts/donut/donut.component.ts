import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-donut',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './donut.component.html',
  styleUrl: './donut.component.css'
})
export class DonutComponent {
   data: any;
  options: any;


  ngOnInit() {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico() {
    // Configuração dos dados e categorias (ex: Receitas ou Gastos por categoria)
    this.data = {
      labels: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
      datasets: [
        {
          data: [5500, 1200, 800, 350],
          backgroundColor: [
            '#3B82F6', // Azul
            '#10B981', // Verde
            '#F59E0B', // Amarelo
            '#EF4444'  // Vermelho
          ],
          hoverBackgroundColor: [
            '#2563EB',
            '#059669',
            '#D97706',
            '#DC2626'
          ]
        }
      ]
    };

    // Configurações de layout e comportamento do Donut
    this.options = {
      cutout: '65%', // Define o tamanho do furo central que transforma a torta em Donut
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: '#495057'
          }
        }
      }
    };
  }
}
