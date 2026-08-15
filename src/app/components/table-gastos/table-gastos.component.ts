import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-table-gastos',
  standalone: true,
  imports: [InputTextModule, RippleModule, CommonModule, TableModule,],
  templateUrl: './table-gastos.component.html',
  styleUrl: './table-gastos.component.css'
})
export class TableGastosComponent implements OnInit {

  constructor(private gastoService: GastoService) { }

  resumo: any = [];
  gastosRegistrados: Gasto[] = [];

   listarGastos(){
    this.gastoService.listarTodos().subscribe({
      next: (dados) => {
        this.gastosRegistrados = dados;

      },
      error: (erro) => {
        console.error('Erro ao buscar gastos:', erro);
      }
    });
  }

    listResumo(){
     this.gastoService.resumoGastos().subscribe({

      next: (dados) => {
        this.resumo = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar gastos:', erro);
      }
    });

  }

    ngOnInit() {
        this.listarGastos();
        this.listResumo();
    }

}
