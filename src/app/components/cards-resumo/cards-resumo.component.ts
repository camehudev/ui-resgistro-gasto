import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { GastoService } from '../../services/gasto.service';
import { response } from 'express';
import { resolve } from 'node:path';

import { CommonModule, CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cards-resumo',
  standalone: true,
  imports: [CardModule,CommonModule, CurrencyPipe],
  templateUrl: './cards-resumo.component.html',
  styleUrl: './cards-resumo.component.css'
})
export class CardsResumoComponent implements OnInit{

  constructor(private gastoService: GastoService){}

  totalGastos: any[]=[]
  listaGastos: any[]=[]

getTotalGastos(){
  this.gastoService.listarTodos().subscribe(
    (response)=>{

      this.listaGastos=response
    }
  )
}

get totalDespesas(): number {
    if (!this.listaGastos || this.listaGastos.length === 0) {
      return 0;
    }
    // Soma o campo 'valor_gasto' de cada item da lista
    return this.listaGastos.reduce((total, gasto) => total + Number(gasto.valor_gasto || 0), 0);
  }

  ngOnInit(): void {

    this.getTotalGastos()



  }

}
