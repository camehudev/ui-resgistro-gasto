import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { GastoService } from '../../../services/gasto.service';
import { response } from 'express';
import { RelDespRecMesService } from '../../../services/rel-desp-rec-mes.service';

@Component({
  selector: 'app-barra',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './barra.component.html',
  styleUrl: './barra.component.css'
})

export class ChartComboDemo implements OnInit {
    data: any;

    options: any;
    resumoMensal: any[]=[];
    resumoMes: any[]=[];
    mesesLabels: any[]=[];
    dadosDespesas:any[]=[];
    dadosReceitas:any[]=[];


    constructor(private relatorioService: RelDespRecMesService){}

    getResumoMensal(){
      this.relatorioService.despRecMes().subscribe({
        next: response => {
          // this.resumoMes= this.extrairMesesUnicos(response);
          this.carregarGraficoReceitasDespesas(response)
           console.log(" Dados: " ,this.resumoMes)


        },
        error(){
          console.log(" Dados incorretos. Verifique com o administrador")
        }
      })
    }

    extrairMesesUnicos(dados: any[]): string[] {
    // 1. Dicionário para mapear o número do mês para o nome em português
    const nomesMeses: { [key: string]: string } = {
        '01': 'Janeiro',
        '02': 'Fevereiro',
        '03': 'Março',
        '04': 'Abril',
        '05': 'Maio',
        '06': 'Junho',
        '07': 'Julho',
        '08': 'Agosto',
        '09': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro'
    };

    // 2. Extrai apenas a parte do mês da string (ex: '2026-01' -> '01')
    // ou se o seu backend já retorna só o mês, ajuste conforme necessário.
    // Usando Set para garantir valores únicos e sort() para ordenar cronologicamente.
    const mesesUnicosOrdenados = [...new Set(dados.map(item => {
        // Se o formato for 'YYYY-MM', pegamos os dois últimos caracteres
        const partes = item.mes.split('-');
        return partes.length > 1 ? partes[1] : item.mes;
    }))].sort();

    // 3. Mapeia os números para os nomes correspondentes
    return mesesUnicosOrdenados.map(mesNum => nomesMeses[mesNum] || mesNum);
}


carregarGraficoReceitasDespesas(dadosDaApi: any[]) {
    const documentStyle = getComputedStyle(document.documentElement);

    // 1. Obtém os meses formatados para o eixo X
    const mesesLabels = this.extrairMesesUnicos(dadosDaApi);
    this.mesesLabels= mesesLabels;

    // Dicionário inverso para associar o nome do mês de volta ao formato numérico do DTO (ex: 'Janeiro' -> '01')
    const mesesInverso: { [key: string]: string } = {
        'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
        'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
        'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
    };

    // 2. Mapeia os valores de Receitas para cada mês do eixo X
    const dadosReceitas = mesesLabels.map(mesNome => {
        const numMes = mesesInverso[mesNome];
        const encontrado = dadosDaApi.find(item => item.mes.split('-')[1] === numMes);
        return encontrado ? encontrado.receitas : 0;


    });

    // 3. Mapeia os valores de Despesas para cada mês do eixo X
    const dadosDespesas = mesesLabels.map(mesNome => {
        const numMes = mesesInverso[mesNome];
        const encontrado = dadosDaApi.find(item => item.mes.split('-')[1] === numMes);
        return encontrado ? encontrado.despesas : 0;
    });

    this.dadosDespesas = dadosDespesas
    this.dadosReceitas = dadosReceitas


     this.data = {
        labels: this.mesesLabels,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Receitas',
                backgroundColor: documentStyle.getPropertyValue('--blue-100'),
                data: this.dadosReceitas,
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar' as const,
                label: 'Despesas',
                backgroundColor: documentStyle.getPropertyValue('--blue-200'),
                data: this.dadosDespesas,
                borderColor: 'white',
                borderWidth: 2
            }
        ]
    };


}


    ngOnInit() {
        this.getResumoMensal()
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        // ... dentro do seu método carregarDadosGrafico()

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }
}
