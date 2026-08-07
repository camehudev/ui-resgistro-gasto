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
import { ChartComboDemo } from "../../components/charts/barra/barra.component";
import { TableGastosComponent } from '../../components/table-gastos/table-gastos.component';
import { ButtonModule } from 'primeng/button';
import { DonutComponent } from "../../components/charts/donut/donut.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, TableModule, CardsResumoComponent, FiltrosComponent,
    ChartComboDemo, TableGastosComponent, ButtonModule, DonutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private gastoService: GastoService) {}

ngOnInit(): void {

}




}
