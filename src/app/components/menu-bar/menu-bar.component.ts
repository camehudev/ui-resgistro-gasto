import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu'; // Ou o módulo do PrimeNG que estiver usando para o menu
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { Observable } from 'rxjs';
import e from 'express';

import { DialogModule } from 'primeng/dialog';

export interface OverlayItem {
  name: string;
  route?: string;
  // outras propriedades se houver
}

@Component({
  selector: 'app-menu-bar',
  standalone: true,
   imports: [
    DividerModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    CommonModule,
    TableModule,
    OverlayPanelModule,
    ButtonModule,
    ListboxModule,
    RouterModule,
     DialogModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})

export class MenuBarComponent implements OnInit {
   private authService = inject(AuthService);
   isLogado$!: boolean;
   visibleMenu:boolean = false; // Inicialmente o menu não é visível
   visibleLogout: boolean = false; // Inicialmente o perfil não é visível

   itemsOverlay: any[] = [
    { name: 'Perfil', icon: 'pi pi-user' },
    { name: 'Configurações', icon: 'pi pi-cog' },
    { name: 'Sair', icon: 'pi pi-sign-out', command: () => this.fazerLogout() }
  ];


// Tipagem forte com MenuItem[]
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/dashboard'] // Dica: Adicionei o routerLink para a Home se desejar navegação
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      routerLink: ['/usuarios']
    },
    {
      label: 'Relatorios',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Core',
          icon: 'pi pi-bolt',

        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',

        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',

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

            }
          ]
        }
      ]
    },

  ];

showDialogLogout() {
    this.visibleLogout = true; // Mostra o diálogo de logout
  }



  fazerLogout() {
    this.authService.logout().subscribe({
      next: () => window.location.href = '/login',
      error: () => window.location.href = '/login'
    });
    this.visibleMenu = false; // Oculta o menu após o logout
  }

  ngOnInit(): void {
     this.isLogado$ = this.authService.isLoggedIn();


  }

}
