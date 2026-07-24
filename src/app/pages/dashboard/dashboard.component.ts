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


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;

  resumo: Gasto[] = [];
  gastosRegistrados: Gasto[] = [];


  constructor(private gastoService: GastoService) {}

  listResumo(){
     this.gastoService.resumoGastos().subscribe({
      next: (dados) => {
        this.resumo = dados;
        console.log('Resumo de gastos:', this.resumo);
      },
      error: (erro) => {
        console.error('Erro ao buscar gastos:', erro);
      }
    });

  }

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

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home'
            },
            {
                label: 'Features',
                icon: 'pi pi-star'
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B'
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette',
                                badge: '2'
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette',
                                badge: '3'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                badge: '3'
            }
        ];

        this.listarGastos();
        this.listResumo();
    }



}
