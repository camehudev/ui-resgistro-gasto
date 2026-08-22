import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GastoService } from '../../services/gasto.service';
import { response } from 'express';
import { resolve } from 'node:path';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReceitaService } from '../../services/receitas.service';
import { ResumoService } from '../../services/resumo.service';


@Component({
  selector: 'app-cards-resumo',
  standalone: true,
  imports: [CardModule,CommonModule, CurrencyPipe],
  templateUrl: './cards-resumo.component.html',
  styleUrl: './cards-resumo.component.css'
})
export class CardsResumoComponent implements OnInit{

  constructor(private gastoService: GastoService, private resumoService: ResumoService ){}

  totalGastos: any[]=[]
  listaGastos: any[]=[]
  totaisSaldos: any

getTotalGastos(){
  this.gastoService.listarTodos().subscribe(
    (response)=>{

      this.listaGastos=response
    }
  )
}

getResumototais(){
  this.resumoService.listarTotais().subscribe({
    next: response=>{

      this.totaisSaldos = response

    },
      error: (err) => console.error('Erro ao buscar receitas:', err)
  })
}

get totalDespesas(): number {
    if (!this.listaGastos || this.listaGastos.length === 0) {
      return 0;
    }
    // Soma o campo 'valor_gasto' de cada item da lista
    return this.listaGastos.reduce((total, gasto) => total + Number(gasto.valor_gasto || 0), 0);
  }

  ngOnInit(): void {

    this.getTotalGastos();
    this.getResumototais();



  }

}
