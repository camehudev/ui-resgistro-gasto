import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto.model';

import { TableModule } from 'primeng/table';
import { CategoriaSomaDTO } from '../../interfaces/categoria-soma.model';
import { CardsResumoComponent } from '../../components/cards-resumo/cards-resumo.component';
import { FiltrosComponent } from '../../components/filtros/filtros.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, TableModule, CardsResumoComponent,FiltrosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;

  resumo: any = [];
  gastosRegistrados: Gasto[] = [];


  constructor(private gastoService: GastoService) {}


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
